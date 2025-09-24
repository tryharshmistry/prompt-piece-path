import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/enhanced-button";
import { Puzzle, Sparkles, Trophy } from "lucide-react";

interface WelcomePageProps {
  onStart: (name: string) => void;
}

export const WelcomePage = ({ onStart }: WelcomePageProps) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-puzzle backdrop-blur-sm border-white/20">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center"
            >
              <Puzzle className="w-8 h-8 text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome to Prompt Puzzle 🎯
            </CardTitle>
            
            <p className="text-muted-foreground text-center">
              Complete Gemini prompts to unlock puzzle pieces and reveal the hidden image!
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 p-3 bg-puzzle-bg rounded-lg"
            >
              <Sparkles className="w-5 h-5 text-warning" />
              <span className="text-sm">6 exciting prompts to complete</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-3 p-3 bg-puzzle-bg rounded-lg"
            >
              <Trophy className="w-5 h-5 text-success" />
              <span className="text-sm">Unlock achievements & certificates</span>
            </motion.div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Enter your name to get started:
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your awesome name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleStart()}
                className="text-center"
              />
            </div>
            
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full"
              onClick={handleStart}
              disabled={!name.trim()}
            >
              Start Your Puzzle Adventure 🚀
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};