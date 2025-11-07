import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Target, Sparkles, X } from 'lucide-react';

interface FormFillingPageProps {
  onNavigate: (page: string) => void;
}

const skillOptions = [
  'JavaScript', 'Python', 'React', 'TypeScript', 'Node.js',
  'SQL', 'Machine Learning', 'AWS', 'Docker', 'Git'
];

const goalOptions = [
  'Career Switch', 'Skill Enhancement', 'Freelancing',
  'Startup', 'Career Growth', 'Remote Work'
];

const experienceLevels = [
  { value: 'beginner', label: 'Beginner', desc: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', desc: '1-3 years experience' },
  { value: 'advanced', label: 'Advanced', desc: '3+ years experience' },
];

export function FormFillingPage({ onNavigate }: FormFillingPageProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [interests, setInterests] = useState('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setCustomSkill('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to roadmap page with form data
    onNavigate('roadmap');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Personalize Your Journey</span>
            </div>
            <h1 className="text-4xl mb-3">Tell Us About Yourself</h1>
            <p className="text-muted-foreground">
              Help our AI create the perfect learning roadmap for you
            </p>
          </div>

          <Card className="p-8 shadow-xl border-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Experience Level */}
              <div className="space-y-4">
                <Label className="text-base">What's your experience level?</Label>
                <div className="grid md:grid-cols-3 gap-4">
                  {experienceLevels.map((level) => (
                    <motion.div
                      key={level.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => setExperience(level.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          experience === level.value
                            ? 'border-[#667eea] bg-gradient-to-br from-blue-50 to-purple-50'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="font-medium mb-1">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.desc}</div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Current Skills */}
              <div className="space-y-4">
                <Label className="text-base">What skills do you already have?</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillOptions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && (
                        <X className="ml-1 w-3 h-3" />
                      )}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                  />
                  <Button type="button" onClick={addCustomSkill} variant="outline">
                    Add
                  </Button>
                </div>
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground mr-2">Selected:</span>
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Goals */}
              <div className="space-y-4">
                <Label className="text-base">What are your career goals?</Label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((goal) => (
                    <Badge
                      key={goal}
                      variant={selectedGoals.includes(goal) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedGoals.includes(goal)
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleGoal(goal)}
                    >
                      {goal}
                      {selectedGoals.includes(goal) && (
                        <X className="ml-1 w-3 h-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <Label htmlFor="interests" className="text-base">
                  Tell us about your interests and what you want to learn
                </Label>
                <Textarea
                  id="interests"
                  placeholder="E.g., I'm passionate about AI and want to build intelligent applications..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('landing')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                  disabled={!experience || selectedSkills.length === 0 || selectedGoals.length === 0}
                >
                  <Target className="mr-2 w-4 h-4" />
                  Generate My Roadmap
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="text-sm text-blue-900">
              <Sparkles className="inline w-4 h-4 mr-1" />
              Our AI will analyze your inputs to create a personalized learning path tailored to your goals
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
