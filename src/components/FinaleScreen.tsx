"use client";

import { motion } from "framer-motion";
import FlightTicket from "./FlightTicket";

export default function FinaleScreen() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden bg-[#0B090A]">
      {/* Arka Plan Glow Efekti (Amber/Altın Sarısı) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity:[0, 0.8, 0.5, 0.8], 
          scale:[0.5, 1.5, 1.2, 1.5] 
        }}
        transition={{ duration: 4, times:[0, 0.4, 0.8, 1], ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-romantic-amber rounded-full blur-[120px] md:blur-[150px] z-0"
      />

      {/* Yukarıdan süzülen altın tozları */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 bg-yellow-200 rounded-full z-0 shadow-[0_0_5px_#FFBF00]"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000) - 500,
            y: -100,
            opacity: 0
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
            opacity: [0, 1, 0],
            x: `+=${Math.random() * 100 - 50}` // Hafif sağa sola salınım
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear"
          }}
        />
      ))}

      {/* Bilet ve Mesaj Konteyneri */}
      <div className="z-10 flex flex-col items-center space-y-10 md:space-y-16 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-4xl font-serif text-white tracking-widest mb-4 drop-shadow-md">
            All roads lead to us, Amore Mio.
          </h1>
        </motion.div>

        {/* Uçak Bileti Bileşeni */}
        <FlightTicket />

      </div>
    </div>
  );
}