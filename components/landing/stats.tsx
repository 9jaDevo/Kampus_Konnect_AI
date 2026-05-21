"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";

const STATS = [
  { value: 500, suffix: "+", label: "Students matched" },
  { value: 12, suffix: "+", label: "Schools represented" },
  { value: 50, suffix: "+", label: "Teams formed" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average rating" },
] as const;

export function Stats() {
  return (
    <section className="relative py-16">
      <div className="container">
        <div className="relative rounded-3xl glass overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
          <StaggerContainer className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-12">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} className="text-center space-y-2">
                <div className="font-display font-bold text-4xl sm:text-5xl text-gradient">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-slate-400">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
