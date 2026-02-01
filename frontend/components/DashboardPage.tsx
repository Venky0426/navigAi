import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Trophy,
  Award,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  BookOpen,
  Code,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const weeklyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 5.2 },
  { day: 'Sun', hours: 3.5 },
];

const achievements = [
  { id: 1, title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', earned: true, date: 'Oct 25' },
  { id: 2, title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true, date: 'Nov 1' },
  { id: 3, title: 'Quick Learner', description: 'Completed 10 lessons', icon: '⚡', earned: true, date: 'Nov 3' },
  { id: 4, title: 'Code Master', description: 'Built 5 projects', icon: '💻', earned: false, date: 'Locked' },
  { id: 5, title: 'Consistency King', description: '30-day streak', icon: '👑', earned: false, date: 'Locked' },
  { id: 6, title: 'Full Stack', description: 'Complete all modules', icon: '🚀', earned: false, date: 'Locked' },
];

const certificates = [
  { id: 1, title: 'React Fundamentals', issueDate: 'Nov 1, 2024', progress: 100, skills: ['React', 'JSX', 'Components'] },
  { id: 2, title: 'JavaScript ES6+', issueDate: 'Oct 20, 2024', progress: 100, skills: ['ES6', 'Promises', 'Async/Await'] },
  { id: 3, title: 'TypeScript Basics', issueDate: 'In Progress', progress: 45, skills: ['TypeScript', 'Types', 'Interfaces'] },
];

const streakHistory = [
  { week: 'Week 1', days: 5 },
  { week: 'Week 2', days: 7 },
  { week: 'Week 3', days: 6 },
  { week: 'Week 4', days: 7 },
];

const stats = [
  { label: 'Total Hours', value: '127.5', change: '+12%', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { label: 'Lessons Completed', value: '89', change: '+8%', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
  { label: 'Projects Built', value: '12', change: '+4', icon: Code, color: 'from-purple-500 to-pink-500' },
  { label: 'Current Streak', value: '12 days', change: 'Active', icon: Flame, color: 'from-orange-500 to-red-500' },
];

const recentActivity = [
  { title: 'Completed "React Hooks Deep Dive"', time: '2 hours ago', type: 'lesson' },
  { title: 'Submitted Todo App Project', time: '1 day ago', type: 'project' },
  { title: 'Earned "Quick Learner" Badge', time: '2 days ago', type: 'badge' },
  { title: 'Started TypeScript Module', time: '3 days ago', type: 'module' },
  { title: 'Reached 100 hours milestone', time: '5 days ago', type: 'milestone' },
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-3">Progress Dashboard</h1>
          <p className="text-muted-foreground">
            Track your learning journey and celebrate your achievements
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-green-600">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl mb-6">Weekly Learning Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#667eea"
                  strokeWidth={3}
                  dot={{ fill: '#667eea', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Tabs for Rewards, Certificates, Streaks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="rewards" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="rewards">
                <Trophy className="w-4 h-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="certificates">
                <Award className="w-4 h-4 mr-2" />
                Certificates
              </TabsTrigger>
              <TabsTrigger value="streaks">
                <Flame className="w-4 h-4 mr-2" />
                Streaks
              </TabsTrigger>
            </TabsList>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`p-6 ${achievement.earned ? '' : 'opacity-60'}`}>
                      <div className="text-center">
                        <div className="text-5xl mb-3">{achievement.icon}</div>
                        <h3 className="mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        <Badge variant={achievement.earned ? 'default' : 'secondary'}>
                          {achievement.earned ? `Earned ${achievement.date}` : achievement.date}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl ${
                            cert.progress === 100
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                              : 'bg-gradient-to-br from-blue-500 to-purple-500'
                          } flex items-center justify-center`}>
                            {cert.progress === 100 ? (
                              <CheckCircle2 className="w-7 h-7 text-white" />
                            ) : (
                              <Target className="w-7 h-7 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="mb-1">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground">{cert.issueDate}</p>
                          </div>
                        </div>
                        {cert.progress === 100 && (
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{cert.progress}%</span>
                        </div>
                        <Progress value={cert.progress} className="h-2" />
                        <div className="flex flex-wrap gap-2 mt-3">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Streaks Tab */}
            <TabsContent value="streaks">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Flame className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-4xl">12</div>
                      <div className="text-sm opacity-90">Day Streak</div>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-4">
                    Keep learning today to maintain your streak! 🔥
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => onNavigate('roadmap')}
                  >
                    Continue Learning
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="mb-4">Streak History</h3>
                  <div className="space-y-4">
                    {streakHistory.map((week, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{week.week}</span>
                          <span className="text-muted-foreground">{week.days}/7 days</span>
                        </div>
                        <Progress value={(week.days / 7) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 md:col-span-2">
                  <h3 className="mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.type === 'lesson' ? 'bg-blue-500' :
                          activity.type === 'project' ? 'bg-purple-500' :
                          activity.type === 'badge' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
