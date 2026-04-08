"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_TEXTS } from "../lib/constants";

interface StoryTransitionProps {
  onComplete: () => void;
}

export default function StoryTransition({ onComplete }: StoryTransitionProps) {
  const [step, setStep] = useState(0);

  // Adımları otomatik ilerletmek için (veya kullanıcı tıklamasıyla)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 0) timer = setTimeout(() => setStep(1), 4000); // Anomali mesajı süresi
    if (step === 1) timer = setTimeout(() => setStep(2), 5000); // Tarih ve hikaye metni
    if (step === 2) timer = setTimeout(() => setStep(3), 6000); // Harf dönüşümü animasyonu
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4 text-center h-[60vh]">
      <AnimatePresence mode="wait">
        {/* ADIM 0: ANOMALİ UYARISI */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2 
              animate={{ color: ["#39FF14", "#FF0000", "#39FF14"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl md:text-5xl font-bold tracking-widest"
            >
              SİSTEM ANOMALİSİ TESPİT EDİLDİ
            </motion.h2>
            <p className="text-xl text-gray-300">Standart DNA yapısı çözülüyor...</p>
          </motion.div>
        )}

        {/* ADIM 1: TARİH VE HİKAYE */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl text-neon-blue font-bold tracking-wider">
              {STORY_TEXTS.mutationDate}
            </h2>
            <p className="text-xl text-gray-400">
              Kovalent bağlardan daha güçlü bir çekim kuvveti gözlemleniyor.
            </p>
          </motion.div>
        )}

        {/* ADIM 2: HARF DÖNÜŞÜMÜ (MUTASYON) */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center space-y-12"
          >
            <h3 className="text-2xl text-romantic-amber font-semibold">
              Eski Kurallar Siliniyor...
            </h3>
            <div className="flex gap-8 md:gap-12 text-5xl md:text-7xl font-bold">
              {/* Harflerin A -> N, vb. dönüşümü */}
              {[
                { old: "A", new: "N" },
                { old: "T", new: "İ" },
                { old: "G", new: "D" },
                { old: "C", new: "A" },
              ].map((pair, index) => (
                <div key={index} className="relative w-16 h-16 flex justify-center items-center">
                  <motion.span
                    initial={{ opacity: 1, rotateX: 0 }}
                    animate={{ opacity: 0, rotateX: 180 }}
                    transition={{ duration: 1, delay: 1 + index * 0.5 }}
                    className="absolute text-gray-600"
                  >
                    {pair.old}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, rotateX: -180, color: "#39FF14" }}
                    animate={{ opacity: 1, rotateX: 0, color: "#FFBF00" }}
                    transition={{ duration: 1, delay: 1 + index * 0.5 }}
                    className="absolute drop-shadow-[0_0_15px_rgba(255,191,0,0.8)]"
                  >
                    {pair.new}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ADIM 3: YENİ KURAL VE DEVAM BUTONU */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="p-8 bg-lab-card/80 border border-romantic-amber rounded-2xl shadow-glow-amber">
              <h2 className="text-2xl md:text-3xl text-white mb-4 font-light">
                Yeni Mutasyon Kuralı:
              </h2>
              <p className="text-3xl md:text-4xl text-romantic-amber font-bold tracking-widest">
                'N' HER ZAMAN 'B' İLE EŞLEŞİR.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-8 px-8 py-4 bg-transparent border-2 border-romantic-amber text-romantic-amber rounded-full font-bold text-lg hover:bg-romantic-amber hover:text-lab-dark transition-colors duration-300 shadow-glow-amber"
            >
              Yeni Kurallarla Senteze Başla
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}