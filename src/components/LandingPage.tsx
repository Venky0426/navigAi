import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Sparkles,
  Target,
  Brain,
  Rocket,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const roles = [
  {
    title: 'Data Scientist',
    description: 'ML, statistics, data analysis',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1659696928555-11a2769a4644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW50aXN0JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MjQ5NzY4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'AI Engineer',
    description: 'Build AI models & applications',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1489438497675-d1a8d6e0632e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjBjb2Rpbmd8ZW58MXx8fHwxNzYyNDk3Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Cloud Engineer',
    description: 'AWS, Azure, scalable systems',
    icon: Rocket,
    gradient: 'from-indigo-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1690627931320-16ac56eb2588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyNDUwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Frontend Developer',
    description: 'React, UI/UX, web apps',
    icon: Sparkles,
    gradient: 'from-pink-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    title: 'Full Stack Developer',
    description: 'Frontend + Backend development',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    title: 'DevOps Engineer',
    description: 'CI/CD, Docker, Kubernetes',
    icon: Target,
    gradient: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Security, ethical hacking',
    icon: Award,
    gradient: 'from-red-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    title: 'Blockchain Developer',
    description: 'Web3, smart contracts',
    icon: Brain,
    gradient: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

const howItWorks = [
  { step: '01', title: 'Choose Role', description: 'Select your dream tech career path' },
  { step: '02', title: 'AI Generates Roadmap', description: 'Get personalized learning journey' },
  { step: '03', title: 'Start Learning', description: 'Access curated resources and track progress' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Data Scientist at Google',
    text: 'Navig.AI helped me transition from finance to tech in just 6 months. The AI-powered roadmap was spot-on!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Frontend Developer at Meta',
    text: 'The personalized learning path saved me hundreds of hours. Best career decision I ever made.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Priya Sharma',
    role: 'Cloud Engineer at AWS',
    text: 'Amazing platform! The AI mentor feature is like having a personal career coach available 24/7.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">AI-Powered Career Navigation</span>
          </div>
        </div>

        {/* Hero Image with Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-10 justify-center max-w-6xl mx-auto"
        >
          {/* Reduced Image Block */}
          <div
            className="rounded-xl overflow-hidden shadow-2xl flex-shrink-0 relative"
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '350px',
            }}
          >
            <ImageWithFallback
              src="/navig.png"
              alt="AI Mentor guiding student"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-tight">
              AI that guides your
              <br />
              learning journey
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
              Get a personalized career roadmap, AI mentorship, and curated resources — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 shadow-lg shadow-purple-500/30"
                onClick={() => onNavigate('form-filling')}
              >
                Get Started <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('about')}>
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Top Roles Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Explore Top Tech Roles</h2>
            <p className="text-muted-foreground">
              Start your journey in the most in-demand careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden border-2 hover:border-transparent transition-all hover:shadow-xl hover:shadow-purple-500/20"
                  onClick={() => onNavigate('form-filling')}
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center`}
                    >
                      <role.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-base font-semibold">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <div className="mt-4 flex items-center text-[#667eea] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs">Start Learning</span>
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">How Navig.AI Works</h2>
            <p className="text-muted-foreground">
              Your personalized learning journey in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Navig AI */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-gray-900 font-bold">Why Choose Navig AI</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stop guessing your career path. Get clarity, structure, and AI-powered guidance to reach your goals faster.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6 text-center hover:shadow-lg transition-all group border-0 bg-slate-50">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-200">
                  <Target className="text-white w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">Structured Roadmap</h3>
                <p className="text-sm text-muted-foreground">Clear step-by-step plan from beginner to job-ready level.</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 text-center hover:shadow-lg transition-all group border-0 bg-slate-50">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
                  <TrendingUp className="text-white w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Track your growth and stay consistent with measurable progress.</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-6 text-center hover:shadow-lg transition-all group border-0 bg-slate-50">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-200">
                  <Brain className="text-white w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">AI Mentor</h3>
                <p className="text-sm text-muted-foreground">Get smart guidance like a personal mentor anytime.</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-6 text-center hover:shadow-lg transition-all group border-0 bg-slate-50">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">Career Clarity</h3>
                <p className="text-sm text-muted-foreground">Confused about what to learn? We give you clear direction.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6 font-bold">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of learners who are already on their path to success
            </p>
            <Button
              size="lg"
              className="bg-white text-[#667eea] hover:bg-white/90 font-bold px-8 shadow-xl"
              onClick={() => onNavigate('form-filling')}
            >
              Start Your Journey Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}