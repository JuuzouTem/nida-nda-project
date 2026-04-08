"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HEIAN_TEXTS } from "../lib/constants";

interface HeianEraSceneProps {
  onComplete: () => void;
}

// Sakura parçacıkları için kesin tipler
interface Sakura {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  xDrift: string[];
}

export default function HeianEraScene({ onComplete }: HeianEraSceneProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [sakuras, setSakuras] = useState<Sakura[]>([]);

  // 1. ADIM: Sakuraları SADECE BİR KEZ (bileşen yüklendiğinde) oluşturuyoruz.
  // Böylece metin değiştiğinde (re-render) sakuralar ışınlanmıyor.
  useEffect(() => {
    const generatedSakuras = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 10,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      xDrift:[
        "0vw",
        `${Math.random() * 10 - 5}vw`,
        `${Math.random() * 20 - 10}vw`
      ]
    }));
    setSakuras(generatedSakuras);
  },[]);

  // 2. ADIM: Şiirsel metinleri zamana bağlı olarak ilerletiyoruz.
  useEffect(() => {
    if (textIndex < HEIAN_TEXTS.length) {
      const timer = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
      }, 4500); // Her metin 4.5 saniye ekranda kalır
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(finishTimer);
    }
  },[textIndex, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#050B14] via-[#0A192F] to-[#02060D] overflow-hidden flex items-center justify-center"
    >
      {/* Göl Yansıması (Lake Reflection) */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent blur-md transform scale-y-[-1]" />
      <div className="absolute bottom-0 w-full h-1/4 bg-blue-500/5 blur-[80px]" />

      {/* Düşen Sakuralar (Framer Motion) */}
      {sakuras.map((sakura) => (
        <motion.div
          key={sakura.id}
          className="absolute top-[-5%] bg-pink-300/60 rounded-full blur-[1px]"
          style={{
            left: sakura.left,
            width: sakura.size,
            height: sakura.size * 0.6,
            borderRadius: "50% 0 50% 0", // Taç yaprağı şekli
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: sakura.xDrift, // Önceden hesaplanmış sapma değerleri
            rotate:[0, 180, 360],
          }}
          transition={{
            duration: sakura.duration,
            repeat: Infinity,
            delay: sakura.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Şiirsel Metinler */}
      <div className="z-10 text-center px-4">
        <AnimatePresence mode="wait">
          {textIndex < HEIAN_TEXTS.length && (
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wider text-pink-50 text-shadow-lg font-serif italic"
              style={{ textShadow: "0 0 20px rgba(255, 182, 193, 0.5)" }}
            >
              {HEIAN_TEXTS[textIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}