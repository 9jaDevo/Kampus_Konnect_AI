"use client";

import Link from "next/link";
import { Github, Linkedin, Globe, Edit3 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import { SAMPLE_PROFILES } from "@/constants/sample-profiles";

export default function ProfilePage() {
  const me = SAMPLE_PROFILES[0];

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen relative">
        <AuroraBackground intensity="subtle" />
        <div className="container relative z-10 flex gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-6">
            <GlassCard className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row items-start gap-6">
                <Avatar name={me.fullName} size={96} />
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="font-display font-bold text-3xl text-white">
                      {me.fullName}
                    </h1>
                    <p className="text-slate-400">
                      {me.school} · {me.courseOfStudy}
                    </p>
                  </div>
                  {me.bio && <p className="text-slate-300 max-w-2xl">{me.bio}</p>}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Tag variant="cyan">{me.skillLevel}</Tag>
                    {me.communicationPreference && (
                      <Tag variant="muted">prefers {me.communicationPreference}</Tag>
                    )}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {me.githubUrl && (
                      <a href={me.githubUrl} className="h-9 w-9 rounded-lg glass-subtle border border-white/10 inline-flex items-center justify-center text-slate-300 hover:text-white" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {me.linkedinUrl && (
                      <a href={me.linkedinUrl} className="h-9 w-9 rounded-lg glass-subtle border border-white/10 inline-flex items-center justify-center text-slate-300 hover:text-white" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {me.portfolioUrl && (
                      <a href={me.portfolioUrl} className="h-9 w-9 rounded-lg glass-subtle border border-white/10 inline-flex items-center justify-center text-slate-300 hover:text-white" aria-label="Portfolio">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <Link href="/profile/edit">
                  <GlowButton variant="outline" size="sm">
                    <Edit3 className="h-3.5 w-3.5" /> Edit profile
                  </GlowButton>
                </Link>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <GlassCard className="p-6 space-y-3">
                <h2 className="font-display font-semibold text-lg text-white">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {me.skills.map((s) => (
                    <Tag key={s} variant="violet">{s}</Tag>
                  ))}
                </div>
              </GlassCard>
              <GlassCard className="p-6 space-y-3">
                <h2 className="font-display font-semibold text-lg text-white">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {me.interests.map((s) => (
                    <Tag key={s} variant="indigo">{s}</Tag>
                  ))}
                </div>
              </GlassCard>
              <GlassCard className="p-6 space-y-3 lg:col-span-2">
                <h2 className="font-display font-semibold text-lg text-white">
                  <GradientText>Goals</GradientText>
                </h2>
                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                  {me.goals.map((g) => (
                    <li key={g}>{g}</li>
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
