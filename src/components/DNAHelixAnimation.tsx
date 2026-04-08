"use client";

import { motion } from "framer-motion";

export default function DNAHelixAnimation() {
  const rungs = 12; // DNA basamak sayısı

  return (
    <div className="absolute left-2 md:left-10 top-0 bottom-0 flex flex-col justify-center gap-6 md:gap-8 opacity-30 pointer-events-none z-0">
      {[...Array(rungs)].map((_, i) => (
        <div key={i} className="relative w-16 md:w-24 h-1 flex items-center justify-between">
          {/* Sol Sarmal Topu (Mavi) */}
          <motion.div
            animate={{ 
              x:[0, typeof window !== 'undefined' && window.innerWidth < 768 ? 64 : 96, 0], 
              scale:[1, 0.5, 1], 
              zIndex: [10, 0, 10] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            className="absolute left-0 w-3 h-3 md:w-4 md:h-4 bg-neon-blue rounded-full shadow-glow-blue"
          />
          
          {/* Kovalent Bağ Çizgisi */}
          <div className="w-full h-[2px] bg-lab-border opacity-50" />
          
          {/* Sağ Sarmal Topu (Yeşil) */}
          <motion.div
            animate={{ 
              x:[0, typeof window !== 'undefined' && window.innerWidth < 768 ? -64 : -96, 0], 
              scale:[0.5, 1, 0.5], 
              zIndex:[0, 10, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            className="absolute right-0 w-3 h-3 md:w-4 md:h-4 bg-neon-green rounded-full shadow-glow-green"
          />
        </div>
      ))}
    </div>
  );
}