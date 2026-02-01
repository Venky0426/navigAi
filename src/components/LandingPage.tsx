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
    description: 'Master ML, statistics, and data visualization',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1659696928555-11a2769a4644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW50aXN0JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MjQ5NzY4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'AI Enginerr',
    description: 'Build stunning user interfaces with React',
    icon: Rocket,
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1489438497675-d1a8d6e0632e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjBjb2Rpbmd8ZW58MXx8fHwxNzYyNDk3Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Cloud Engineer',
    description: 'Design scalable cloud infrastructure',
    icon: Brain,
    gradient: 'from-indigo-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1690627931320-16ac56eb2588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyNDUwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Frontend Developer at Meta',
    text: 'The personalized learning path saved me hundreds of hours. Best career decision I ever made.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Priya Sharma',
    role: 'Cloud Engineer at AWS',
    text: 'Amazing platform! The AI mentor feature is like having a personal career coach available 24/7.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
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


       <center> 
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">AI-Powered Career Navigation</span>
            </div>
        </center>  
    



          {/* Hero Image with Description */}
{/* Hero Image with Description */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col sm:flex-row items-center gap-6 justify-center"
>
  {/* Reduced Image Block */}
  <div
    style={{
      width: '600px',  // fixed small width
      height: '300px', // fixed small height
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      flexShrink: 0,
      position: 'relative',
    }}
  >
    <ImageWithFallback
      src="https://cdn.gamma.app/eoskw3mp648tqtk/627146f51dde445d83f037ce80519003/original/ai-mentor-guiding-student-with-career-roadmap-illu-HMrbOc1CFBVbHugBP193m1GF3Y0UB8.jpg"
      alt="AI Technology"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
      }}
    />
  </div>


        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xxl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              AI that guides your
              <br />
              learning journey
            </h1>
          </motion.div>
</div>
</motion.div>

<br>
</br>
<br>
</br>
   <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center`}
                    >
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2">{role.title}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                    <div className="mt-4 flex items-center text-[#667eea] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm">Start Learning</span>
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white mb-4 text-xl">
                    {item.step}
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Success Stories</h2>
            <p className="text-muted-foreground">
              Join thousands who've transformed their careers with Navig.AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-4xl mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of learners who are already on their path to success
            </p>
            <Button
              size="lg"
              className="bg-white text-[#667eea] hover:bg-white/90"
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