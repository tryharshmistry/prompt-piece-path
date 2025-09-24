import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Share2, Download, Star, Edit3 } from "lucide-react";
import puzzleImage from "@/assets/puzzle-image.jpg";

interface CompletionCelebrationProps {
  playerName: string;
  onShare: () => void;
  onRestart: () => void;
  onEditCertificate: () => void;
}

export const CompletionCelebration = ({ 
  playerName, 
  onShare, 
  onRestart,
  onEditCertificate 
}: CompletionCelebrationProps) => {
  
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      });
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-puzzle backdrop-blur-sm border-white/20 overflow-hidden">
          <CardHeader className="text-center space-y-4 bg-gradient-success text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl font-bold">
              Congratulations {playerName}! 🎉
            </CardTitle>
            
            <p className="text-white/90">
              You solved the Prompt Puzzle & completed all prompts! 🚀
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 p-6">
            {/* Completed puzzle image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <img 
                src={puzzleImage} 
                alt="Completed puzzle" 
                className="w-full rounded-lg shadow-lg"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute top-2 right-2"
              >
                <Badge className="bg-gradient-success text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Completed!
                </Badge>
              </motion.div>
            </motion.div>
            
            {/* Achievement summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-3 text-center"
            >
              <div className="p-3 bg-puzzle-bg rounded-lg">
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-xs text-muted-foreground">Prompts</div>
              </div>
              <div className="p-3 bg-puzzle-bg rounded-lg">
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
              <div className="p-3 bg-puzzle-bg rounded-lg">
                <div className="text-2xl font-bold text-warning">1</div>
                <div className="text-xs text-muted-foreground">Master</div>
              </div>
            </motion.div>
            
            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-3"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={onShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Achievement
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={onRestart}
                >
                  Try Again
                </Button>
                <Button
                  variant="premium"
                  onClick={onEditCertificate}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Certificate
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    // Simple download simulation
                    const link = document.createElement('a');
                    link.href = puzzleImage;
                    link.download = `${playerName}-puzzle-completion.jpg`;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};