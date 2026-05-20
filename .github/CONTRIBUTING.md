# Contributing to Kampus Konnect AI

Thank you for contributing. Please read this guide before opening issues or pull requests.

---

## Project Overview

Kampus Konnect AI is an AI-powered student collaboration platform built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and the Google Gemini API.

Before contributing, read:

- `README.md` — Full project specification
- `.github/copilot-instructions.md` — Coding conventions, types, and rules

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/9jaDevo/Kampus_Konnect_AI.git
cd Kampus_Konnect_AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Branch Strategy

| Branch    | Purpose                               |
| --------- | ------------------------------------- |
| `main`    | Production-ready code                 |
| `develop` | Integration branch for features       |
| `feat/*`  | Feature branches (branch from develop)|
| `fix/*`   | Bug fix branches                      |

Always branch from `develop`. Open PRs targeting `develop`.

---

## Commit Message Format

Use the conventional commits format:

```
feat: add match explanation panel
fix: resolve score calculation for beginner profiles
chore: update Gemini model to gemini-1.5-flash
docs: add component usage notes
refactor: extract SkillTags into standalone component
```

---

## Code Rules

- TypeScript strict mode — no `any` types.
- All components are named exports.
- AI calls must only happen inside `app/api/ai/*/route.ts`.
- All API inputs validated with Zod.
- No secrets in client-side files.
- Use Tailwind classes only — no inline styles.
- Components must stay under 150 lines.

---

## MVP Build Order

If you are picking up a task, follow this order:

1. Landing page
2. Onboarding form
3. Matching score function
4. Match explanation API route
5. Matches page
6. Project ideas API route
7. AI Planner page
8. Teams page + Collaboration plan route
9. Dashboard
10. First message + Pitch script routes

---

## Opening Issues

Use the issue templates in `.github/ISSUE_TEMPLATE/`:

- **Task** — for building a feature or screen
- **Bug Report** — for broken behaviour
- **Feature Request** — for enhancements or post-MVP ideas

---

## Opening Pull Requests

Use the PR template. All checklist items must be checked before requesting review.

---

## Security

- Never commit `.env.local` or any file containing real API keys.
- Never add `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to client-side code.
- Do not bypass Supabase Auth session checks on protected routes.
