import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'home', label: 'Dashboard' },
    { id: 'resources', label: 'Resources' },
    { id: 'how-to-start', label: 'How to Start' },
    { id: 'dashboard', label: 'Progress' },
    { id: 'ai-mentor', label: 'AI Mentor' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Navig.AI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 transition-colors ${
                  currentPage === item.id
                    ? 'text-[#667eea]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => onNavigate('login')}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
              onClick={() => onNavigate('form-filling')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea]'
                    : 'hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                onClick={() => {
                  onNavigate('form-filling');
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
