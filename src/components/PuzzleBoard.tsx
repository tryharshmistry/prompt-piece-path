import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PuzzlePiece } from "./PuzzlePiece";
import { PromptModal } from "./PromptModal";
import { ProgressBar } from "./ProgressBar";
import { CompletionCelebration } from "./CompletionCelebration";
import { CertificateEditor } from "./CertificateEditor";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PUZZLE_PROMPTS = [
  {
    id: 0,
    title: "Create a funny college meme",
    description: "Use Gemini to generate a hilarious meme about college life, exams, or student struggles.",
    url: "https://gemini.google.com/",
    badge: "Creative Challenge",
    emoji: "😂"
  },
  {
    id: 1,
    title: "Suggest 5 time-saving exam tips",
    description: "Ask Gemini for practical study tips that can help students save time during exam preparation.",
    url: "https://gemini.google.com/",
    badge: "Study Smart",
    emoji: "📚"
  },
  {
    id: 2,
    title: "Plan a ₹500 budget weekend trip",
    description: "Challenge Gemini to create an amazing weekend itinerary with a tight budget constraint.",
    url: "https://gemini.google.com/",
    badge: "Budget Master",
    emoji: "🎒"
  },
  {
    id: 3,
    title: "Write a motivational quote for students",
    description: "Get Gemini to craft an inspiring quote that will motivate students during tough times.",
    url: "https://gemini.google.com/",
    badge: "Motivation Boost",
    emoji: "💪"
  },
  {
    id: 4,
    title: "Generate a roast for your best friend",
    description: "Have some fun and ask Gemini to create a playful, friendly roast for your bestie.",
    url: "https://gemini.google.com/",
    badge: "Fun & Games",
    emoji: "🔥"
  },
  {
    id: 5,
    title: "Create a study playlist description",
    description: "Ask Gemini to describe the perfect study playlist with song suggestions and mood descriptions.",
    url: "https://gemini.google.com/",
    badge: "Music Vibes",
    emoji: "🎵"
  }
];

interface PuzzleBoardProps {
  playerName: string;
  onRestart: () => void;
}

export const PuzzleBoard = ({ playerName, onRestart }: PuzzleBoardProps) => {
  const [unlockedPieces, setUnlockedPieces] = useState<Set<number>>(new Set());
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificateEditor, setShowCertificateEditor] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Grid configuration based on device
  const gridCols = isMobile ? 2 : 3;
  const gridRows = isMobile ? 3 : 2;
  const totalPieces = PUZZLE_PROMPTS.length;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`puzzle-progress-${playerName}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUnlockedPieces(new Set(progress.unlockedPieces || []));
    }
  }, [playerName]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`puzzle-progress-${playerName}`, JSON.stringify({
      unlockedPieces: Array.from(unlockedPieces),
      playerName,
      lastUpdated: new Date().toISOString()
    }));
  }, [unlockedPieces, playerName]);

  // Check for completion
  useEffect(() => {
    if (unlockedPieces.size === totalPieces && unlockedPieces.size > 0) {
      setIsCompleted(true);
    }
  }, [unlockedPieces.size, totalPieces]);

  const handlePieceClick = (pieceId: number) => {
    if (!unlockedPieces.has(pieceId)) {
      setSelectedPiece(pieceId);
    }
  };

  const handlePieceUnlock = (pieceId: number) => {
    const newUnlocked = new Set([...unlockedPieces, pieceId]);
    setUnlockedPieces(newUnlocked);
    
    toast({
      title: "Puzzle Piece Unlocked! 🎉",
      description: `Great job! You've completed prompt ${pieceId + 1}.`,
    });
  };

  const handleShare = () => {
    const message = `🎉 I just completed the Prompt Puzzle! I unlocked all ${totalPieces} pieces by completing Gemini prompts. Challenge yourself at: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Prompt Puzzle Completed!',
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      toast({
        title: "Link copied! 📋",
        description: "Share this with your friends to challenge them!",
      });
    }
  };

  const getPiecePosition = (index: number) => {
    return {
      row: Math.floor(index / gridCols),
      col: index % gridCols
    };
  };

  if (showCertificateEditor) {
    return (
      <CertificateEditor
        playerName={playerName}
        onBack={() => setShowCertificateEditor(false)}
      />
    );
  }

  if (isCompleted) {
    return (
      <CompletionCelebration
        playerName={playerName}
        onShare={handleShare}
        onRestart={onRestart}
        onEditCertificate={() => setShowCertificateEditor(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-puzzle p-4 space-y-6">
      <ProgressBar 
        unlockedCount={unlockedPieces.size}
        totalPieces={totalPieces}
        playerName={playerName}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div 
          className={`grid gap-4 ${
            isMobile ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {PUZZLE_PROMPTS.map((prompt, index) => (
            <PuzzlePiece
              key={prompt.id}
              id={prompt.id}
              isUnlocked={unlockedPieces.has(prompt.id)}
              position={getPiecePosition(index)}
              totalRows={gridRows}
              totalCols={gridCols}
              onClick={() => handlePieceClick(prompt.id)}
            />
          ))}
        </div>
      </motion.div>

      {selectedPiece !== null && (
        <PromptModal
          isOpen={true}
          onClose={() => setSelectedPiece(null)}
          onComplete={() => handlePieceUnlock(selectedPiece)}
          prompt={PUZZLE_PROMPTS[selectedPiece]}
        />
      )}
    </div>
  );
};