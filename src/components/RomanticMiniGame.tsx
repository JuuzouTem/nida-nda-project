"use client";

import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import DraggableBase from "./DraggableBase";
import DroppableSlot from "./DroppableSlot";
import { MUTATED_PAIRS } from "../lib/constants";

interface RomanticMiniGameProps {
  onComplete: () => void;
}

export default function RomanticMiniGame({ onComplete }: RomanticMiniGameProps) {
  // Hedef zincir: N - İ - D - A
  const[slots, setSlots] = useState([
    { id: "mut-slot-1", templateBase: "N", droppedBase: null as string | null },
    { id: "mut-slot-2", templateBase: "İ", droppedBase: null as string | null },
    { id: "mut-slot-3", templateBase: "D", droppedBase: null as string | null },
    { id: "mut-slot-4", templateBase: "A", droppedBase: null as string | null },
  ]);

  // Kullanıcının envanterindeki bazlar (Karışık B-E-H-L)
  const [inventory, setInventory] = useState([
    { id: "mut-inv-1", type: "H" },
    { id: "mut-inv-2", type: "B" },
    { id: "mut-inv-3", type: "L" },
    { id: "mut-inv-4", type: "E" },
  ]);

  const [isCompleted, setIsCompleted] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const playDingSound = () => {
    const audio = new Audio("/assets/sfx/ding.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {});
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type as string;
    const templateBase = over.data.current?.templateBase as string;
    const slotId = over.id as string;

    // Mutasyon eşleşme kontrolü (Örn: template N ise, active B olmalı)
    if (MUTATED_PAIRS[templateBase] === activeType) {
      playDingSound();

      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { ...slot, droppedBase: activeType } : slot
        )
      );
      setInventory((prev) => prev.filter((item) => item.id !== active.id));
    }
  };

  useEffect(() => {
    if (slots.every((slot) => slot.droppedBase !== null) && !isCompleted) {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000); // 2 saniye sonra finale geçiş
    }
  },[slots, isCompleted, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl text-romantic-amber font-bold tracking-widest drop-shadow-[0_0_10px_rgba(255,191,0,0.5)]">
          Son Faz: Yeniden Bağlanma
        </h2>
        <p className="text-gray-300">
          Yeni kurallara göre RNA sentezini tamamla.
        </p>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* Hedef Yuvalar */}
        <div className="flex gap-4 md:gap-8">
          {slots.map((slot) => (
            <DroppableSlot
              key={slot.id}
              id={slot.id}
              templateBase={slot.templateBase as any}
              droppedBase={slot.droppedBase as any}
            />
          ))}
        </div>

        {/* Envanter */}
        <div className="flex gap-4 p-6 bg-lab-dark/50 border border-romantic-amber rounded-2xl shadow-glow-amber min-h-[100px] w-full justify-center">
          {inventory.map((item) => (
            <DraggableBase key={item.id} id={item.id} type={item.type as any} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}