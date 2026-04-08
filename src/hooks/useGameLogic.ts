"use client";

import { useState } from "react";
import { GamePhase } from "../lib/types";

export function useGameLogic() {
  const [phase, setPhase] = useState<GamePhase>("START");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const startExperiment = () => {
    setIsAudioPlaying(true);
    setPhase("TUTORIAL");
  };

  const advancePhase = (nextPhase: GamePhase) => {
    setPhase(nextPhase);
  };

  return {
    phase,
    isAudioPlaying,
    startExperiment,
    advancePhase,
  };
}