"use client";

import { useDraggable } from "@dnd-kit/core";
import { DNABaseType } from "../lib/types";

interface DraggableBaseProps {
  id: string;
  type: DNABaseType;
}

export default function DraggableBase({ id, type }: DraggableBaseProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full text-xl font-bold cursor-grab active:cursor-grabbing border-2 shadow-lg transition-colors
        ${isDragging ? "opacity-50 z-50 scale-110 shadow-glow-blue" : "bg-lab-card border-lab-border text-white hover:border-neon-blue"}
      `}
    >
      {type}
    </div>
  );
}