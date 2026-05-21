"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagPickerProps {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  max?: number;
}

export function TagPicker({ options, selected, onToggle, max }: TagPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isOn = selected.includes(option);
        const disabled = !isOn && max !== undefined && selected.length >= max;
        return (
          <motion.button
            key={option}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => !disabled && onToggle(option)}
            disabled={disabled}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all",
              isOn
                ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/40 text-white"
                : "glass-subtle border-white/10 text-slate-300 hover:border-white/20",
              disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}
