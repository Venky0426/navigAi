import { motion } from "motion/react";
import { useRoadmap } from "../context/RoadmapContext";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, BookOpen } from "lucide-react";

const RoadmapPage = () => {
  const { roadmap, loading } = useRoadmap();

  if (loading) {
    return <p className="p-8">Loading roadmap...</p>;
  }

  if (!roadmap?.roadmap?.timeline) {
    return <p className="p-8">No roadmap found. Generate one first.</p>;
  }

  const timeline = roadmap.roadmap.timeline;

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl mb-2">Your Career Roadmap</h1>
          <p className="text-muted-foreground">
            AI-generated learning plan tailored for you
          </p>
        </motion.div>

        {/* ROADMAP BLOCKS */}
        <div className="space-y-6">
          {timeline.map((month: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-l-4 border-purple-500">
                {/* MONTH HEADER */}
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">
                    {month.phase}
                  </h2>
                </div>

                {/* SKILLS */}
                <div className="grid md:grid-cols-2 gap-4">
                  {month.skills.map((skill: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gradient-to-br from-white to-purple-50 border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <h3 className="font-medium">{skill.skill}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skill.topics?.map((topic: string, t: number) => (
                          <Badge key={t} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
