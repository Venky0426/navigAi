import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import {
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Code2,
  Star,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

const resources = [
  {
    id: 1,
    title: 'Complete React Developer Course',
    type: 'course',
    category: 'React',
    level: 'Intermediate',
    duration: '24 hours',
    rating: 4.8,
    provider: 'Udemy',
    description: 'Master React from basics to advanced concepts',
    tags: ['React', 'Hooks', 'Redux'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
  },
  {
    id: 2,
    title: 'TypeScript Handbook',
    type: 'documentation',
    category: 'TypeScript',
    level: 'Beginner',
    duration: '8 hours',
    rating: 4.9,
    provider: 'Official Docs',
    description: 'Official TypeScript documentation and guide',
    tags: ['TypeScript', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
  },
  {
    id: 3,
    title: 'Build a Todo App with React',
    type: 'project',
    category: 'React',
    level: 'Beginner',
    duration: '3 hours',
    rating: 4.6,
    provider: 'freeCodeCamp',
    description: 'Step-by-step tutorial to build your first React app',
    tags: ['React', 'Project', 'Beginner'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
  },
  {
    id: 4,
    title: 'Advanced JavaScript Patterns',
    type: 'course',
    category: 'JavaScript',
    level: 'Advanced',
    duration: '16 hours',
    rating: 4.7,
    provider: 'Frontend Masters',
    description: 'Deep dive into advanced JavaScript concepts',
    tags: ['JavaScript', 'Design Patterns'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
  },
  {
    id: 5,
    title: 'CSS Grid & Flexbox Masterclass',
    type: 'course',
    category: 'CSS',
    level: 'Intermediate',
    duration: '10 hours',
    rating: 4.8,
    provider: 'Scrimba',
    description: 'Master modern CSS layout techniques',
    tags: ['CSS', 'Layout', 'Design'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
  },
  {
    id: 6,
    title: 'Node.js REST API Tutorial',
    type: 'project',
    category: 'Node.js',
    level: 'Intermediate',
    duration: '5 hours',
    rating: 4.7,
    provider: 'YouTube',
    description: 'Build a complete REST API from scratch',
    tags: ['Node.js', 'API', 'Backend'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
  },
];

const categories = ['All', 'React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [activeTab, setActiveTab] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <Video className="w-4 h-4" />;
      case 'documentation':
        return <FileText className="w-4 h-4" />;
      case 'project':
        return <Code2 className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || resource.level === selectedLevel;
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-3">Learning Resources</h1>
          <p className="text-muted-foreground">
            Curated courses, documentation, and projects for your learning path
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]'
                          : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="text-sm mb-2 block">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedLevel === level
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]'
                          : ''
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="documentation">Docs</TabsTrigger>
              <TabsTrigger value="project">Projects</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/30" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/90">
                      {resource.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start gap-2 mb-2">
                    {getTypeIcon(resource.type)}
                    <h3 className="text-sm flex-1 line-clamp-2">{resource.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{resource.duration}</span>
                    </div>
                    <span>{resource.provider}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    className="w-full mt-auto bg-gradient-to-r from-[#667eea] to-[#764ba2] group-hover:shadow-lg transition-shadow"
                    size="sm"
                  >
                    Start Learning
                    <ExternalLink className="ml-2 w-3 h-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setActiveTab('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
