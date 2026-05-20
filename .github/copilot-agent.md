# GitHub Copilot Agent — Kampus Konnect AI

## Purpose

This file defines the autonomous agent mode for GitHub Copilot when working on Kampus Konnect AI. It tells the agent what to do, what tools to use, and how to proceed through the full build.

---

## Agent Behaviour

When asked to build a feature, the agent must:

1. Read `README.md` and `.github/copilot-instructions.md` first.
2. Follow the MVP build order exactly (do not skip steps).
3. Create files only in the correct folders defined in the folder structure.
4. Use only the exact TypeScript types defined in `copilot-instructions.md`.
5. Never place Gemini API calls in components or pages — only in `app/api/ai/*/route.ts`.
6. Validate all API inputs with Zod before processing.
7. Use `cn()` from `lib/utils` for all conditional Tailwind class names.
8. Use shadcn/ui components for all UI primitives (Button, Card, Skeleton, Input, etc.).
9. Use Framer Motion for subtle `fadeIn` and `slideUp` animations only.
10. Include loading and error states for every async operation.

---

## Build Sequence

The agent must build features in this exact order:

### Step 1 — Project Scaffold

- `package.json` — Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion, Supabase, Gemini
- `tsconfig.json` — strict mode enabled
- `tailwind.config.ts` — include indigo primary, custom font
- `app/layout.tsx` — root layout with metadata and font
- `.env.example` — all required keys (no real values)
- `lib/utils.ts` — `cn()` utility using `clsx` + `tailwind-merge`

### Step 2 — Types and Constants

- `types/user.ts`
- `types/profile.ts` — `StudentProfile`, `CollaborationType`, `AvailabilitySlot`
- `types/match.ts` — `Match`
- `types/team.ts` — `Team`, `ConnectionRequest`, `AIOutput`
- `constants/skills.ts`
- `constants/interests.ts`
- `constants/collaboration-types.ts`
- `constants/sample-profiles.ts`

### Step 3 — Database and Auth

- `lib/db/supabase.ts` — browser client and server client
- `lib/validators/profile.ts` — Zod schemas for `StudentProfile`, `Team`, API bodies

### Step 4 — AI Infrastructure

- `lib/ai/gemini.ts` — `getGeminiModel()` using `gemini-1.5-flash`
- `lib/ai/prompts.ts` — all five typed prompt builder functions

### Step 5 — Matching Logic

- `lib/matching/scoring.ts` — `computeCompatibilityScore()` using the exact weighted formula

### Step 6 — Landing Page

- `components/landing/Hero.tsx`
- `components/landing/Features.tsx`
- `components/landing/HowItWorks.tsx`
- `components/landing/CTA.tsx`
- `app/page.tsx` — assemble landing sections

### Step 7 — Layout

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Sidebar.tsx`

### Step 8 — Auth

- `app/auth/login/page.tsx`
- `app/auth/signup/page.tsx`

### Step 9 — Onboarding

- `components/profile/SkillTags.tsx`
- `components/profile/ProfileForm.tsx`
- `app/onboarding/page.tsx` — multi-step form

### Step 10 — Match Explanation API Route

- `app/api/ai/match-explanation/route.ts`

### Step 11 — Matches Page

- `components/matches/CompatibilityScore.tsx`
- `components/matches/ExplanationPanel.tsx`
- `components/matches/MatchCard.tsx`
- `app/matches/page.tsx`

### Step 12 — Project Ideas API Route

- `app/api/ai/project-ideas/route.ts`

### Step 13 — AI Planner Page

- `components/ai/IdeaCard.tsx`
- `components/ai/PlanDisplay.tsx`
- `components/ai/AIOutputPanel.tsx`
- `app/planner/page.tsx`

### Step 14 — Collaboration Plan API Route

- `app/api/ai/collaboration-plan/route.ts`

### Step 15 — Teams Page

- `components/teams/RoleSelector.tsx`
- `components/teams/TeamCard.tsx`
- `components/teams/TeamBuilder.tsx`
- `app/teams/page.tsx`
- `app/api/teams/route.ts`

### Step 16 — Dashboard

- `components/dashboard/DashboardCard.tsx`
- `components/dashboard/NextSteps.tsx`
- `app/dashboard/page.tsx`

### Step 17 — Remaining AI Routes

- `app/api/ai/first-message/route.ts`
- `app/api/ai/pitch-script/route.ts`

---

## Component Rules Summary

| Rule | Value |
| ---- | ----- |
| Exports | Named exports only |
| Props interface | `interface XxxProps` |
| Max lines per component | 150 |
| Loading state | `<Skeleton />` from shadcn/ui |
| Error state | Friendly message string, not raw error |
| Class names | `cn()` from `lib/utils` |
| Icons | `lucide-react` |
| Styles | Tailwind only — no inline styles |

---

## Security Checklist (agent must verify for every file)

- [ ] No `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in any file inside `components/` or `app/` pages.
- [ ] All AI calls are inside `app/api/ai/*/route.ts`.
- [ ] All API request bodies are validated with Zod.
- [ ] Protected pages check Supabase Auth session before rendering.
- [ ] No raw user data is rendered without sanitisation.

---

## AI Output Format

When generating AI outputs for display:

- Use structured markdown or a numbered list.
- Wrap in `<AIOutputPanel>` component.
- Always show a loading skeleton while the request is in flight.
- Always show a retry button on error.
- Never display raw JSON to the user.
