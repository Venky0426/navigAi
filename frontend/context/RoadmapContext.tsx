import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";


type RoadmapContextType = {
  roadmap: any;
  setRoadmap: (data: any) => void;
  loading: boolean;
};

/* ---------- CONTEXT ---------- */
const RoadmapContext = createContext<RoadmapContextType>({
  roadmap: null,
  setRoadmap: () => {},
  loading: true,
});

/* ---------- PROVIDER ---------- */
export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setRoadmap(null);
        setLoading(false);
        return;
      }

      const roadmapRef = doc(db, "users", user.uid, "roadmaps", "current");

      const unsubscribeDoc = onSnapshot(
        roadmapRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setRoadmap(snapshot.data());
          } else {
            setRoadmap(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Roadmap listener error:", error);
          setLoading(false);
        }
      );

      return unsubscribeDoc;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <RoadmapContext.Provider value={{ roadmap, setRoadmap, loading }}>
      {children}
    </RoadmapContext.Provider>
  );
};

/* ---------- HOOK ---------- */
export const useRoadmap = () => useContext(RoadmapContext);
