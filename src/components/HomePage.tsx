import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  BookOpen,
  Target,
  Brain,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Zap,
  Clock,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const quickStats = [
  { label: 'Current Streak', value: '12 days', icon: Zap, color: 'from-orange-500 to-red-500' },
  { label: 'Hours This Week', value: '18.5h', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { label: 'Completed Tasks', value: '47', icon: Award, color: 'from-green-500 to-emerald-500' },
  { label: 'Overall Progress', value: '65%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
];

const recentActivities = [
  { title: 'Completed React Hooks lesson', time: '2 hours ago', type: 'completed' },
  { title: 'Started TypeScript Fundamentals', time: '5 hours ago', type: 'started' },
  { title: 'Earned "Quick Learner" badge', time: '1 day ago', type: 'achievement' },
  { title: 'Submitted Todo App project', time: '2 days ago', type: 'project' },
];

const upcomingMilestones = [
  { title: 'Complete React Development Module', progress: 65, dueDate: 'Nov 15' },
  { title: 'Build E-commerce Project', progress: 0, dueDate: 'Dec 1' },
  { title: 'Master TypeScript Basics', progress: 30, dueDate: 'Nov 30' },
];

const learningTools = [
  {
    title: 'Resources Library',
    description: 'Access curated courses and tutorials',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
    action: 'resources',
  },
  {
    title: 'Learning Roadmap',
    description: 'View your personalized path',
    icon: Target,
    gradient: 'from-purple-500 to-pink-500',
    action: 'roadmap',
  },
  {
    title: 'AI Mentor',
    description: 'Get instant help and guidance',
    icon: Brain,
    gradient: 'from-green-500 to-emerald-500',
    action: 'ai-mentor',
  },
  {
    title: 'Progress Dashboard',
    description: 'Track your achievements',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    action: 'dashboard',
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground">
            You're making great progress on your Frontend Developer journey
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl mb-4">Quick Access</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {learningTools.map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Card
                      className="p-6 cursor-pointer group hover:shadow-xl transition-all border-2 hover:border-transparent hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
                      onClick={() => onNavigate(tool.action)}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <div className="flex items-center text-[#667eea] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm">Open</span>
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>Upcoming Milestones</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('roadmap')}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm mb-1">{milestone.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Due {milestone.dueDate}</span>
                          </div>
                        </div>
                        <span className="text-sm">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'completed' ? 'bg-green-500' :
                        activity.type === 'started' ? 'bg-blue-500' :
                        activity.type === 'achievement' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => onNavigate('dashboard')}
                >
                  View All Activity
                </Button>
              </Card>
            </motion.div>

            {/* Daily Tip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">💡 Daily AI Tip</h4>
                    <p className="text-sm text-white/90">
                      Practice coding for at least 30 minutes daily. Consistency beats intensity when building programming skills.
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => onNavigate('ai-mentor')}
                >
                  Chat with AI Mentor
                </Button>
              </Card>
            </motion.div>

            {/* How to Start */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="mb-3">New to the Platform?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to make the most of your learning journey
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('how-to-start')}
                >
                  Getting Started Guide
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
