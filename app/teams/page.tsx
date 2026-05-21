"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { Tag } from "@/components/ui/tag";
import { AvatarStack } from "@/components/ui/avatar";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { SkeletonCard } from "@/components/ui/skeleton";
import { SAMPLE_PROFILES } from "@/constants/sample-profiles";
import type { Team } from "@/types/team";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[] | null>(null);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((d) => setTeams(d.teams))
      .catch(() => setTeams([]));
  }, []);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen relative">
        <AuroraBackground intensity="subtle" />
        <div className="container relative z-10 flex gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-3">
              <Tag variant="indigo">
                <Users className="h-3 w-3" /> Teams
              </Tag>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Your <GradientText>teams</GradientText>
              </h1>
              <p className="text-slate-400">
                Form your team, then let AI generate a collaboration plan to ship together.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {!teams &&
                Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)}
              {teams?.map((team, i) => (
                <TeamCard key={team.id} team={team} index={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function TeamCard({ team, index }: { team: Team; index: number }) {
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const members = team.memberIds
    .map((id) => SAMPLE_PROFILES.find((p) => p.id === id))
    .filter(Boolean) as typeof SAMPLE_PROFILES;

  async function generatePlan() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/collaboration-plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          projectTitle: team.projectTitle,
          projectDescription: team.projectDescription,
          members: members.map((m) => ({
            fullName: m.fullName,
            skills: m.skills,
            skillLevel: m.skillLevel,
          })),
          timeline: "3 weeks",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setPlan(data.output);
      toast.success("Plan ready!");
    } catch {
      toast.error("Couldn't generate plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500">
              {team.name}
            </div>
            <h3 className="font-display font-semibold text-xl text-white mt-1">
              {team.projectTitle}
            </h3>
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {team.projectDescription}
            </p>
          </div>
          <Tag variant={team.status === "active" ? "cyan" : team.status === "forming" ? "indigo" : "violet"}>
            {team.status}
          </Tag>
        </div>

        <div className="flex items-center justify-between">
          <AvatarStack names={members.map((m) => m.fullName)} max={4} />
          <span className="text-xs text-slate-500">
            {members.length} member{members.length === 1 ? "" : "s"}
          </span>
        </div>

        {team.requiredRoles.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
              Open roles
            </div>
            <div className="flex flex-wrap gap-1.5">
              {team.requiredRoles.map((r) => (
                <Tag key={r} variant="muted">{r}</Tag>
              ))}
            </div>
          </div>
        )}

        <GlowButton variant="primary" size="sm" onClick={generatePlan} disabled={loading}>
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          {loading ? "Generating…" : plan ? "Regenerate AI plan" : "Generate AI plan"}
        </GlowButton>

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-widest text-cyan-300">
                  Gemini plan
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(plan);
                  toast.success("Copied!");
                }}
                className="text-slate-400 hover:text-white"
                aria-label="Copy"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              <TypewriterText text={plan} speed={3} />
            </div>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
}
