import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useRoadmap } from "../context/RoadmapContext";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

import {
  Search,
  BookOpen,
  Video,
  FileText,
  Code2,
  ExternalLink,
} from "lucide-react";

/* ---------- TYPES ---------- */
type ResourceItem = {
  title: string;
  link: string;
  type: "video" | "course" | "article" | "project";
  skill: string;
  phase: string;
};

/* ---------- ICON HELPER ---------- */
const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4" />;
    case "course":
      return <BookOpen className="w-4 h-4" />;
    case "project":
      return <Code2 className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

/* ---------- PAGE ---------- */
const ResourcesPage = () => {
  const { roadmap, loading } = useRoadmap();
  const [search, setSearch] = useState("");

  /**
   * Firebase document shape:
   * roadmap = {
   *   roadmap: {
   *     timeline: [
   *       {
   *         phase,
   *         skills: [
   *           {
   *             skill,
   *             resources: {
   *               videos: [],
   *               courses: [],
   *               docs: []
   *             }
   *           }
   *         ]
   *       }
   *     ]
   *   }
   * }
   */
  const resources = useMemo<ResourceItem[]>(() => {
    const timeline = roadmap?.roadmap?.timeline;
    if (!timeline || !Array.isArray(timeline)) return [];

    const flattened: ResourceItem[] = [];

    timeline.forEach((month: any) => {
      month.skills?.forEach((skill: any) => {
        const res = skill.resources || {};

        // VIDEOS
        res.videos?.forEach((v: any) => {
          flattened.push({
            title: v.title,
            link: v.url,
            type: "video",
            skill: skill.skill,
            phase: month.phase,
          });
        });

        // COURSES
        res.courses?.forEach((c: any) => {
          flattened.push({
            title: c.title,
            link: c.url,
            type: "course",
            skill: skill.skill,
            phase: month.phase,
          });
        });

        // DOCS
        res.docs?.forEach((d: string) => {
          flattened.push({
            title: "Official Documentation",
            link: d,
            type: "article",
            skill: skill.skill,
            phase: month.phase,
          });
        });
      });
    });

    return flattened;
  }, [roadmap]);

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- STATES ---------- */
  if (loading) return <p className="p-8">Loading resources...</p>;
  if (!roadmap?.roadmap)
    return <p className="p-8">Generate a roadmap first.</p>;

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl mb-2">Your Learning Resources</h1>
          <p className="text-muted-foreground">
            Auto-generated from your personalized roadmap
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="my-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <Input
            placeholder="Search resources..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(res.type)}
                  <h3 className="text-sm font-medium">{res.title}</h3>
                </div>

                <Badge variant="outline" className="mb-2 w-fit">
                  {res.skill}
                </Badge>

                <p className="text-xs text-muted-foreground mb-4">
                  Phase: {res.phase}
                </p>

                <Button
                  asChild
                  className="mt-auto bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                  size="sm"
                >
                  <a href={res.link} target="_blank" rel="noreferrer">
                    Open Resource <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center mt-10 text-muted-foreground">
            No resources found
          </p>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
