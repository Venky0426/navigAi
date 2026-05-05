import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Sparkles, Lightbulb, Code, BookOpen, Target, User } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface AIMentorChatPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const getQuickPrompts = (role: string | null) => {
  if (!role) return [
    { text: 'How do I learn React Hooks?', icon: Code },
    { text: 'What should I learn next?', icon: Target },
    { text: 'Explain closures in JavaScript', icon: Lightbulb },
    { text: 'Recommend resources for TypeScript', icon: BookOpen },
  ];

  return [
    { text: `What are the core skills for ${role}?`, icon: Target },
    { text: `Best project ideas for ${role}`, icon: Code },
    { text: `How is the job market for ${role}?`, icon: Sparkles },
    { text: `Interview questions for ${role}`, icon: BookOpen },
  ];
};

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content:
      "Hi! I'm your AI Career Mentor 👋 I'm here to help you with your learning journey. Ask me anything about programming, career advice, or your roadmap!",
    timestamp: new Date(),
  },
];

export function AIMentorChatPage({ onNavigate }: AIMentorChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [targetRole, setTargetRole] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [sessionId] = useState<string>(() => {
    return 'sess-' + Math.random().toString(36).substring(2, 12);
  });

  // Fetch user's target role from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const roadmapRef = doc(db, "users", user.uid, "roadmaps", "current");
          const docSnap = await getDoc(roadmapRef);
          if (docSnap.exists()) {
            const role = docSnap.data().formData?.targetRole;
            if (role) {
              setTargetRole(role);
              setMessages([
                {
                  id: '1',
                  type: 'ai',
                  content: `Hi! I'm your AI Career Mentor 👋 I see you're aiming to become a **${role}**. \n\nI'm here to help you specifically with your ${role} journey. \n\nTo get started, **what specific area of ${role} are you most interested in?** Or would you like me to explain the core skills you'll need?`,
                  timestamp: new Date(),
                },
              ]);
              return; // Exit early as we've set the specific message
            }
          }
        } catch (err) {
          console.error("Error fetching role:", err);
        }
      }

      // Fallback if no user, no role found, or error
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hi! I'm your AI Career Mentor 👋 I'm here to help you with your learning journey. Ask me anything about programming, career advice, or your roadmap!",
          timestamp: new Date(),
        },
      ]);
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll on new messages or typing indicator
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          session_id: sessionId,
          target_role: targetRole
        }),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Oops! Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-6xl mx-auto h-[calc(100vh-10rem)] max-h-[800px]">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">AI Career Mentor</h1>
              <p className="text-sm text-muted-foreground">
                Always here to help you learn and grow
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-6">
                <div ref={scrollRef} className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar
                          className={`w-8 h-8 flex-shrink-0 ${message.type === 'ai'
                            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
                            : 'bg-muted'
                            }`}
                        >
                          {message.type === 'ai' ? <Sparkles className="w-4 h-4 text-white" /> : <span className="text-sm">You</span>}
                        </Avatar>
                        <div
                          className={`flex-1 max-w-[85%] rounded-2xl p-4 shadow-sm ${message.type === 'user'
                            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white ml-auto rounded-tr-none'
                            : 'bg-white border border-slate-100 rounded-tl-none'
                            }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">
                            {(() => {
                              if (message.type === 'ai') {
                                // Try splitting by the exact prompt phrase first, then variations
                                const splitKeywords = ['2. ❓ Follow-up Question:', '❓ Follow-up Question:', 'Follow-up Question:'];
                                let mainContent = message.content;
                                let followUpContent = null;

                                for (const keyword of splitKeywords) {
                                  if (message.content.includes(keyword)) {
                                    const parts = message.content.split(keyword);
                                    mainContent = parts[0].trim();
                                    followUpContent = parts[1].trim();
                                    break;
                                  }
                                }

                                return (
                                  <>
                                    <p>{mainContent}</p>
                                    {followUpContent && (
                                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-900 dark:text-blue-100 flex items-start gap-2">
                                        <Lightbulb className="w-6 h-6 flex-shrink-0 text-yellow-400 mt-0.5" />
                                        <div>
                                          <p className="font-medium text-xs uppercase tracking-wider text-blue-500 mb-1">Follow-up</p>
                                          <p className="font-bold text-blue-800 dark:text-blue-200">{followUpContent}</p>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              }
                              return <p>{message.content}</p>;
                            })()}
                          </div>
                          <p
                            className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                              }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                      <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                        <Sparkles className="w-4 h-4 text-white" />
                      </Avatar>
                      <div className="bg-muted rounded-2xl p-4">
                        <div className="flex gap-1">
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputValue);
                  }}
                  className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask your mentor anything..."
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] hover:opacity-90 rounded-xl shadow-md"
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6">
                <h3 className="mb-4">Quick Questions</h3>
                <div className="space-y-2">
                  {getQuickPrompts(targetRole).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 whitespace-normal hover:bg-blue-50 hover:border-blue-200 transition-all group"
                      onClick={() => handleQuickPrompt(prompt.text)}
                    >
                      <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm flex-1">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="mb-4">I can help with:</h3>
                <div className="space-y-2">
                  {['📚 Learning recommendations', '🎯 Career guidance', '💻 Code explanations', '🗺️ Roadmap planning', '🐛 Debugging help'].map((text, i) => (
                    <Badge key={i} variant="secondary" className="w-full justify-start py-2">{text}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="p-6 bg-slate-50 border-0 shadow-inner">
                <h3 className="mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span>Pro Tip</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask specific questions about your chosen role. Your AI Mentor is specialized in **{targetRole || 'Tech Careers'}** and can give you deep domain insights!
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}