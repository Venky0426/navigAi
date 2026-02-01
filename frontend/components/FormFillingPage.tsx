import { useState } from "react";
import axios from "axios";
import "./FormFillingPage.css";
import RoadmapView from "./RoadmapView";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

import {
  Rocket,
  Target,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

const TARGET_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cyber Security Analyst",
  "Mobile App Developer",
  "Software Development Engineer (SDE)",
  "Java Developer",
  "Python Developer",
  "Blockchain Developer",
  "UI/UX Designer",
];

const FormFillingPage = () => {
  const [formData, setFormData] = useState({
    currentYear: 2,
    passoutYear: 2027,
    currentSkills: "",
    targetRole: "",
  });

  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRoadmapToFirebase = async (generatedRoadmap: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const roadmapRef = doc(db, "users", user.uid, "roadmaps", "current");

    await setDoc(roadmapRef, {
      roadmap: generatedRoadmap,
      formData,
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-roadmap",
        {
          current_year: formData.currentYear,
          passout_year: formData.passoutYear,
          current_skills: formData.currentSkills,
          target_role: formData.targetRole,
        }
      );

      const generatedRoadmap = response.data.roadmap;
      setRoadmap(generatedRoadmap);
      await saveRoadmapToFirebase(generatedRoadmap);
    } catch {
      setError("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navig-root">
      <header className="navig-header">
        <Rocket size={42} />
        <h1>Navig AI</h1>
        <p>Your Personalized Career Roadmap Generator</p>
      </header>

      <div className="navig-container">
        {!roadmap ? (
          <form className="navig-form" onSubmit={handleSubmit}>
            <h2>🎯 Build Your Career Roadmap</h2>

            {error && <div className="error-box">{error}</div>}

            <div className="form-grid">
              <div className="form-field">
                <label><Calendar /> Current Year</label>
                <select
                  value={formData.currentYear}
                  onChange={(e) =>
                    setFormData({ ...formData, currentYear: Number(e.target.value) })
                  }
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </div>

              <div className="form-field">
                <label><Award /> Passout Year</label>
                <select
                  value={formData.passoutYear}
                  onChange={(e) =>
                    setFormData({ ...formData, passoutYear: Number(e.target.value) })
                  }
                >
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label><BookOpen /> Current Skills</label>
              <input
                placeholder="Python, HTML, CSS"
                value={formData.currentSkills}
                onChange={(e) =>
                  setFormData({ ...formData, currentSkills: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label><Target /> Target Role</label>
              <input
                list="target-roles"
                placeholder="Choose your dream role"
                value={formData.targetRole}
                onChange={(e) =>
                  setFormData({ ...formData, targetRole: e.target.value })
                }
                required
              />
              <datalist id="target-roles">
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role} />
                ))}
              </datalist>
            </div>

            <button className="generate-btn" type="submit" disabled={loading}>
              {loading ? "Generating Roadmap..." : "🚀 Generate Roadmap"}
            </button>
          </form>
        ) : (
          <div className="roadmap-wrapper">
            <RoadmapView roadmap={roadmap} onBack={() => setRoadmap(null)} />
          </div>
        )}
      </div>

      <footer className="navig-footer">
      
      </footer>
    </div>
  );
};

export default FormFillingPage;
