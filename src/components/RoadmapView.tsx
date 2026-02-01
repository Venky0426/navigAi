import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  BookOpen,
  Video,
  FileText,
  ArrowLeft,
} from "lucide-react";

type Props = {
  roadmap: any;
  onBack: () => void;
};

const RoadmapView = ({ roadmap, onBack }: Props) => {
  if (!roadmap?.timeline) return null;

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Your Career Roadmap</h1>
            <p className="text-muted-foreground">
              Structured month-wise learning plan
            </p>
          </div>
        </div>

        {/* MONTH BLOCKS */}
        <div className="space-y-8">
          {roadmap.timeline.map((month: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 rounded-2xl shadow-md">

                {/* MONTH HEADER */}
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">
                    {month.phase}
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Focus: {month.focus}
                </p>

                {/* SKILLS GRID */}
                <div className="grid md:grid-cols-2 gap-6">
                  {month.skills.map((skill: any, sidx: number) => (
                    <Card
                      key={sidx}
                      className="p-5 border rounded-xl bg-white"
                    >
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        {skill.skill}
                      </h3>

                      {/* TOPICS */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skill.topics?.map((topic: string, tidx: number) => (
                          <Badge key={tidx} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {/* RESOURCES */}
                      <div className="space-y-2 text-sm">

                        {skill.resources?.videos?.map(
                          (v: any, vidx: number) => (
                            <a
                              key={vidx}
                              href={v.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                              <Video className="w-4 h-4" />
                              {v.title}
                            </a>
                          )
                        )}

                        {skill.resources?.docs?.map(
                          (d: string, didx: number) => (
                            <a
                              key={didx}
                              href={d}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-green-600 hover:underline"
                            >
                              <FileText className="w-4 h-4" />
                              Documentation
                            </a>
                          )
                        )}

                      </div>
                    </Card>
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

export default RoadmapView;
