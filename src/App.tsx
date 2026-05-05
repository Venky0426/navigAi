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
      <Toaster />
    </div>
  );
}
