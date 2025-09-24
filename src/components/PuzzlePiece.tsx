import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import puzzleImage from "@/assets/puzzle-image.jpg";

interface PuzzlePieceProps {
  id: number;
  isUnlocked: boolean;
  position: { row: number; col: number };
  totalRows: number;
  totalCols: number;
  onClick: () => void;
}

export const PuzzlePiece = ({ 
  id, 
  isUnlocked, 
  position, 
  totalRows, 
  totalCols, 
  onClick 
}: PuzzlePieceProps) => {
  const { row, col } = position;
  
  // Calculate the background position for this piece
  const bgPosX = (col / (totalCols - 1)) * 100;
  const bgPosY = (row / (totalRows - 1)) * 100;
  
  return (
    <motion.div
      className={cn(
        "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300",
        isUnlocked 
          ? "border-success shadow-success" 
          : "border-puzzle-locked shadow-card-custom hover:shadow-puzzle"
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...(isUnlocked && { 
          scale: [1, 1.1, 1],
          transition: { 
            scale: { duration: 0.6, ease: "easeOut" }
          }
        })
      }}
      transition={{ delay: id * 0.1 }}
    >
      {/* Puzzle piece background */}
      <div
        className={cn(
          "w-full h-full bg-cover bg-no-repeat transition-all duration-500",
          !isUnlocked && "blur-md"
        )}
        style={{
          backgroundImage: `url(${puzzleImage})`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          backgroundSize: `${totalCols * 100}% ${totalRows * 100}%`,
        }}
      />
      
      {/* Overlay for locked pieces */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-puzzle-locked/80 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        </div>
      )}
      
      {/* Success indicator for unlocked pieces */}
      {isUnlocked && (
        <motion.div 
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-6 h-6 text-success bg-white rounded-full" />
        </motion.div>
      )}
      
      {/* Piece number */}
      <div className="absolute bottom-2 left-2">
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded",
          isUnlocked 
            ? "bg-success text-white" 
            : "bg-muted text-muted-foreground"
        )}>
          {id + 1}
        </span>
      </div>
    </motion.div>
  );
};