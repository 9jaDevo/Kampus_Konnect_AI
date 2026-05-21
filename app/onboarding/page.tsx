"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { OnboardingProgress } from "@/components/profile/onboarding-progress";
import { TagPicker } from "@/components/profile/tag-picker";
import { AvailabilityGrid } from "@/components/profile/availability-grid";
import { CollaborationTypeSelector } from "@/components/profile/collaboration-type-selector";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SKILLS } from "@/constants/skills";
import { INTERESTS } from "@/constants/interests";
import type {
  AvailabilitySlot,
  CollaborationType,
  SkillLevel,
  StudentProfile,
} from "@/types/profile";

const STEPS = ["Basics", "Skills", "Interests", "Availability", "Collaboration"];

const LEVELS: { value: SkillLevel; label: string; description: string }[] = [
  { value: "beginner", label: "Beginner", description: "Just getting started" },
  { value: "intermediate", label: "Intermediate", description: "Comfortable building" },
  { value: "advanced", label: "Advanced", description: "Could mentor others" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Partial<StudentProfile>>({
    fullName: "",
    school: "",
    courseOfStudy: "",
    bio: "",
    skillLevel: "intermediate",
    skills: [],
    interests: [],
    goals: [],
    collaborationTypes: [],
    availability: [],
  });

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!form.fullName && form.fullName.trim().length >= 2;
      case 1:
        return (form.skills?.length ?? 0) >= 2;
      case 2:
        return (form.interests?.length ?? 0) >= 2;
      case 3:
        return (form.availability?.length ?? 0) >= 1;
      case 4:
        return (form.collaborationTypes?.length ?? 0) >= 1;
      default:
        return false;
    }
  }, [step, form]);

  function update<K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleArray<T>(key: keyof StudentProfile, value: T, max?: number) {
    const list = (form[key] as unknown as T[]) ?? [];
    const exists = list.includes(value);
    if (exists) {
      update(key, list.filter((v) => v !== value) as never);
    } else if (max === undefined || list.length < max) {
      update(key, [...list, value] as never);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      // In a real app: persist to Supabase here.
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Profile ready — let's find your matches!");
      router.push("/matches");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 min-h-screen relative">
        <AuroraBackground intensity="subtle" />
        <div className="container max-w-3xl relative z-10 space-y-8">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-white/10 text-xs text-cyan-300">
              <Sparkles className="h-3 w-3" /> Build your profile
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Let&apos;s set you up
            </h1>
            <p className="text-slate-400">
              Takes 2 minutes. The better your profile, the better your matches.
            </p>
          </div>

          <OnboardingProgress steps={STEPS} current={step} />

          <GlassCard className="p-6 sm:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {step === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full name</Label>
                      <Input
                        id="fullName"
                        value={form.fullName ?? ""}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Aisha Bello"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">School</Label>
                        <Input
                          id="school"
                          value={form.school ?? ""}
                          onChange={(e) => update("school", e.target.value)}
                          placeholder="University of Abuja"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course of study</Label>
                        <Input
                          id="course"
                          value={form.courseOfStudy ?? ""}
                          onChange={(e) => update("courseOfStudy", e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Short bio</Label>
                      <Textarea
                        id="bio"
                        value={form.bio ?? ""}
                        onChange={(e) => update("bio", e.target.value)}
                        placeholder="What are you passionate about?"
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="space-y-3">
                      <Label>Your skill level</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {LEVELS.map((lvl) => (
                          <button
                            key={lvl.value}
                            type="button"
                            onClick={() => update("skillLevel", lvl.value)}
                            className={
                              "p-3 rounded-xl border text-center transition-all " +
                              (form.skillLevel === lvl.value
                                ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border-cyan-400/40 text-white"
                                : "glass-subtle border-white/10 text-slate-300 hover:border-white/20")
                            }
                          >
                            <div className="font-display font-semibold text-sm">{lvl.label}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{lvl.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Pick your skills</Label>
                        <span className="text-xs text-slate-500">
                          {form.skills?.length ?? 0} selected · pick 2–8
                        </span>
                      </div>
                      <TagPicker
                        options={SKILLS}
                        selected={form.skills ?? []}
                        onToggle={(v) => toggleArray("skills", v, 8)}
                        max={8}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Interests</Label>
                      <span className="text-xs text-slate-500">
                        {form.interests?.length ?? 0} selected · pick 2–6
                      </span>
                    </div>
                    <TagPicker
                      options={INTERESTS}
                      selected={form.interests ?? []}
                      onToggle={(v) => toggleArray("interests", v, 6)}
                      max={6}
                    />
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="goals">What are your goals?</Label>
                      <Textarea
                        id="goals"
                        value={(form.goals ?? []).join(", ")}
                        onChange={(e) =>
                          update(
                            "goals",
                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        placeholder="e.g. Join a hackathon team, Build a portfolio, Improve coding"
                        rows={2}
                      />
                      <p className="text-xs text-slate-500">Separate with commas.</p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <Label>When are you free to collaborate?</Label>
                    <p className="text-xs text-slate-400">
                      Tap any cells where you&apos;re typically available.
                    </p>
                    <AvailabilityGrid
                      value={(form.availability ?? []) as AvailabilitySlot[]}
                      onChange={(v) => update("availability", v)}
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3">
                    <Label>What kind of collaboration?</Label>
                    <p className="text-xs text-slate-400">Pick all that apply.</p>
                    <CollaborationTypeSelector
                      selected={(form.collaborationTypes ?? []) as CollaborationType[]}
                      onToggle={(v) => toggleArray("collaborationTypes", v)}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </GlassCard>

          <div className="flex items-center justify-between">
            <GlowButton
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </GlowButton>
            {step < STEPS.length - 1 ? (
              <GlowButton
                variant="primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </GlowButton>
            ) : (
              <GlowButton variant="primary" onClick={handleSubmit} disabled={!canAdvance || submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {submitting ? "Building…" : "Find my matches"}
              </GlowButton>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
