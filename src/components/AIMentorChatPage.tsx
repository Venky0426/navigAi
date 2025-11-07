import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Sparkles, Lightbulb, Code, BookOpen, Target } from 'lucide-react';

interface AIMentorChatPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { text: 'How do I learn React Hooks?', icon: Code },
  { text: 'What should I learn next?', icon: Target },
  { text: 'Explain closures in JavaScript', icon: Lightbulb },
  { text: 'Recommend resources for TypeScript', icon: BookOpen },
];

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hi! I'm your AI Career Mentor 👋 I'm here to help you with your learning journey. Ask me anything about programming, career advice, or your roadmap!",
    timestamp: new Date(),
  },
];

const aiResponses: { [key: string]: string } = {
  'react hooks': "React Hooks are functions that let you use state and other React features in functional components. Start with useState and useEffect - they're the most commonly used. I recommend:\n\n1. Learn useState for managing component state\n2. Master useEffect for side effects\n3. Explore useContext for sharing data\n4. Practice with real projects\n\nWould you like me to recommend some resources?",
  'learn next': "Based on your current progress in React, I recommend focusing on:\n\n1. TypeScript - Essential for modern development\n2. State Management - Redux or Zustand\n3. Testing - Jest and React Testing Library\n4. Next.js - For production-ready apps\n\nWhich area interests you most?",
  'closures': "A closure in JavaScript is when a function 'remembers' variables from its outer scope even after the outer function has finished executing.\n\n```javascript\nfunction outer() {\n  const name = 'Alex';\n  function inner() {\n    console.log(name); // Can access 'name'\n  }\n  return inner;\n}\n```\n\nClosures are powerful for data privacy and creating factory functions. Want to see more examples?",
  'typescript': "Great choice! TypeScript adds type safety to JavaScript. Here are my top resource recommendations:\n\n📚 Official TypeScript Handbook\n🎥 TypeScript Crash Course by Traversy Media\n💻 TypeScript exercises on Exercism\n📖 'Effective TypeScript' book\n\nStart with the basics: types, interfaces, and generics. Should I add these to your roadmap?",
  'default': "I'm here to help! You can ask me about:\n\n• Learning specific technologies\n• Career advice and roadmap guidance\n• Code explanations and debugging\n• Resource recommendations\n• Best practices and tips\n\nWhat would you like to know?",
};

export function AIMentorChatPage({ onNavigate }: AIMentorChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = getAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    return aiResponses.default;
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="min-h-screen pt-24 pb-6 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">AI Career Mentor</h1>
              <p className="text-sm text-muted-foreground">Always here to help you learn and grow</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex gap-3 ${
                          message.type === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <Avatar className={`w-8 h-8 flex-shrink-0 ${
                          message.type === 'ai'
                            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
                            : 'bg-muted'
                        }`}>
                          {message.type === 'ai' ? (
                            <Sparkles className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-sm">You</span>
                          )}
                        </Avatar>
                        <div
                          className={`flex-1 max-w-[80%] rounded-2xl p-4 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white ml-auto'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                        <Sparkles className="w-4 h-4 text-white" />
                      </Avatar>
                      <div className="bg-muted rounded-2xl p-4">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Prompts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="mb-4">Quick Questions</h3>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleQuickPrompt(prompt.text)}
                    >
                      <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* AI Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="mb-4">I can help with:</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-start py-2">
                    📚 Learning recommendations
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start py-2">
                    🎯 Career guidance
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start py-2">
                    💻 Code explanations
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start py-2">
                    🗺️ Roadmap planning
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start py-2">
                    🐛 Debugging help
                  </Badge>
                </div>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="mb-3">💡 Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Ask specific questions for better answers. Include context about your current level and goals!
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
