import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import {
  Play,
  CheckCircle2,
  BookOpen,
  Target,
  MessageCircle,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface HowToStartPageProps {
  onNavigate: (page: string) => void;
}

const steps = [
  {
    number: '1',
    title: 'Complete Your Profile',
    description: 'Tell us about your goals, skills, and interests',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    action: 'form-filling',
    actionLabel: 'Complete Profile',
  },
  {
    number: '2',
    title: 'Review Your Roadmap',
    description: 'Explore your AI-generated personalized learning path',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
    action: 'roadmap',
    actionLabel: 'View Roadmap',
  },
  {
    number: '3',
    title: 'Browse Resources',
    description: 'Access curated courses, tutorials, and projects',
    icon: Play,
    color: 'from-green-500 to-emerald-500',
    action: 'resources',
    actionLabel: 'Browse Resources',
  },
  {
    number: '4',
    title: 'Track Your Progress',
    description: 'Monitor achievements, streaks, and milestones',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    action: 'dashboard',
    actionLabel: 'View Dashboard',
  },
  {
    number: '5',
    title: 'Get AI Guidance',
    description: 'Chat with your AI mentor whenever you need help',
    icon: MessageCircle,
    color: 'from-indigo-500 to-purple-500',
    action: 'ai-mentor',
    actionLabel: 'Chat Now',
  },
];

const faqs = [
  {
    question: 'How does the AI roadmap work?',
    answer: 'Our AI analyzes your current skills, goals, and interests to create a personalized learning path. It considers industry trends, job requirements, and your learning pace to recommend the most effective sequence of topics and resources.',
  },
  {
    question: 'Can I customize my learning path?',
    answer: 'Absolutely! While our AI provides a recommended path, you can skip topics you already know, adjust the pace, and add custom learning goals. The roadmap adapts based on your progress and feedback.',
  },
  {
    question: 'How do I track my progress?',
    answer: 'The dashboard shows your completion rates, learning streaks, earned badges, and skill levels. You can see detailed analytics of time spent, tasks completed, and milestones achieved.',
  },
  {
    question: 'What kind of resources are available?',
    answer: 'We curate resources from top platforms including courses, documentation, tutorials, and hands-on projects. All resources are vetted for quality and aligned with your learning goals.',
  },
  {
    question: 'How does the AI Mentor help?',
    answer: 'The AI Mentor provides instant answers to your questions, explains complex concepts, helps debug code, suggests resources, and offers career guidance. It\'s available 24/7 and learns from your interactions.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'Currently, Navig.AI is web-based and fully responsive on all devices. We\'re working on native mobile apps that will be available soon.',
  },
];

const tips = [
  'Set a daily learning goal and stick to it',
  'Complete at least one task from your roadmap every day',
  'Join the community and connect with other learners',
  'Don\'t hesitate to ask the AI Mentor for help',
  'Build projects to apply what you learn',
  'Review your progress weekly to stay motivated',
];

export function HowToStartPage({ onNavigate }: HowToStartPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-3">Getting Started with Navig.AI</h1>
          <p className="text-muted-foreground text-lg">
            Your complete guide to launching your learning journey
          </p>
        </motion.div>

        {/* Step-by-Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl mb-6">5 Steps to Success</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-sm">
                              {step.number}
                            </div>
                            <h3>{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 flex-shrink-0"
                          onClick={() => onNavigate(step.action)}
                        >
                          {step.actionLabel}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <h2 className="text-2xl mb-4">💡 Pro Tips for Success</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
          <Card className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-2xl mb-3">Ready to Begin?</h2>
            <p className="text-muted-foreground mb-6">
              Start your personalized learning journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                onClick={() => onNavigate('form-filling')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('ai-mentor')}
              >
                Talk to AI Mentor
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
