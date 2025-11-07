import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code,
  Trophy,
  Sparkles,
  ChevronRight,
  Star,
} from 'lucide-react';

interface RoadmapPageProps {
  onNavigate: (page: string) => void;
}

const roadmapMilestones = [
  {
    id: 1,
    title: 'Foundations',
    status: 'completed',
    progress: 100,
    duration: '4 weeks',
    skills: ['HTML', 'CSS', 'JavaScript Basics'],
    tasks: [
      { title: 'Learn HTML Fundamentals', completed: true },
      { title: 'Master CSS Styling', completed: true },
      { title: 'JavaScript Basics', completed: true },
      { title: 'Build Portfolio Website', completed: true },
    ],
  },
  {
    id: 2,
    title: 'React Development',
    status: 'in-progress',
    progress: 65,
    duration: '6 weeks',
    skills: ['React', 'State Management', 'Hooks'],
    tasks: [
      { title: 'React Components & Props', completed: true },
      { title: 'State & Lifecycle', completed: true },
      { title: 'React Hooks Mastery', completed: false },
      { title: 'Build Todo App', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Advanced Frontend',
    status: 'locked',
    progress: 0,
    duration: '8 weeks',
    skills: ['TypeScript', 'Next.js', 'Testing'],
    tasks: [
      { title: 'TypeScript Fundamentals', completed: false },
      { title: 'Next.js Framework', completed: false },
      { title: 'Unit Testing with Jest', completed: false },
      { title: 'E-commerce Project', completed: false },
    ],
  },
  {
    id: 4,
    title: 'Full Stack Skills',
    status: 'locked',
    progress: 0,
    duration: '10 weeks',
    skills: ['Node.js', 'Databases', 'APIs'],
    tasks: [
      { title: 'Node.js Backend', completed: false },
      { title: 'Database Design', completed: false },
      { title: 'RESTful APIs', completed: false },
      { title: 'Full Stack Project', completed: false },
    ],
  },
];

const skillTracker = [
  { skill: 'React', level: 65, target: 90 },
  { skill: 'JavaScript', level: 85, target: 95 },
  { skill: 'TypeScript', level: 30, target: 80 },
  { skill: 'CSS', level: 70, target: 85 },
  { skill: 'Node.js', level: 20, target: 75 },
];

const aiSuggestions = [
  'Focus on mastering React Hooks before moving to advanced topics',
  'Consider building 2-3 more projects to solidify your React knowledge',
  'TypeScript will significantly boost your employability - start learning now',
  'Join open-source projects to gain real-world experience',
];

export function RoadmapPage({ onNavigate }: RoadmapPageProps) {
  const [selectedMilestone, setSelectedMilestone] = useState(roadmapMilestones[1]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#667eea]" />
            <span className="text-sm text-[#667eea]">AI-Generated Learning Path</span>
          </div>
          <h1 className="text-4xl mb-3">Your Frontend Developer Roadmap</h1>
          <p className="text-muted-foreground">
            Personalized path based on your goals and current skills
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Roadmap */}
          <div className="lg:col-span-2 space-y-4">
            {roadmapMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    selectedMilestone.id === milestone.id
                      ? 'border-[#667eea] shadow-lg shadow-purple-500/20'
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                  onClick={() => setSelectedMilestone(milestone)}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(milestone.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="mb-1">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                        </div>
                        <Badge
                          variant={milestone.status === 'completed' ? 'default' : 'secondary'}
                          className={
                            milestone.status === 'completed'
                              ? 'bg-green-500'
                              : milestone.status === 'in-progress'
                              ? 'bg-blue-500'
                              : ''
                          }
                        >
                          {milestone.status === 'completed'
                            ? 'Completed'
                            : milestone.status === 'in-progress'
                            ? 'In Progress'
                            : 'Locked'}
                        </Badge>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {milestone.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>

                      {/* Tasks */}
                      {selectedMilestone.id === milestone.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t space-y-2"
                        >
                          {milestone.tasks.map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span
                                className={`text-sm ${
                                  task.completed ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>
                          ))}
                          {milestone.status !== 'locked' && (
                            <Button
                              className="w-full mt-3 bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate('resources');
                              }}
                            >
                              <BookOpen className="mr-2 w-4 h-4" />
                              View Resources
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Skill Tracker
                </h3>
                <div className="space-y-4">
                  {skillTracker.map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.skill}</span>
                        <span className="text-muted-foreground">
                          {item.level}% / {item.target}%
                        </span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#667eea]" />
                  AI Suggestions
                </h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 text-sm p-3 bg-white rounded-lg border"
                    >
                      <ChevronRight className="w-4 h-4 text-[#667eea] flex-shrink-0 mt-0.5" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => onNavigate('ai-mentor')}
                >
                  Ask AI Mentor
                </Button>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onNavigate('dashboard')}
                  >
                    <Trophy className="mr-2 w-4 h-4" />
                    View Progress Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onNavigate('resources')}
                  >
                    <BookOpen className="mr-2 w-4 h-4" />
                    Browse Resources
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => onNavigate('how-to-start')}
                  >
                    <Code className="mr-2 w-4 h-4" />
                    How to Start
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
