"use client";

import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import DraggableBase from "./DraggableBase";
import DroppableSlot from "./DroppableSlot";
import { STANDARD_PAIRS, STORY_TEXTS } from "../lib/constants";
import { DNABaseType } from "../lib/types";

interface DragDropBoardProps {
  onComplete: () => void;
}

interface SlotData {
  id: string;
  templateBase: DNABaseType;
  droppedBase: DNABaseType | null;
}

export default function DragDropBoard({ onComplete }: DragDropBoardProps) {
  // Tutorial için hedef zincir: A - T - G - C
  const [slots, setSlots] = useState<SlotData[]>([
    { id: "slot-1", templateBase: "A", droppedBase: null },
    { id: "slot-2", templateBase: "T", droppedBase: null },
    { id: "slot-3", templateBase: "G", droppedBase: null },
    { id: "slot-4", templateBase: "C", droppedBase: null },
  ]);

  // Kullanıcının envanterindeki bazlar (Karışık sıra)
  const [inventory, setInventory] = useState<{ id: string; type: DNABaseType }[]>([
    { id: "inv-1", type: "C" },
    { id: "inv-2", type: "A" },
    { id: "inv-3", type: "G" },
    { id: "inv-4", type: "T" },
  ]);

  const [isCompleted, setIsCompleted] = useState(false);

  // Mobil cihazlarda dokunmatik hassasiyeti için sensörler
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const playDingSound = () => {
    const audio = new Audio("/assets/sfx/ding.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => console.warn("Ses çalınamadı"));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type as DNABaseType;
    const templateBase = over.data.current?.templateBase as DNABaseType;
    const slotId = over.id as string;

    // Doğru eşleşme kontrolü (Örn: template A ise, active T olmalı)
    if (STANDARD_PAIRS[templateBase] === activeType) {
      // Sesi çal
      playDingSound();

      // Yuvayı güncelle
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { ...slot, droppedBase: activeType } : slot
        )
      );

      // Envanterden düş
      setInventory((prev) => prev.filter((item) => item.id !== active.id));
    }
  };

  // Tüm yuvalar dolduğunda oyunu bitir
  useEffect(() => {
    if (slots.every((slot) => slot.droppedBase !== null) && !isCompleted) {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 3000); // 3 saniye mesajı gösterip diğer faza geç
    }
  }, [slots, isCompleted, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-2xl text-neon-blue font-bold tracking-widest">Aşama 1: DNA Transkripsiyonu</h2>
        <p className="text-gray-300 text-sm md:text-base">
          {STORY_TEXTS.welcome} Alt kısımdaki bazları doğru eşleşecekleri yuvalara sürükle (A-T, G-C).
        </p>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* Hedef Yuvalar */}
        <div className="flex gap-4 md:gap-8">
          {slots.map((slot) => (
            <DroppableSlot
              key={slot.id}
              id={slot.id}
              templateBase={slot.templateBase}
              droppedBase={slot.droppedBase}
            />
          ))}
        </div>

        {/* Envanter (Sürüklenebilir Öğeler) */}
        <div className="flex gap-4 p-6 bg-lab-dark border border-lab-border rounded-2xl shadow-xl min-h-[100px] w-full justify-center">
          {inventory.map((item) => (
            <DraggableBase key={item.id} id={item.id} type={item.type} />
          ))}
          {inventory.length === 0 && !isCompleted && (
            <span className="text-gray-500 italic">Eşleşecek baz kalmadı.</span>
          )}
        </div>
      </DndContext>

      {/* Başarı Mesajı */}
      {isCompleted && (
        <div className="animate-pulse-slow text-center p-4 bg-lab-card border border-neon-green rounded-xl shadow-glow-green">
          <p className="text-neon-green font-semibold">
            {STORY_TEXTS.tutorialComplete}
          </p>
        </div>
      )}
    </div>
  );
}