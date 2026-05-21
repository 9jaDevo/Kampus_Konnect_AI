"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AvatarStack } from "@/components/ui/avatar";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScoreRing } from "@/components/ui/score-ring";
import { Tag } from "@/components/ui/tag";
import { fadeIn, slideUp, staggerContainer, staggerItem } from "@/lib/design/tokens";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <AuroraBackground intensity="normal" />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={staggerItem}>
              <Tag variant="cyan" className="glow-cyan">
                <Sparkles className="h-3 w-3" /> Powered by Gemini AI
              </Tag>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white"
            >
              Find your perfect{" "}
              <GradientText animated>student team</GradientText>{" "}
              with AI
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Kampus Konnect AI matches you with teammates, mentors, study partners,
              and project collaborators based on skills, goals, and availability —
              then helps you start building together.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Link href="/auth/signup">
                <GlowButton variant="primary" size="lg">
                  Start matching free
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Link>
              <Link href="/matches">
                <GlowButton variant="outline" size="lg">
                  <Zap className="h-4 w-4" />
                  See live demo
                </GlowButton>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-4 pt-4"
            >
              <AvatarStack
                names={["Aisha Bello", "David Okafor", "Zainab Musa", "Emeka Nwosu", "Chiamaka Eze"]}
                size={36}
                max={4}
              />
              <div className="text-sm">
                <div className="font-semibold text-white">
                  <AnimatedCounter end={500} duration={2.2} />+
                  <span className="text-slate-400 font-normal"> students</span>
                </div>
                <div className="text-xs text-slate-500">already finding their team</div>
              </div>
            </motion.div>
          </div>

          {/* Floating preview card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <HeroPreview />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs flex flex-col items-center gap-2"
      >
        <span className="uppercase tracking-widest">Scroll to explore</span>
        <div className="h-8 w-px bg-gradient-to-b from-indigo-400 to-transparent" />
      </motion.div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative perspective-1000">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong rounded-3xl p-6 relative"
        style={{ transform: "rotateY(-6deg) rotateX(4deg)" }}
      >
        <div className="absolute -top-3 -right-3 z-10">
          <Tag variant="cyan" className="glow-cyan">
            <Sparkles className="h-3 w-3" /> 94% match
          </Tag>
        </div>

        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border border-white/10 flex items-center justify-center text-white font-display font-bold text-lg">
            AB
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-white">Aisha Bello</div>
            <div className="text-xs text-slate-400">University of Abuja · Designer</div>
          </div>
          <ScoreRing score={94} size={64} strokeWidth={6} />
        </div>

        <div className="mt-5 space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-500">Shared interests</div>
          <div className="flex flex-wrap gap-2">
            <Tag variant="indigo">Education</Tag>
            <Tag variant="indigo">Productivity</Tag>
            <Tag variant="indigo">Social Impact</Tag>
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-500 pt-2">Complementary skills</div>
          <div className="flex flex-wrap gap-2">
            <Tag variant="violet">UI/UX Design</Tag>
            <Tag variant="violet">Research</Tag>
            <Tag variant="violet">Pitching</Tag>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-widest text-cyan-300 font-medium">
              Gemini explains
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Strong match — her design skills complement your frontend work, and both
            of you target education-tech projects on weekends.
          </p>
        </div>
      </motion.div>

      {/* Decorative floating mini-cards */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-4 -bottom-6 glass rounded-2xl p-3 hidden sm:flex items-center gap-2"
      >
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-slate-300">3 new matches today</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-4 top-8 glass rounded-2xl p-3 hidden sm:flex items-center gap-2"
      >
        <Sparkles className="h-3 w-3 text-violet-400" />
        <span className="text-xs text-slate-300">AI plan ready</span>
      </motion.div>
    </div>
  );
}
