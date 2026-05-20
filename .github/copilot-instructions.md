# Copilot Instructions — Kampus Konnect AI

## Project Overview

Kampus Konnect AI is an AI-powered student connection and collaboration platform. It helps students find teammates, mentors, study partners, and project collaborators using AI-driven matching and Gemini API integration.

Built for the **Connect N Code Hackathon**. The AI is not a chatbot — it appears in specific product moments as a decision-support layer.

---

## Tech Stack

| Layer          | Technology                                         |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 14+ (App Router)                           |
| Language       | TypeScript (strict mode)                           |
| Styling        | Tailwind CSS + shadcn/ui                           |
| Animation      | Framer Motion                                      |
| Database       | Supabase (PostgreSQL)                              |
| Auth           | Supabase Auth                                      |
| AI             | Google Gemini API (`@google/generative-ai`)        |
| Deployment     | Vercel                                             |

---

## Folder Structure

Follow this exact structure:

```
kampus-konnect-ai/
  app/
    page.tsx                    ← Landing page
    layout.tsx
    dashboard/page.tsx
    onboarding/page.tsx
    matches/page.tsx
    teams/page.tsx
    planner/page.tsx
    api/
      ai/
        match-explanation/route.ts
        project-ideas/route.ts
        collaboration-plan/route.ts
        first-message/route.ts
        pitch-script/route.ts
      matches/route.ts
      teams/route.ts
  components/
    ui/                         ← shadcn/ui base components
    layout/                     ← Header, Footer, Sidebar
    landing/                    ← Hero, Features, HowItWorks, CTA
    dashboard/                  ← DashboardCard, NextSteps
    profile/                    ← ProfileForm, SkillTags, AvatarUpload
    matches/                    ← MatchCard, CompatibilityScore, ExplanationPanel
    teams/                      ← TeamCard, TeamBuilder, RoleSelector
    ai/                         ← AIOutputPanel, PlanDisplay, IdeaCard
  lib/
    ai/
      gemini.ts                 ← Gemini client initialisation
      prompts.ts                ← All prompt templates
    matching/
      scoring.ts                ← compatibilityScore formula
    db/
      supabase.ts               ← Supabase client (browser + server)
    validators/
      profile.ts                ← Zod schemas
  types/
    user.ts
    profile.ts
    match.ts
    team.ts
  constants/
    skills.ts
    interests.ts
    collaboration-types.ts
  public/images/
  .env.example
```

---

## Core Data Types

Always use these exact TypeScript types. Do not invent new shapes.

```ts
// types/profile.ts
type CollaborationType =
  | "hackathon-team"
  | "study-partner"
  | "project-collaboration"
  | "mentor"
  | "mentee"
  | "skill-swap"
  | "accountability-partner";

type AvailabilitySlot = {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  period: "morning" | "afternoon" | "evening" | "night";
};

type StudentProfile = {
  id: string;
  userId: string;
  school?: string;
  courseOfStudy?: string;
  bio?: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  skills: string[];
  interests: string[];
  goals: string[];
  collaborationTypes: CollaborationType[];
  availability: AvailabilitySlot[];
  communicationPreference?: "chat" | "video" | "email" | "in-person" | "flexible";
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
};

// types/match.ts
type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibilityScore: number;      // 0–100
  sharedInterests: string[];
  complementarySkills: string[];
  aiExplanation: string;
  suggestedCollaborationType: CollaborationType;
  firstMessageSuggestion?: string;
  createdAt: string;
};

// types/team.ts
type Team = {
  id: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  ownerId: string;
  memberIds: string[];
  requiredRoles: string[];
  status: "forming" | "active" | "completed";
  aiCollaborationPlan?: string;
  createdAt: string;
  updatedAt: string;
};
```

---

## Matching Score Formula

Use this formula exactly in `lib/matching/scoring.ts`:

```ts
compatibilityScore =
  skillComplementarityScore * 0.3 +
  sharedInterestScore       * 0.2 +
  availabilityScore         * 0.2 +
  goalAlignmentScore        * 0.2 +
  experienceBalanceScore    * 0.1;
```

Scoring rules:
- **Skill complementarity**: user needs skill that match has, and vice versa → high score.
- **Shared interest**: count overlapping interest tags, normalise to 0–100.
- **Availability**: count overlapping `AvailabilitySlot` combinations.
- **Goal alignment**: semantic similarity via keyword overlap.
- **Experience balance**: beginner+intermediate=80, intermediate+advanced=90, same level=70.

---

## AI Integration Rules

All Gemini calls **must** happen in Next.js API route handlers (`app/api/ai/*/route.ts`), never in client components.

### Gemini client — `lib/ai/gemini.ts`

```ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}
```

### Prompts — `lib/ai/prompts.ts`

Define and export typed prompt builders, not raw strings. Each function takes typed parameters and returns a string prompt.

```ts
export function buildMatchExplanationPrompt(profileA: StudentProfile, profileB: StudentProfile): string { ... }
export function buildProjectIdeasPrompt(interests: string[], goals: string[], skillLevel: string): string { ... }
export function buildCollaborationPlanPrompt(team: Team, members: StudentProfile[], timeline: string): string { ... }
export function buildFirstMessagePrompt(sender: StudentProfile, receiver: StudentProfile, type: CollaborationType): string { ... }
export function buildPitchScriptPrompt(project: Pick<Team, "projectTitle" | "projectDescription">): string { ... }
```

### AI System Instruction (prepend to every prompt)

```
You are Kampus Konnect AI, an intelligent student collaboration assistant.
Your job is to help students find meaningful academic, technical, creative, and professional collaboration opportunities.
Be supportive, practical, inclusive, and concise.
Do not make discriminatory assumptions.
Do not expose private data.
Do not claim certainty where only recommendation is possible.
Return structured output when requested.
```

