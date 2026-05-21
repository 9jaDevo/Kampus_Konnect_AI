"use client";

import {
  Sparkles,
  Users,
  Brain,
  MessageSquare,
  Target,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";
import { ScoreRing } from "@/components/ui/score-ring";
import { Tag } from "@/components/ui/tag";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="container space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Tag variant="violet">Features</Tag>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            AI that helps you{" "}
            <GradientText>start building</GradientText>, not just connect
          </h2>
          <p className="text-slate-400 text-lg">
            Six product moments where Gemini AI removes friction from student
            collaboration.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
          {/* Large feature — Match Explanation */}
          <StaggerItem className="md:col-span-2 md:row-span-2">
            <GlassCard className="h-full p-8 flex flex-col gap-6 group hover:border-white/15 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-11 w-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">
                    AI Match Explanation
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md">
                    Every match comes with a Gemini-generated explanation of why
                    you'd work well together — shared interests, complementary
                    skills, and a suggested collaboration type.
                  </p>
                </div>
                <ScoreRing score={94} size={84} strokeWidth={7} label="match" />
              </div>
              <div className="mt-auto p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "Strong match — her design skills complement your frontend
                  work, and both of you target education-tech projects on
                  weekends."
                </p>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Team Builder */}
          <StaggerItem>
            <GlassCard className="h-full p-6 flex flex-col gap-4 group hover:border-white/15 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  Team Builder
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Form teams around a project idea. Invite matches by required
                  role.
                </p>
              </div>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex -space-x-3 mt-auto"
              >
                {["AB", "DO", "ZM", "EN"].map((init, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border-2 border-[#07071a] flex items-center justify-center text-xs text-white font-medium"
                  >
                    {init}
                  </div>
                ))}
                <div className="h-9 w-9 rounded-full bg-white/[0.05] border-2 border-[#07071a] flex items-center justify-center text-xs text-slate-400">
                  +2
                </div>
              </motion.div>
            </GlassCard>
          </StaggerItem>

          {/* Project Ideas */}
          <StaggerItem>
            <GlassCard className="h-full p-6 flex flex-col gap-4 group hover:border-white/15 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center">
                <Brain className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  Project Ideas
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Stuck for ideas? Gemini suggests 5 buildable projects based
                  on your interests.
                </p>
              </div>
              <div className="mt-auto space-y-1.5">
                {["Scholarship Tracker", "AI Study Groups", "Campus Lost & Found"].map(
                  (idea) => (
                    <div
                      key={idea}
                      className="text-xs px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300"
                    >
                      {idea}
                    </div>
                  )
                )}
              </div>
            </GlassCard>
          </StaggerItem>

          {/* First Message */}
          <StaggerItem>
            <GlassCard className="h-full p-6 flex flex-col gap-4 group hover:border-white/15 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  First Message AI
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Never type "hi" again. Gemini drafts a warm, specific opener
                  referencing their profile.
                </p>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Collaboration Plan */}
          <StaggerItem>
            <GlassCard className="h-full p-6 flex flex-col gap-4 group hover:border-white/15 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center">
                <Target className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  Collaboration Plan
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Roles, tasks, timeline, demo plan, pitch — generated in
                  seconds.
                </p>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Pitch Script */}
          <StaggerItem>
            <GlassCard className="h-full p-6 flex flex-col gap-4 group hover:border-white/15 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center">
                <Mic className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">
                  Pitch Script
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Demo-day ready: hook, problem, solution, impact — all
                  scripted.
                </p>
              </div>
            </GlassCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
