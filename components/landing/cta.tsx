"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { GradientText } from "@/components/ui/gradient-text";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="relative rounded-3xl glass-strong overflow-hidden p-12 sm:p-16 text-center">
          <AuroraBackground intensity="subtle" />
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle border border-white/10 text-xs text-slate-300">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Free to use during the hackathon
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Stop hunting for teammates. <br />
              <GradientText animated>Start building.</GradientText>
            </h2>
            <p className="text-lg text-slate-400">
              Join hundreds of students discovering their perfect collaboration
              match — and the AI plan to ship something real.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link href="/auth/signup">
                <GlowButton variant="primary" size="lg">
                  Create your profile
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Link>
              <Link href="/matches">
                <GlowButton variant="outline" size="lg">
                  Browse sample matches
                </GlowButton>
              </Link>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              No credit card. Just your skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