---

## API Route Conventions

All AI routes follow this pattern:

```ts
// app/api/ai/[endpoint]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildXxxPrompt } from "@/lib/ai/prompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // validate input with Zod
    const prompt = buildXxxPrompt(/* parsed params */);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("[AI Route Error]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
```

Rate-limit all AI endpoints. Use `headers()` to check and enforce limits per user session.

---

## Component Conventions

- Every component is a named export, never default export from component files.
- Use `interface` for component props, named `XxxProps`.
- Keep components under 150 lines. Extract sub-components if larger.
- All loading states use a `<Skeleton />` from shadcn/ui.
- All error states show a friendly message, not a raw error string.
- Use `cn()` from `lib/utils` for conditional class names.

### MatchCard example shape

```tsx
interface MatchCardProps {
  match: Match;
  matchedProfile: StudentProfile;
  onConnect: (matchId: string) => void;
  onGenerateMessage: (matchId: string) => void;
}
```

---

## Environment Variables

Required in `.env.local` (never committed):

```env
NEXT_PUBLIC_APP_NAME="Kampus Konnect AI"
GEMINI_API_KEY="your_gemini_api_key"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
```

- `GEMINI_API_KEY` is **server-only** — never prefix with `NEXT_PUBLIC_`.
- `SUPABASE_SERVICE_ROLE_KEY` is **server-only** — never expose to the client.

---

## Security Rules

1. Never import `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in any file inside `components/` or `app/(pages)/`.
2. Validate all incoming API request bodies with Zod before processing.
3. Sanitize all user-generated content before storing or displaying.
4. Do not auto-send AI-generated messages — always require explicit user action.
5. Protect all non-public routes with Supabase Auth session checks.
6. Do not reveal other users' private fields (email, phone) in match responses.

---

## UI and Design Rules

- **Primary color**: Indigo (`indigo-600` / `indigo-700`)
- **Accent color**: Cyan or Purple
- **Background**: Soft white or `gray-50` with subtle gradients
- **Cards**: Rounded (`rounded-2xl`), soft shadow (`shadow-md`)
- **Mobile-first**: All layouts use responsive Tailwind classes (`sm:`, `md:`, `lg:`)
- **Animations**: Subtle only — use `framer-motion` `fadeIn` or `slideUp` variants
- **Icons**: Use `lucide-react`
- **Typography**: `font-sans`, clean hierarchy with `text-sm`, `text-base`, `text-xl`, `text-3xl`

---

## Sample Seed Data

Use this in `lib/db/seed.ts` or `constants/sample-profiles.ts` for demo purposes:

```ts
export const sampleProfiles: Partial<StudentProfile>[] = [
  {
    fullName: "Aisha Bello",
    school: "University of Abuja",
    skillLevel: "intermediate",
    skills: ["UI/UX Design", "Research", "Presentation"],
    interests: ["Education", "Student Productivity", "Social Impact"],
    goals: ["Join a hackathon team", "Build portfolio projects"],
    availability: [{ day: "saturday", period: "evening" }, { day: "sunday", period: "afternoon" }],
  },
  {
    fullName: "David Okafor",
    school: "Baze University",
    skillLevel: "advanced",
    skills: ["Backend Development", "Database Design", "API Integration"],
    interests: ["FinTech", "AI Tools", "Productivity"],
    goals: ["Build scalable apps", "Mentor beginners"],
    availability: [{ day: "friday", period: "evening" }, { day: "saturday", period: "morning" }],
  },
  {
    fullName: "Zainab Musa",
    school: "Nile University",
    skillLevel: "beginner",
    skills: ["Frontend Development", "Content Writing"],
    interests: ["Education", "Scholarships", "Community"],
    goals: ["Find a project team", "Improve coding skills"],
    availability: [{ day: "friday", period: "evening" }, { day: "saturday", period: "afternoon" }],
  },
  {
    fullName: "Emeka Nwosu",
    school: "Veritas University",
    skillLevel: "intermediate",
    skills: ["Mobile Development", "Firebase", "Pitching"],
    interests: ["HealthTech", "Student Life", "AI"],
    goals: ["Build a hackathon MVP", "Find a designer"],
    availability: [{ day: "saturday", period: "morning" }, { day: "sunday", period: "afternoon" }],
  },
];
```

---

## MVP Build Order

Build in this sequence. Do not skip steps.

1. `app/page.tsx` — Landing page (Hero, Features, HowItWorks, CTA)
2. `app/onboarding/page.tsx` — Multi-step profile form
3. `lib/matching/scoring.ts` — Matching score function
4. `app/api/ai/match-explanation/route.ts` — Gemini match explanation endpoint
5. `app/matches/page.tsx` — Match cards with scores and AI explanations
6. `app/api/ai/project-ideas/route.ts` — Gemini project ideas endpoint
7. `app/planner/page.tsx` — AI project planner
8. `app/teams/page.tsx` + `app/api/ai/collaboration-plan/route.ts` — Team builder + plan
9. `app/dashboard/page.tsx` — Unified dashboard
10. `app/api/ai/first-message/route.ts` + `app/api/ai/pitch-script/route.ts` — Remaining AI endpoints

---

## What NOT to Build

- Do not build a general-purpose chat interface.
- Do not use AI to automatically send messages on behalf of users.
- Do not expose profile emails or contact details in match results.
- Do not add features outside the MVP scope without a tracked issue.
- Do not use `any` type in TypeScript.
- Do not use inline styles — use Tailwind only.
