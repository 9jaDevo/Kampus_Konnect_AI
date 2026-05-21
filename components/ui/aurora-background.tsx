"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "normal" | "intense";
}

export function AuroraBackground({
  className,
  intensity = "normal",
}: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: { a: 0.15, b: 0.12, c: 0.1 },
    normal: { a: 0.3, b: 0.25, c: 0.22 },
    intense: { a: 0.45, b: 0.4, c: 0.35 },
  } as const;
  const op = opacityMap[intensity];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden -z-10",
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-[60vw] w-[60vw] rounded-full blur-[120px]"
        style={{ background: "#06CFFF", opacity: op.a }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-[-15%] h-[55vw] w-[55vw] rounded-full blur-[140px]"
        style={{ background: "#8B5CF6", opacity: op.b }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-1/4 h-[50vw] w-[50vw] rounded-full blur-[120px]"
        style={{ background: "#6366F1", opacity: op.c }}
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
