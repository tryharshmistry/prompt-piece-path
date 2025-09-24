import { useState, useEffect } from "react";
import { WelcomePage } from "@/components/WelcomePage";
import { PuzzleBoard } from "@/components/PuzzleBoard";

export default function PuzzleGame() {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);

  // Check for saved player name on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("puzzle-player-name");
    if (savedName) {
      setPlayerName(savedName);
      setGameStarted(true);
    }
  }, []);

  const handleStart = (name: string) => {
    setPlayerName(name);
    localStorage.setItem("puzzle-player-name", name);
    setGameStarted(true);
  };

  const handleRestart = () => {
    // Clear all saved progress
    localStorage.removeItem("puzzle-player-name");
    localStorage.removeItem(`puzzle-progress-${playerName}`);
    setPlayerName("");
    setGameStarted(false);
  };

  if (!gameStarted) {
    return <WelcomePage onStart={handleStart} />;
  }

  return <PuzzleBoard playerName={playerName} onRestart={handleRestart} />;
}