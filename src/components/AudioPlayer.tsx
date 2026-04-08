"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
}

export default function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Arka plan müziği için uygun ses seviyesi
      
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Otomatik oynatma engellendi, kullanıcı etkileşimi bekleniyor.", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="/assets/music/wicked-game.mp3"
        loop
      />
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-lab-card border border-lab-border text-neon-blue shadow-glow-blue hover:bg-opacity-80 transition-all duration-300"
          aria-label="Sesi Aç/Kapat"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
    </div>
  );
}