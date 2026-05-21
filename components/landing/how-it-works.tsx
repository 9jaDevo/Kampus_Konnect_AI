"use client";

import { UserPlus, Sparkles, Users, Rocket } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Tag } from "@/components/ui/tag";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";

const STEPS = [
  {
    Icon: UserPlus,
    title: "Create your profile",
    description:
      "Tell us your skills, interests, goals, and when you're free to collaborate.",
    color: "cyan" as const,
  },
  {
    Icon: Sparkles,
    title: "Get AI matches",
    description:
      "Gemini explains why each match works — shared interests, complementary skills.",
    color: "indigo" as const,
  },
  {
    Icon: Users,
    title: "Form your team",
    description:
      "Invite matches by role. Skip the awkward 'looking for teammates' posts.",
    color: "violet" as const,
  },
  {
    Icon: Rocket,
    title: "Build together",
    description:
      "Get a Gemini-generated plan: roles, tasks, timeline, demo, and pitch.",
    color: "cyan" as const,
  },
];

const COLOR_MAP = {
  cyan: { border: "border-cyan-400/30", bg: "bg-cyan-500/15", text: "text-cyan-300" },
  indigo: { border: "border-indigo-400/30", bg: "bg-indigo-500/15", text: "text-indigo-300" },
  violet: { border: "border-violet-400/30", bg: "bg-violet-500/15", text: "text-violet-300" },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="container space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Tag variant="indigo">How it works</Tag>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            From <GradientText>idea to team</GradientText> in 4 steps
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line behind nodes */}
          <div
            className="hidden lg:block absolute top-12 left-12 right-12 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,207,255,0.4), rgba(99,102,241,0.4), rgba(139,92,246,0.4))",
            }}
            aria-hidden
          />

          {STEPS.map((step, i) => {
            const c = COLOR_MAP[step.color];
            return (
              <StaggerItem key={step.title} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`relative h-24 w-24 rounded-2xl glass-strong ${c.border} flex items-center justify-center`}
                  >
                    <div
                      className={`absolute inset-2 rounded-xl ${c.bg} flex items-center justify-center`}
                    >
                      <step.Icon className={`h-8 w-8 ${c.text}`} />
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#07071a] border ${c.border} flex items-center justify-center text-xs font-display font-bold ${c.text}`}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 max-w-[14rem]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
