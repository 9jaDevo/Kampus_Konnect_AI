"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  steps: string[];
  current: number;
}

export function OnboardingProgress({ steps, current }: OnboardingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.05 : 1,
                }}
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center text-xs font-display font-bold border transition-colors",
                  done && "bg-gradient-to-br from-cyan-500 to-violet-500 text-white border-transparent",
                  active && "glass-strong border-cyan-400/50 text-white glow-cyan",
                  !done && !active && "glass-subtle border-white/10 text-slate-500"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-white/5 relative overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-xs text-slate-400">
        Step {current + 1} of {steps.length} — <span className="text-white">{steps[current]}</span>
      </div>
    </div>
  );
}
