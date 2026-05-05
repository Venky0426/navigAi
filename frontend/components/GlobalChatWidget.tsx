import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Send, Sparkles, X, MessageCircle, Lightbulb, User } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [targetRole, setTargetRole] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [sessionId] = useState<string>(() => {
    return 'global-' + Math.random().toString(36).substring(2, 12);
  });

  // Fetch role and initialize chat
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
                  content: `Hi! I'm your AI Mentor. I noticed you're working towards becoming a **${role}**. How can I help you today?`,
                  timestamp: new Date(),
                },
              ]);
              return;
            }
          }
        } catch (err) {
          console.error("Error fetching role:", err);
        }
      }
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hi! I'm your AI Career Mentor 👋 Ask me anything about tech careers or learning paths!",
          timestamp: new Date(),
        },
      ]);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

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
      const baseUrl = import.meta.env.VITE_API_URL || 'https://navigai-9z9f.onrender.com';
      const res = await fetch(`${baseUrl}/api/chat`, {
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
        content: 'Oops! I had a connection issue. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full shadow-2xl flex items-center justify-center text-white z-50 group"
      >
        <MessageCircle className="w-7 h-7 group-hover:hidden" />
        <Sparkles className="w-7 h-7 hidden group-hover:block animate-pulse" />
      </motion.button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Assistant</h3>
                    <p className="text-xs text-white/70">Always online to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-1 p-4 bg-slate-50">
                <div ref={scrollRef} className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className={`w-8 h-8 flex-shrink-0 ${message.type === 'ai' ? 'bg-indigo-100' : 'bg-slate-200'}`}>
                        {message.type === 'ai' ? <Sparkles className="w-4 h-4 text-indigo-600" /> : <User className="w-4 h-4 text-slate-600" />}
                      </Avatar>
                      <div className={`flex-1 max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                        message.type === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 rounded-tl-none'
                      }`}>
                        <div className="whitespace-pre-wrap">
                          {(() => {
                            if (message.type === 'ai') {
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
                                    <div className="mt-3 p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900 flex items-start gap-2">
                                      <Lightbulb className="w-4 h-4 flex-shrink-0 text-yellow-500 mt-0.5" />
                                      <div>
                                        <p className="font-bold text-xs">Follow-up</p>
                                        <p className="font-medium text-[13px]">{followUpContent}</p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            }
                            return <p>{message.content}</p>;
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 p-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
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
                    placeholder="Type your question..."
                    className="flex-1 rounded-xl bg-slate-50 border-slate-200 focus:ring-indigo-500"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
