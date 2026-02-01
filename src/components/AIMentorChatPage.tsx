import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    content:
      "Hi! I'm your AI Career Mentor 👋 I'm here to help you with your learning journey. Ask me anything about programming, career advice, or your roadmap!",
    timestamp: new Date(),
  },
];

export function AIMentorChatPage({ onNavigate }: AIMentorChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState<string>(() => {
    // Generate a random session ID for the user
    return 'sess-' + Math.random().toString(36).substring(2, 12);
  });

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
        body: JSON.stringify({ message: content, session_id: sessionId }),
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
    <div className="min-h-screen pt-24 pb-6 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)]">
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
                          className={`w-8 h-8 flex-shrink-0 ${
                            message.type === 'ai'
                              ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
                              : 'bg-muted'
                          }`}
                        >
                          {message.type === 'ai' ? <Sparkles className="w-4 h-4 text-white" /> : <span className="text-sm">You</span>}
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
                    placeholder="Ask me about a course or topic..."
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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
              <Card className="p-6">
                <h3 className="mb-3">💡 Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Ask specific questions about any course. The mentor will focus on your main course and relate others back to it!
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}