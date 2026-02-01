import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Target,
  Users,
  Sparkles,
  TrendingUp,
  Globe,
  Award,
  Heart,
  Rocket,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Empowering learners with AI-powered education',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Learner-First',
    description: 'Your success is our top priority',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Cutting-edge technology for personalized learning',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Globe,
    title: 'Accessible',
    description: 'Quality education for everyone, everywhere',
    gradient: 'from-green-500 to-emerald-500',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-Founder',
    bio: 'Former Google engineer passionate about education',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    bio: 'AI researcher with 10+ years in EdTech',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    bio: 'Product leader from Meta and LinkedIn',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'David Kim',
    role: 'Head of Engineering',
    bio: 'Full-stack architect, Stanford CS graduate',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const milestones = [
  { quarter: 'Q4 2024', title: 'Platform Launch', status: 'completed' },
  { quarter: 'Q1 2025', title: 'Mobile Apps Release', status: 'in-progress' },
  { quarter: 'Q2 2025', title: 'Community Features', status: 'planned' },
  { quarter: 'Q3 2025', title: 'Enterprise Edition', status: 'planned' },
  { quarter: 'Q4 2025', title: 'Global Expansion', status: 'planned' },
];

const stats = [
  { value: '10,000+', label: 'Active Learners', icon: Users },
  { value: '95%', label: 'Success Rate', icon: Award },
  { value: '500+', label: 'Curated Resources', icon: Sparkles },
  { value: '50+', label: 'Career Paths', icon: TrendingUp },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <Rocket className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">About Navig.AI</span>
          </div>
          <h1 className="text-5xl mb-6">
            Bridging the Gap Between
            <br />
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Education and Employability
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize tech education using AI, helping millions discover
            their potential and launch successful careers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#667eea]" />
              <div className="text-3xl mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-0">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl mb-6">Our Mission</h2>
              <p className="text-lg text-white/90 mb-6">
                Traditional education often fails to keep pace with the rapidly evolving tech
                industry. We're changing that by combining artificial intelligence with curated
                expertise to create personalized learning experiences that actually work.
              </p>
              <p className="text-lg text-white/90">
                Every learner is unique. That's why we use AI to understand your background, goals,
                and learning style—then craft a roadmap that's perfect for you.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow text-center">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        > */}
          {/* <h2 className="text-3xl text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              > */}
                {/* <Card className="p-6 hover:shadow-xl transition-shadow">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-[#667eea] text-center mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl text-center mb-8">Product Roadmap</h2>
          <Card className="p-8">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed'
                        ? 'bg-green-500'
                        : milestone.status === 'in-progress'
                        ? 'bg-blue-500'
                        : 'bg-muted'
                    }`}
                  >
                    {milestone.status === 'completed' ? (
                      <Award className="w-6 h-6 text-white" />
                    ) : milestone.status === 'in-progress' ? (
                      <Rocket className="w-6 h-6 text-white" />
                    ) : (
                      <Target className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg">{milestone.title}</h3>
                      <Badge
                        variant={
                          milestone.status === 'completed'
                            ? 'default'
                            : milestone.status === 'in-progress'
                            ? 'secondary'
                            : 'outline'
                        }
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
                          : 'Planned'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.quarter}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-3xl mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the education revolution. Whether you're a learner, educator, or partner,
              we'd love to have you with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('form-filling')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:opacity-90"
              >
                Start Learning Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border-2 border-[#667eea] text-[#667eea] hover:bg-[#667eea] hover:text-white transition-colors"
              >
                Partner With Us
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
