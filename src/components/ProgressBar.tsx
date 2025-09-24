import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target } from "lucide-react";

interface ProgressBarProps {
  unlockedCount: number;
  totalPieces: number;
  playerName: string;
}

export const ProgressBar = ({ unlockedCount, totalPieces, playerName }: ProgressBarProps) => {
  const progress = (unlockedCount / totalPieces) * 100;
  
  const getBadges = () => {
    const badges = [];
    
    if (unlockedCount >= 2) {
      badges.push({ icon: Star, label: "Creative 🎨", color: "bg-warning" });
    }
    if (unlockedCount >= 4) {
      badges.push({ icon: Target, label: "Idea Maker 💡", color: "bg-info" });
    }
    if (unlockedCount >= 6) {
      badges.push({ icon: Trophy, label: "Fun Genius 😂", color: "bg-success" });
    }
    
    return badges;
  };

  return (
    <div className="w-full space-y-4 p-4 bg-card rounded-lg shadow-card-custom">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Hey {playerName}! 👋
        </h2>
        <div className="text-sm font-medium text-muted-foreground">
          {unlockedCount}/{totalPieces} Unlocked
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress 
          value={progress} 
          className="h-3"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-1 bg-gradient-primary rounded-full"
        />
      </div>
      
      {getBadges().length > 0 && (
        <div className="flex flex-wrap gap-2">
          {getBadges().map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                <badge.icon className="w-3 h-3" />
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>
      )}
      
      {progress === 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center p-3 bg-gradient-success rounded-lg text-white font-medium"
        >
          🎉 Puzzle Master Achieved! 🎉
        </motion.div>
      )}
    </div>
  );
};