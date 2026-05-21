"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SkeletonCard } from "@/components/ui/skeleton";
import { GradientText } from "@/components/ui/gradient-text";
import { Tag } from "@/components/ui/tag";
import { MatchCard } from "@/components/matches/match-card";
import type { Match } from "@/types/match";
import type { StudentProfile } from "@/types/profile";

type FullMatch = Match & { matchedProfile: StudentProfile };

export default function MatchesPage() {
  const [matches, setMatches] = useState<FullMatch[] | null>(null);

  useEffect(() => {
    fetch("/api/matches")
      .then((r) => r.json())
      .then((d) => setMatches(d.matches))
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
            <div className="space-y-3">
              <Tag variant="cyan">
                <Sparkles className="h-3 w-3" /> AI-powered matching
              </Tag>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Your <GradientText>top matches</GradientText>
              </h1>
              <p className="text-slate-400">
                Ranked by skill complementarity, shared interests, availability,
                and goal alignment.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {!matches &&
                Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              {matches?.map((m, i) => (
                <MatchCard key={m.id} match={m} index={i} />
              ))}
              {matches && matches.length === 0 && (
                <div className="col-span-full text-center text-slate-400 py-12">
                  No matches yet. Complete your profile to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
