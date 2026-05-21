"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Match } from "@/types/match";
import type { StudentProfile } from "@/types/profile";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Avatar } from "@/components/ui/avatar";
import { ScoreRing } from "@/components/ui/score-ring";
import { Tag } from "@/components/ui/tag";
import { TypewriterText } from "@/components/ui/typewriter-text";

interface MatchCardProps {
  match: Match & { matchedProfile: StudentProfile };
  index: number;
}

export function MatchCard({ match, index }: MatchCardProps) {
  const [open, setOpen] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const p = match.matchedProfile;

  async function fetchExplanation() {
    if (explanation || loadingExplain) return;
    setLoadingExplain(true);
    try {
      const res = await fetch("/api/ai/match-explanation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          profileA: minimal(p),
          profileB: minimal(p),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setExplanation(data.output);
    } catch {
      toast.error("Couldn't load AI explanation");
    } finally {
      setLoadingExplain(false);
    }
  }

  async function generateMessage() {
    setLoadingMsg(true);
    try {
      const res = await fetch("/api/ai/first-message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sender: minimal(p),
          receiver: minimal(p),
          collaborationType: match.suggestedCollaborationType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setMessage(data.output);
      toast.success("Message draft ready");
    } catch {
      toast.error("Couldn't generate message");
    } finally {
      setLoadingMsg(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <GlassCard className="p-6 hover:border-white/15 transition-colors">
        <div className="flex items-start gap-5">
          <Avatar name={p.fullName} size={64} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold text-lg text-white truncate">
                  {p.fullName}
                </h3>
                <p className="text-xs text-slate-400">
                  {p.school ?? "Independent"} · {p.skillLevel}
                </p>
                {p.bio && (
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2">{p.bio}</p>
                )}
              </div>
              <ScoreRing score={match.compatibilityScore} size={72} strokeWidth={6} />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="uppercase tracking-wider text-slate-500 mb-1.5">
                  Shared interests
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {match.sharedInterests.length ? (
                    match.sharedInterests.slice(0, 4).map((s) => (
                      <Tag key={s} variant="indigo">{s}</Tag>
                    ))
                  ) : (
                    <span className="text-slate-500">No overlap yet</span>
                  )}
                </div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-slate-500 mb-1.5">
                  Complementary skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {match.complementarySkills.slice(0, 4).map((s) => (
                    <Tag key={s} variant="violet">{s}</Tag>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Tag variant="cyan">
                <Sparkles className="h-3 w-3" /> Suggested: {match.suggestedCollaborationType.replace("-", " ")}
              </Tag>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <GlowButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setOpen((v) => !v);
                  if (!open) fetchExplanation();
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {open ? "Hide AI insight" : "Why we matched"}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
              </GlowButton>
              <GlowButton
                variant="outline"
                size="sm"
                onClick={generateMessage}
                disabled={loadingMsg}
              >
                {loadingMsg ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageSquare className="h-3.5 w-3.5" />}
                Draft first message
              </GlowButton>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 text-cyan-400" />
                      <span className="text-[10px] uppercase tracking-widest text-cyan-300">
                        Gemini explains
                      </span>
                    </div>
                    {loadingExplain && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Thinking…
                      </div>
                    )}
                    {!loadingExplain && explanation && (
                      <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                        <TypewriterText text={explanation} speed={5} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-400/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-3 w-3 text-cyan-400" />
                    <span className="text-[10px] uppercase tracking-widest text-cyan-300">
                      Suggested first message
                    </span>
                  </div>
                  <p className="text-sm text-slate-100 italic">{message}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(message);
                      toast.success("Copied!");
                    }}
                    className="mt-3 text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    Copy to clipboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function minimal(p: StudentProfile) {
  return {
    fullName: p.fullName,
    school: p.school,
    skillLevel: p.skillLevel,
    skills: p.skills,
    interests: p.interests,
    goals: p.goals,
    collaborationTypes: p.collaborationTypes,
    availability: p.availability,
  };
}
