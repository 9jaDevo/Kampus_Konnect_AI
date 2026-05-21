"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Brain,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Tag } from "@/components/ui/tag";
import { ScoreRing } from "@/components/ui/score-ring";
import { Avatar } from "@/components/ui/avatar";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import type { Match } from "@/types/match";
import type { StudentProfile } from "@/types/profile";

type FullMatch = Match & { matchedProfile: StudentProfile };

const NEXT_STEPS = [
  { label: "Complete your profile", done: true, href: "/onboarding" },
  { label: "Review your AI matches", done: false, href: "/matches" },
  { label: "Send a first message", done: false, href: "/matches" },
  { label: "Form your first team", done: false, href: "/teams" },
];

export default function DashboardPage() {
  const [matches, setMatches] = useState<FullMatch[] | null>(null);

  useEffect(() => {
    fetch("/api/matches")
      .then((r) => r.json())
      .then((d) => setMatches(d.matches?.slice(0, 3) ?? []))
      .catch(() => setMatches([]));
  }, []);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen relative">
        <AuroraBackground intensity="subtle" />
        <div className="container relative z-10 flex gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  Welcome back, <GradientText>Aisha</GradientText>
                </h1>
                <p className="text-slate-400 mt-1">
                  Here's your collaboration snapshot.
                </p>
              </div>
              <Link href="/planner">
                <GlowButton variant="primary">
                  <Brain className="h-4 w-4" /> AI Planner
                </GlowButton>
              </Link>
            </div>

            {/* Stats bento */}
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Matches", value: 12, Icon: Sparkles, color: "cyan" },
                { label: "Teams", value: 2, Icon: Users, color: "indigo" },
                { label: "Top score", value: 94, suffix: "%", Icon: CheckCircle2, color: "violet" },
                { label: "Ideas saved", value: 8, Icon: Brain, color: "cyan" },
              ].map((s) => (
                <StaggerItem key={s.label}>
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <s.Icon className="h-4 w-4 text-cyan-400" />
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">
                        {s.label}
                      </span>
                    </div>
                    <div className="font-display font-bold text-3xl text-white">
                      <AnimatedCounter end={s.value} suffix={s.suffix ?? ""} />
                    </div>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Match preview */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold text-lg text-white">
                    Top matches
                  </h2>
                  <Link href="/matches" className="text-xs text-cyan-300 hover:text-cyan-200">
                    See all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matches?.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <GlassCard className="p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <Avatar name={m.matchedProfile.fullName} size={36} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                              {m.matchedProfile.fullName}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {m.matchedProfile.school}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <ScoreRing score={m.compatibilityScore} size={48} strokeWidth={5} />
                          <Tag variant="cyan">{m.matchedProfile.skillLevel}</Tag>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next steps */}
              <GlassCard className="p-5 space-y-4 h-fit">
                <h2 className="font-display font-semibold text-lg text-white">
                  Next steps
                </h2>
                <ul className="space-y-2">
                  {NEXT_STEPS.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                      >
                        {s.done ? (
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-500 shrink-0" />
                        )}
                        <span
                          className={
                            s.done
                              ? "text-sm text-slate-500 line-through"
                              : "text-sm text-slate-200 group-hover:text-white"
                          }
                        >
                          {s.label}
                        </span>
                        <ArrowRight className="h-3 w-3 text-slate-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
