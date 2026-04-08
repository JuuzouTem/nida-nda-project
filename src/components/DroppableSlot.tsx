"use client";

import { useDroppable } from "@dnd-kit/core";
import { DNABaseType } from "../lib/types";

interface DroppableSlotProps {
  id: string;
  templateBase: DNABaseType;
  droppedBase: DNABaseType | null;
}

export default function DroppableSlot({ id, templateBase, droppedBase }: DroppableSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { templateBase },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Şablon Baz (Yukarıdaki sabit DNA zinciri) */}
      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-lab-dark border-2 border-lab-border text-neon-green font-bold text-xl opacity-80">
        {templateBase}
      </div>
      
      {/* Bağlantı çizgisi */}
      <div className="w-1 h-6 bg-lab-border rounded-full" />

      {/* Bırakılacak Yuva */}
      <div
        ref={setNodeRef}
        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 border-dashed transition-all duration-300
          ${droppedBase ? "bg-lab-card border-neon-green shadow-glow-green text-white font-bold text-xl" : 
            isOver ? "border-neon-blue bg-neon-blue/10 scale-110" : "border-lab-border bg-lab-dark/50"
          }
        `}
      >
        {droppedBase ? droppedBase : ""}
      </div>
    </div>
  );
}