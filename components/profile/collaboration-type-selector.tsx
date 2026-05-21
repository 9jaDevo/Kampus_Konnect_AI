"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  BookOpen,
  Rocket,
  GraduationCap,
  Sparkles,
  Repeat,
  Target,
  type LucideIcon,
} from "lucide-react";
import { COLLABORATION_TYPES } from "@/constants/collaboration-types";
import type { CollaborationType } from "@/types/profile";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Trophy,
  BookOpen,
  Rocket,
  GraduationCap,
  Sparkles,
  Repeat,
  Target,
};

interface CollaborationTypeSelectorProps {
  selected: CollaborationType[];
  onToggle: (value: CollaborationType) => void;
}

export function CollaborationTypeSelector({
  selected,
  onToggle,
}: CollaborationTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {COLLABORATION_TYPES.map((type) => {
        const Icon = ICON_MAP[type.icon] ?? Trophy;
        const isOn = selected.includes(type.value);
        return (
          <motion.button
            key={type.value}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(type.value)}
            className={cn(
              "text-left p-4 rounded-2xl border transition-all flex items-start gap-3",
              isOn
                ? "bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border-cyan-400/40"
                : "glass-subtle border-white/10 hover:border-white/20"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                isOn
                  ? "bg-gradient-to-br from-cyan-500/30 to-violet-500/30 text-white"
                  : "bg-white/[0.04] text-slate-400"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-semibold text-sm text-white">
                {type.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{type.description}</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
