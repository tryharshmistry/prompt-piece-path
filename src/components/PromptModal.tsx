import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles, Target } from "lucide-react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  prompt: {
    id: number;
    title: string;
    description: string;
    url: string;
    badge: string;
    emoji: string;
  };
}

export const PromptModal = ({ isOpen, onClose, onComplete, prompt }: PromptModalProps) => {
  const handleOpenLink = () => {
    window.open(prompt.url, '_blank');
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="text-2xl">{prompt.emoji}</span>
            Puzzle Piece #{prompt.id + 1}
          </DialogTitle>
        </DialogHeader>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-3">
            <Badge variant="secondary" className="text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              {prompt.badge}
            </Badge>
            
            <div className="p-4 bg-gradient-puzzle rounded-lg border">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-base mb-2">{prompt.title}</h3>
                  <p className="text-sm text-muted-foreground">{prompt.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleOpenLink}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Gemini & Try This Prompt
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">
                Complete the prompt in Gemini, then click below to unlock this piece!
              </p>
              
              <Button
                variant="success"
                size="lg"
                className="w-full"
                onClick={handleComplete}
              >
                I Tried It ✅
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};