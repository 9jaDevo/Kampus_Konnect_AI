"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Loader2, Mic, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { Tag } from "@/components/ui/tag";
import { Input, Textarea, Label } from "@/components/ui/input";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { TagPicker } from "@/components/profile/tag-picker";
import { INTERESTS } from "@/constants/interests";
import type { SkillLevel } from "@/types/profile";

const LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced"];

export default function PlannerPage() {
  // Project ideas state
  const [interests, setInterests] = useState<string[]>(["Education", "AI Tools"]);
  const [goals, setGoals] = useState("Win a hackathon, build a portfolio project");
  const [level, setLevel] = useState<SkillLevel>("intermediate");
  const [ideas, setIdeas] = useState<string | null>(null);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  // Pitch state
  const [projectTitle, setProjectTitle] = useState("Kampus Konnect AI");
  const [projectDescription, setProjectDescription] = useState(
    "AI-powered platform that matches students with collaborators and generates plans to ship projects together."
  );
  const [pitch, setPitch] = useState<string | null>(null);
  const [loadingPitch, setLoadingPitch] = useState(false);

  async function generateIdeas() {
    setLoadingIdeas(true);
    try {
      const res = await fetch("/api/ai/project-ideas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          interests,
          goals: goals.split(",").map((g) => g.trim()).filter(Boolean),
          skillLevel: level,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setIdeas(data.output);
    } catch {
      toast.error("Couldn't generate ideas");
    } finally {
      setLoadingIdeas(false);
    }
  }

  async function generatePitch() {
    setLoadingPitch(true);
    try {
      const res = await fetch("/api/ai/pitch-script", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectTitle, projectDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setPitch(data.output);
    } catch {
      toast.error("Couldn't generate pitch");
    } finally {
      setLoadingPitch(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen relative">
        <AuroraBackground intensity="subtle" />
        <div className="container relative z-10 flex gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-3">
              <Tag variant="violet">
                <Brain className="h-3 w-3" /> AI Planner
              </Tag>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                <GradientText>Idea to demo</GradientText> with AI
              </h1>
              <p className="text-slate-400">
                Generate buildable project ideas and a demo-day pitch script.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Project Ideas */}
              <GlassCard className="p-6 space-y-4">
                <h2 className="font-display font-semibold text-xl text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  Project ideas
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Pick interests</Label>
                    <TagPicker
                      options={INTERESTS}
                      selected={interests}
                      onToggle={(v) =>
                        setInterests((curr) =>
                          curr.includes(v) ? curr.filter((x) => x !== v) : [...curr, v]
                        )
                      }
                      max={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">Goals</Label>
                    <Input
                      id="goals"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      placeholder="Comma-separated"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Skill level</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLevel(l)}
                          className={
                            "py-2 rounded-xl border text-xs capitalize transition-all " +
                            (level === l
                              ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border-cyan-400/40 text-white"
                              : "glass-subtle border-white/10 text-slate-300")
                          }
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <GlowButton variant="primary" onClick={generateIdeas} disabled={loadingIdeas}>
                    {loadingIdeas ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    {loadingIdeas ? "Thinking…" : "Generate 5 ideas"}
                  </GlowButton>
                </div>

                {ideas && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] relative"
                  >
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(ideas);
                        toast.success("Copied!");
                      }}
                      className="absolute top-3 right-3 text-slate-400 hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-6">
                      <TypewriterText text={ideas} speed={2} />
                    </div>
                  </motion.div>
                )}
              </GlassCard>

              {/* Pitch */}
              <GlassCard className="p-6 space-y-4">
                <h2 className="font-display font-semibold text-xl text-white flex items-center gap-2">
                  <Mic className="h-4 w-4 text-violet-400" />
                  Pitch script
                </h2>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="ptitle">Project title</Label>
                    <Input
                      id="ptitle"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pdesc">Project description</Label>
                    <Textarea
                      id="pdesc"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <GlowButton variant="primary" onClick={generatePitch} disabled={loadingPitch}>
                    {loadingPitch ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    {loadingPitch ? "Writing…" : "Generate pitch"}
                  </GlowButton>
                </div>

                {pitch && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] relative"
                  >
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pitch);
                        toast.success("Copied!");
                      }}
                      className="absolute top-3 right-3 text-slate-400 hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-6">
                      <TypewriterText text={pitch} speed={2} />
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
