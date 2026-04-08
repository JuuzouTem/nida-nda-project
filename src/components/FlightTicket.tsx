"use client";

import { motion } from "framer-motion";

export default function FlightTicket() {
  return (
    <motion.div 
      initial={{ scale: 0.8, rotateX: 90, opacity: 0 }}
      animate={{ scale: 1, rotateX: 0, opacity: 1 }}
      transition={{ duration: 1.5, type: "spring", bounce: 0.4, delay: 1 }}
      className="relative flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,191,0,0.4)] text-gray-800"
    >
      {/* Sol Kısım: Ana Bilet Detayları */}
      <div className="flex-1 p-6 md:p-8 relative">
        {/* Arka Plan Filigranı */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-8xl font-serif font-bold rotate-[-15deg]">INFINITY</span>
        </div>

        {/* Başlık ve Havayolu */}
        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4 mb-6">
          <h2 className="text-2xl font-black tracking-widest text-gray-900">ETERNITY AIRWAYS</h2>
          <span className="text-sm font-bold bg-romantic-amber text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            First Class
          </span>
        </div>

        {/* Yolcu ve Uçuş Bilgileri */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Passenger / Passager</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 uppercase">Nida & Behlül</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date / Date</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 uppercase">Infınıty</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">From / De</p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">PDV <span className="text-sm font-normal text-gray-500">Padova</span></p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">To / À</p>
            <p className="text-3xl md:text-4xl font-black text-gray-900">ZRH <span className="text-sm font-normal text-gray-500">Zurich</span></p>
          </div>
        </div>

        {/* Kapı, Koltuk, Uçuş Kodu */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl border border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Flight</p>
            <p className="text-lg font-bold font-mono">NB-2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gate</p>
            <p className="text-lg font-bold font-mono">28</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seat</p>
            <p className="text-lg font-bold font-mono">1A - 1B</p>
          </div>
        </div>
      </div>

      {/* Kesik Çizgili Ayıraç */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-8 border-l-2 border-dashed border-gray-400 bg-gray-50">
        <div className="absolute top-[-12px] -left-[13px] w-6 h-6 bg-[#0B090A] rounded-full"></div>
        <div className="absolute bottom-[-12px] -left-[13px] w-6 h-6 bg-[#0B090A] rounded-full"></div>
      </div>

      {/* Sağ Kısım: Koparılabilir Bilet Tarafı ve Barkod */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 md:p-8 flex flex-col justify-between border-t-2 md:border-t-0 border-dashed border-gray-400">
        <div>
          <h3 className="text-lg font-black tracking-widest text-gray-900 mb-4 text-center md:text-left">BOARDING PASS</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Passenger</p>
              <p className="text-sm font-bold text-gray-900">NIDA & BEHLUL</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">From</p>
                <p className="text-lg font-bold text-gray-900">PDV</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">To</p>
                <p className="text-lg font-bold text-gray-900">ZRH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          {/* Sahte Barkod (CSS ile yapılmış) */}
          <div className="w-full h-12 flex justify-between items-end opacity-80">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-900" 
                style={{ 
                  width: `${Math.random() * 4 + 1}px`, 
                  height: `${Math.random() * 20 + 60}%` 
                }} 
              />
            ))}
          </div>
          <p className="mt-2 text-xs font-mono text-gray-500 tracking-[0.2em]">28032026-NIDA-BEHLUL</p>
        </div>
      </div>
    </motion.div>
  );
}