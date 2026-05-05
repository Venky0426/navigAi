import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import FormFillingPage from './components/FormFillingPage';
import RoadmapPage from './components/RoadmapPage';
import { HomePage } from './components/HomePage';
import ResourcesPage from './components/ResourcesPage';
import { HowToStartPage } from './components/HowToStartPage';
import { DashboardPage } from './components/DashboardPage';
import { AIMentorChatPage } from './components/AIMentorChatPage';
import { AboutPage } from './components/AboutPage';
import { Toaster } from './components/ui/sonner';
import { GlobalChatWidget } from './components/GlobalChatWidget';
import { HelpCircle } from 'lucide-react';

type PageType =
  | 'landing'
  | 'login'
  | 'form-filling'
  | 'roadmap'
  | 'home'
  | 'resources'
  | 'how-to-start'
  | 'dashboard'
  | 'ai-mentor'
  | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'form-filling':
        return <FormFillingPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'resources':
        return <ResourcesPage />;
      case 'how-to-start':
        return <HowToStartPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'ai-mentor':
        return <AIMentorChatPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      
      {/* Global AI Chat & Help Buttons */}
      <GlobalChatWidget />
      
      <button 
        onClick={() => handleNavigate('about')}
        className="fixed bottom-24 right-6 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all z-50 group"
        title="Help & FAQ"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Need Help?
        </span>
      </button>

      <Toaster />
    </div>
  );
}
