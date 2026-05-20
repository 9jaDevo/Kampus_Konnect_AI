# Kampus Konnect AI

**Kampus Konnect AI** is an AI-powered student connection and collaboration platform built to help students find the right teammates, mentors, study partners, and project collaborators based on their skills, goals, interests, experience level, availability, and project needs.

The project is designed for the **Connect N Code Hackathon** theme of building technology that helps people connect. It uses AI not as a gimmick, but as a decision-support layer that makes student collaboration smarter, faster, more inclusive, and more productive.

---

## Table of Contents

- [Project Summary](#project-summary)
- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Core Product Vision](#core-product-vision)
- [Target Users](#target-users)
- [Key Use Cases](#key-use-cases)
- [Core Features](#core-features)
- [AI Features Powered by Gemini API](#ai-features-powered-by-gemini-api)
- [Hackathon Judging Alignment](#hackathon-judging-alignment)
- [Recommended Tech Stack](#recommended-tech-stack)
- [Product Architecture](#product-architecture)
- [Application Pages](#application-pages)
- [User Flow](#user-flow)
- [Data Models](#data-models)
- [AI Prompting Strategy](#ai-prompting-strategy)
- [Matching Logic](#matching-logic)
- [Security and Privacy Requirements](#security-and-privacy-requirements)
- [Accessibility and UX Guidelines](#accessibility-and-ux-guidelines)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Suggested Folder Structure](#suggested-folder-structure)
- [MVP Scope](#mvp-scope)
- [Post-MVP Roadmap](#post-mvp-roadmap)
- [Demo Script](#demo-script)
- [Devpost Submission Summary](#devpost-submission-summary)
- [Engineering Principles](#engineering-principles)

---

## Project Summary

Kampus Konnect AI helps students connect with the right people for academic, creative, technical, and career-building collaboration.

Instead of students randomly searching for teammates or relying only on existing friends, the platform analyzes user profiles and recommends meaningful connections based on compatibility.

The platform can recommend:

- Project teammates
- Study partners
- Mentors
- Skill-swap partners
- Hackathon team members
- Peer accountability partners
- Collaboration groups

The AI explains why each connection is relevant and can generate a collaboration plan for each team.

---

## Problem Statement

Students often struggle to find the right people to work with.

Common challenges include:

1. Students do not know who has the skills they need.
2. Beginners struggle to find supportive teammates.
3. Hackathon participants waste time forming teams instead of building.
4. Students with good ideas may lack technical, design, or presentation partners.
5. Mentorship opportunities are scattered and informal.
6. Study groups are often poorly matched by learning style, availability, and goals.
7. Collaboration fails when roles, expectations, and timelines are not clear.

The result is missed opportunities, weak teams, abandoned projects, and students feeling isolated.

---

## Solution Overview

Kampus Konnect AI solves this by creating a structured, AI-assisted connection experience.

Students create profiles containing their skills, interests, goals, project preferences, availability, and desired collaboration type. The system uses AI to interpret the profiles and recommend the best possible matches.

For every recommendation, the platform provides:

- A compatibility score
- A plain-language explanation
- Suggested collaboration type
- Possible project ideas
- Recommended team roles
- First-message suggestion
- AI-generated collaboration plan

This turns connection into an intentional, guided, and productive process.

---

## Core Product Vision

The long-term vision is to become the intelligent collaboration layer for students across schools, universities, bootcamps, online communities, and hackathons.

Kampus Konnect AI should feel like:

> LinkedIn for student collaboration, but smarter, simpler, and built around real project outcomes.

The platform should not only connect people; it should help them start working together immediately.

---

## Target Users

### Primary Users

1. **University and college students** looking for project partners, study groups, or mentors.
2. **Hackathon participants** looking for teammates with complementary skills.
3. **Beginner developers and designers** looking for people to learn and build with.
4. **Students with ideas but no team** looking for developers, designers, researchers, writers, or presenters.

### Secondary Users

1. **Mentors** willing to guide student teams.
2. **Campus clubs** looking to organize members into project groups.
3. **Bootcamps and learning communities** looking to improve peer collaboration.
4. **Schools and universities** looking to improve student engagement and project-based learning.

---

## Key Use Cases

### Use Case 1: Student Finds a Hackathon Team

A student enters:

- Skill: Frontend development
- Level: Beginner
- Interest: Education technology
- Availability: Weekends
- Need: Backend developer and designer

Kampus Konnect AI recommends students who match those needs and explains why they are strong matches.

### Use Case 2: Student Finds a Study Partner

A student studying data structures indicates:

- Learning style: Visual
- Availability: Evenings
- Goal: Prepare for exams
- Level: Intermediate

The platform recommends peers with similar study goals and compatible schedules.

### Use Case 3: Student Forms a Project Team

A student creates a project idea:

> “An app that helps students track scholarship deadlines.”

AI suggests ideal roles:

- Frontend developer
- Backend developer
- UI/UX designer
- Researcher
- Presenter

Then it recommends matching students for each role.

### Use Case 4: Team Gets an AI Collaboration Plan

Once a team is formed, Gemini generates:

- Team mission
- Role breakdown
- Task list
- Timeline
- Suggested tools
- Demo pitch
- Submission checklist

---

## Core Features

### 1. User Profile Creation

Each student should create a profile with:

- Full name
- School or institution
- Course or field of study
- Skill areas
- Skill level
- Interests
- Goals
- Preferred collaboration type
- Availability
- Preferred communication style
- Portfolio or GitHub link
- Short bio

### 2. Skill and Interest Tags

The platform should support tags such as:

- Frontend Development
- Backend Development
- UI/UX Design
- Product Management
- Data Analysis
- AI/ML
- Cybersecurity
- Content Writing
- Pitching
- Research
- Mobile Development
- Education
- HealthTech
- FinTech
- Social Impact
- Climate
- Productivity
- Student Life

### 3. AI-Powered Match Recommendations

The platform should recommend users based on:

- Shared interests
- Complementary skills
- Similar goals
- Compatible availability
- Collaboration preference
- Experience level fit
- Project type compatibility

### 4. Match Explanation

Every match should include a short AI-generated explanation.

Example:

> Sarah is a strong match because she has UI/UX design experience, is interested in education technology, and is available on weekends. Her design skills complement your frontend development background.

### 5. Compatibility Score

Each match should include a score from 0 to 100.

Suggested scoring factors:

- Skill complementarity: 30%
- Shared interest: 20%
- Availability compatibility: 20%
- Goal alignment: 20%
- Experience balance: 10%

### 6. AI Project Idea Generator

Students can enter an area of interest and receive project ideas.

Example input:

> I want to build something around education and student productivity.

Example output:

- Scholarship Deadline Tracker
- AI Study Group Organizer
- Campus Lost-and-Found Platform
- Peer Tutoring Marketplace
- Class Notes Summarizer

### 7. Team Builder

Users should be able to create or join a team.

A team should have:

- Team name
- Project idea
- Description
- Required roles
- Members
- Status
- Collaboration plan
- Team chat placeholder or external link

### 8. AI Collaboration Plan

For each team, AI should generate:

- Project summary
- Problem statement
- MVP features
- Team roles
- Task breakdown
- Suggested timeline
- Demo structure
- Pitch script
- Risk checklist

### 9. First Message Generator

When a user wants to connect with a recommended match, Gemini can generate a friendly first message.

Example:

> Hi Sarah, I saw that you are interested in education technology and UI/UX design. I am working on a student productivity project and think your design skills could be a great fit. Would you be open to collaborating?

### 10. Dashboard

The dashboard should show:

- Profile completion status
- Recommended matches
- Active teams
- Suggested project ideas
- Pending connection requests
- AI-generated next steps

---

## AI Features Powered by Gemini API

Gemini API should be used for meaningful intelligence across the platform.

### Primary Gemini Use Cases

1. **Profile Understanding**: Convert user profile data into structured collaboration insights.
2. **Match Recommendation Explanation**: Explain why two students are compatible.
3. **Project Idea Generation**: Generate project ideas based on student goals and interests.
4. **Collaboration Plan Generation**: Create task breakdowns, team plans, and timelines.
5. **First Message Generation**: Help students start conversations professionally.
6. **Pitch and Demo Assistance**: Generate hackathon pitch scripts and Devpost summaries.

### AI Should Not Be Used For

- Making irreversible decisions without user control.
- Ranking students unfairly.
- Revealing sensitive profile information.
- Replacing human consent.
- Sending messages automatically without user approval.

---

## Hackathon Judging Alignment

### Creativity

Kampus Konnect AI goes beyond a basic chatbot. It uses AI as a collaboration engine that helps students move from “I need a team” to “I have a plan and people to build with.”

### Technical Execution

The app can demonstrate:

- Authentication
- Profile management
- Match recommendation logic
- Gemini API integration
- Dynamic dashboards
- Team creation
- AI-generated plans

### Gemini API Usage

Gemini is deeply integrated into the product experience.

It is used for:

- Profile interpretation
- Match explanation
- Project generation
- Collaboration planning
- Pitch generation

### Impact

The project solves a real student problem: finding the right people to learn, build, and grow with.

### Presentation

The demo is easy to understand and visually compelling:

1. Create profile.
2. Get AI matches.
3. Create team.
4. Generate project plan.
5. Show pitch output.

---

## Recommended Tech Stack

### Frontend

Recommended:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Alternative:

- Vite + React + TypeScript

### Backend

Recommended:

- Next.js API Routes or server actions

Alternative:

- Node.js + Express

### Database

Recommended:

- Supabase PostgreSQL

Alternative:

- Firebase Firestore

### Authentication

Recommended:

- Supabase Auth

Alternative:

- Firebase Auth
- Clerk

### AI

- Gemini API

### Deployment

Recommended:

- Vercel

Alternative:

- Netlify
- Render

---

## Product Architecture

```txt
Client UI
  |
  |-- Dashboard
  |-- Profile Builder
  |-- Match Results
  |-- Team Builder
  |-- AI Assistant Panels
  |
Application Layer
  |
  |-- Auth Service
  |-- Profile Service
  |-- Matching Service
  |-- Team Service
  |-- AI Service
  |
Data Layer
  |
  |-- Users
  |-- Profiles
  |-- Skills
  |-- Matches
  |-- Teams
  |-- Connection Requests
  |-- AI Outputs
  |
External Services
  |
  |-- Gemini API
  |-- Supabase/Firebase
  |-- Hosting Provider
```

---

## Application Pages

### 1. Landing Page

Purpose:

- Explain the product.
- Show clear value proposition.
- Drive users to create a profile.

Sections:

- Hero section
- Problem section
- How it works
- Features
- Demo preview
- Call to action

Suggested hero copy:

> Find your perfect student team with AI.

Subtext:

> Kampus Konnect AI helps students discover teammates, mentors, study partners, and project collaborators based on skills, goals, and interests.

### 2. Authentication Page

Features:

- Sign up
- Login
- Optional demo login for hackathon judges

### 3. Onboarding Page

Collect:

- Name
- School
- Field of study
- Skills
- Skill level
- Interests
- Goals
- Availability
- Collaboration preference

### 4. Dashboard

Show:

- Recommended matches
- Suggested project ideas
- Active teams
- AI next steps

### 5. Matches Page

Show:

- Match cards
- Compatibility score
- AI explanation
- Shared interests
- Complementary skills
- Suggested first message

### 6. Team Builder Page

Show:

- Create team
- Add project idea
- Select needed roles
- Invite recommended matches
- Generate team plan

### 7. AI Project Planner Page

Allow user to enter:

- Project idea
- Team members
- Time available
- Hackathon deadline

Generate:

- MVP scope
- Task list
- Role assignment
- Demo pitch

### 8. Profile Page

Allow editing of:

- Bio
- Skills
- Interests
- Goals
- Links
- Availability

---

## User Flow

### New User Flow

```txt
User lands on website
  -> Clicks Get Started
  -> Creates account
  -> Completes onboarding profile
  -> Dashboard opens
  -> AI recommends matches
  -> User reviews match explanations
  -> User sends connection request
  -> User creates or joins team
  -> AI generates collaboration plan
```

### Returning User Flow

```txt
User logs in
  -> Views dashboard
  -> Checks new matches
  -> Reviews active teams
  -> Generates updated project plan
  -> Continues collaboration
```

---

## Data Models

### User

```ts
type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};
```

### StudentProfile

```ts
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
```

### CollaborationType

```ts
type CollaborationType =
  | "hackathon-team"
  | "study-partner"
  | "project-collaboration"
  | "mentor"
  | "mentee"
  | "skill-swap"
  | "accountability-partner";
```

### AvailabilitySlot

```ts
type AvailabilitySlot = {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  period: "morning" | "afternoon" | "evening" | "night";
};
```

### Match

```ts
type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibilityScore: number;
  sharedInterests: string[];
  complementarySkills: string[];
  aiExplanation: string;
  suggestedCollaborationType: CollaborationType;
  firstMessageSuggestion?: string;
  createdAt: string;
};
```

### Team

```ts
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

### ConnectionRequest

```ts
type ConnectionRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
};
```

### AIOutput

```ts
type AIOutput = {
  id: string;
  userId: string;
  type:
    | "match-explanation"
    | "project-idea"
    | "collaboration-plan"
    | "first-message"
    | "pitch-script";
  input: Record<string, unknown>;
  output: string;
  createdAt: string;
};
```

---

## AI Prompting Strategy

The AI should produce useful, structured, safe, and concise outputs.

### General AI System Instruction

```txt
You are Kampus Konnect AI, an intelligent student collaboration assistant.
Your job is to help students find meaningful academic, technical, creative, and professional collaboration opportunities.
Be supportive, practical, inclusive, and concise.
Do not make discriminatory assumptions.
Do not expose private data.
Do not claim certainty where only recommendation is possible.
Return structured output when requested.
```

### Match Explanation Prompt

```txt
Given the following two student profiles, explain why they may be a good collaboration match.

User A:
{{profileA}}

User B:
{{profileB}}

Return:
1. Compatibility summary
2. Shared interests
3. Complementary skills
4. Suggested collaboration type
5. Potential risk or mismatch
6. Suggested first message

Keep the explanation friendly, specific, and useful.
```

### Project Idea Prompt

```txt
Generate practical student project ideas based on the following interests and goals.

Interests:
{{interests}}

Goals:
{{goals}}

Skill level:
{{skillLevel}}

Return 5 project ideas.
For each idea include:
- Title
- Problem solved
- Target users
- MVP features
- Why it is achievable
```

### Collaboration Plan Prompt

```txt
Create a collaboration plan for a student team.

Project title:
{{projectTitle}}

Project description:
{{projectDescription}}

Team members and skills:
{{members}}

Time available:
{{timeline}}

Return:
- Project summary
- MVP scope
- Role assignment
- Task breakdown
- Timeline
- Demo plan
- Risks and mitigation
- Final pitch summary
```

### Devpost Pitch Prompt

```txt
Create a concise hackathon submission summary for this project.

Project:
{{project}}

Include:
- Inspiration
- What it does
- How we built it
- How Gemini API was used
- Challenges
- Accomplishments
- What is next
```

---

## Matching Logic

The MVP can use a hybrid matching approach:

1. Rule-based scoring
2. AI-generated explanation

### Basic Matching Score Formula

```ts
compatibilityScore =
  skillComplementarityScore * 0.3 +
  sharedInterestScore * 0.2 +
  availabilityScore * 0.2 +
  goalAlignmentScore * 0.2 +
  experienceBalanceScore * 0.1;
```

### Matching Details

Skill complementarity means two users match well when one has what the other needs.

Shared interest means users with similar interest areas should score higher.

Availability means users should match better when they have overlapping availability.

Goal alignment means users should match better when they want similar outcomes.

Experience balance should depend on the collaboration type. Beginner-beginner can work for study groups, beginner-intermediate can work for mentorship, and advanced-advanced can work for high-output project teams.

---

## Security and Privacy Requirements

### Required Security Practices

1. Do not expose the Gemini API key on the frontend.
2. Store API keys in environment variables.
3. Validate all user input.
4. Sanitize user-generated content.
5. Rate-limit AI endpoints.
6. Do not allow users to view private profile fields without permission.
7. Use authentication before allowing profile or team actions.
8. Keep connection requests consent-based.
9. Do not auto-send AI-generated messages.
10. Add basic abuse reporting for production.

### Data Privacy Principles

- Only collect data needed for matching.
- Let users edit or delete their profile.
- Do not show contact details publicly by default.
- Let users control who can contact them.
- Avoid sensitive personal data collection.
- Explain why a match is recommended.

---

## Accessibility and UX Guidelines

The application should be:

- Mobile-first
- Fast-loading
- Keyboard navigable
- Clear in contrast
- Friendly for beginners
- Simple enough for judges to understand in under one minute

### UI Personality

The design should feel:

- Youthful
- Smart
- Trustworthy
- Clean
- Modern
- Campus-oriented
- Slightly playful but still professional

### Suggested Visual Direction

- Primary color: Blue or indigo
- Accent color: Purple, cyan, or green
- Background: Soft gradients
- Components: Rounded cards, soft shadows
- Animations: Subtle transitions
- Icons: Skills, people, connection lines, AI sparkle, team cards

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_NAME="Kampus Konnect AI"
GEMINI_API_KEY="your_gemini_api_key"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
```

Never commit `.env.local` to GitHub.

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/9jadevo/kampus_konnect_ai.git
cd kampus_konnect_ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create `.env.local` and add the required keys.

### 4. Run development server

```bash
npm run dev
```

### 5. Open app

Visit:

```txt
http://localhost:3000
```

---

## Suggested Folder Structure

```txt
kampus-konnect-ai/
  app/
    page.tsx
    layout.tsx
    dashboard/
      page.tsx
    onboarding/
      page.tsx
    matches/
      page.tsx
    teams/
      page.tsx
    planner/
      page.tsx
    api/
      ai/
        match-explanation/
          route.ts
        project-ideas/
          route.ts
        collaboration-plan/
          route.ts
      matches/
        route.ts
      teams/
        route.ts
  components/
    ui/
    layout/
    landing/
    dashboard/
    profile/
    matches/
    teams/
    ai/
  lib/
    ai/
      gemini.ts
      prompts.ts
    matching/
      scoring.ts
    db/
      supabase.ts
    validators/
      profile.ts
  types/
    user.ts
    profile.ts
    match.ts
    team.ts
  constants/
    skills.ts
    interests.ts
    collaboration-types.ts
  public/
    images/
  README.md
  package.json
  .env.example
```

---

## MVP Scope

For the hackathon MVP, prioritize what can be clearly demonstrated.

### Must Have

- Landing page
- Onboarding profile form
- Dashboard
- Static or database-backed student profiles
- Match recommendation screen
- Gemini-generated match explanation
- Gemini-generated project ideas
- Gemini-generated collaboration plan
- Clean responsive UI
- Demo-ready sample data

### Should Have

- Authentication
- Team creation
- First-message generator
- Devpost pitch generator
- Save AI outputs

### Nice to Have

- Real-time chat
- Notifications
- Mentor accounts
- School verification
- Advanced search filters
- Team invite system

---

## Post-MVP Roadmap

### Version 1.1

- Real-time connection requests
- Team invite workflow
- User profile visibility controls
- Better recommendation filters

### Version 1.2

- Mentor marketplace
- Campus organization pages
- AI meeting agenda generator
- AI weekly progress check-in

### Version 1.3

- School admin dashboard
- Club and society team formation tools
- Hackathon organizer mode
- Analytics for student engagement

### Version 2.0

- Mobile app
- In-app messaging
- Verified student accounts
- AI-powered portfolio builder
- AI career path recommendations

---

## Demo Script

Use this flow during the hackathon presentation.

### Step 1: Introduce the Problem

> Students often have ideas but struggle to find the right teammates, mentors, or study partners. Many collaborations fail before they start because people do not know who has the right skills, availability, or goals.

### Step 2: Introduce the Product

> Kampus Konnect AI helps students discover meaningful connections using AI. It recommends teammates, mentors, and collaborators based on profile data and explains why each match makes sense.

### Step 3: Show Onboarding

Create a profile for a student:

- Skill: Frontend development
- Interest: Education technology
- Goal: Build a hackathon project
- Availability: Evenings and weekends

### Step 4: Show Match Recommendations

Display recommended students with compatibility scores and AI explanations.

### Step 5: Generate First Message

Show how Gemini helps the student start a professional conversation.

### Step 6: Create Team

Create a team around a project idea.

### Step 7: Generate Collaboration Plan

Use Gemini to create:

- Task breakdown
- Timeline
- Roles
- Demo pitch

### Step 8: Close with Impact

> Kampus Konnect AI does not just help students meet people. It helps them form better teams, build better projects, and create opportunities together.

---

## Devpost Submission Summary

### Inspiration

Students often struggle to find the right people to collaborate with. During hackathons, school projects, and learning programs, many students either work alone or join poorly matched teams. We wanted to make student collaboration smarter and more intentional.

### What It Does

Kampus Konnect AI helps students find teammates, mentors, study partners, and project collaborators based on skills, interests, goals, availability, and project needs. The platform uses AI to explain why each match is relevant and can generate project ideas, collaboration plans, team roles, and pitch summaries.

### How We Built It

The platform can be built with Next.js, React, TypeScript, Tailwind CSS, Supabase, and Gemini API. The frontend provides onboarding, dashboard, match cards, team builder, and AI planner pages. Gemini powers match explanations, project ideas, first-message suggestions, and collaboration plans.

### How Gemini API Was Used

Gemini API is used to understand student profiles, explain compatibility between users, generate relevant project ideas, create collaboration plans, and assist teams with pitch preparation.

### Challenges

The biggest challenge is making AI recommendations feel useful, explainable, and fair. We designed the matching system to combine structured scoring with AI-generated explanations.

### Accomplishments

We created a product concept that directly supports meaningful student connection and collaboration. The system helps users move from finding people to actually building something together.

### What Is Next

Next steps include real-time chat, mentor verification, school organization tools, team invites, and analytics for campus communities.

---

## Success Metrics

### Product Metrics

- Number of completed student profiles
- Number of matches generated
- Number of connection requests sent
- Number of teams created
- Number of AI collaboration plans generated
- Percentage of users who complete onboarding

### Quality Metrics

- Match acceptance rate
- User satisfaction with AI explanations
- Number of successful team formations
- Repeat usage rate

### Hackathon Metrics

- Working prototype completeness
- Quality of AI integration
- Clarity of demo
- Visual polish
- Real-world relevance

---

## Engineering Principles

This project should follow these engineering principles:

1. Build the simplest version that clearly proves the concept.
2. Keep AI outputs structured and predictable.
3. Never expose secret keys in the browser.
4. Keep components reusable and well-named.
5. Prioritize demo reliability over unnecessary complexity.
6. Use sample data where needed to guarantee a smooth hackathon demo.
7. Make all AI features easy to understand visually.
8. Keep user flows short and intuitive.
9. Design for mobile first.
10. Treat privacy and consent as core product features.

---

## Copilot Implementation Guidance

When generating code for this project, prioritize:

- Clean TypeScript types
- Modular React components
- Reusable UI cards
- Server-side AI API calls
- Clear loading states
- Graceful error handling
- Sample seed data
- Mobile responsiveness
- Production-friendly file organization
- Secure environment variable usage

Do not build a generic chatbot.

The AI should appear in specific product moments:

- Explaining matches
- Generating project ideas
- Creating team plans
- Helping users start conversations
- Preparing pitch content

The product experience should feel like a smart student collaboration platform, not just an AI chat interface.

---

## Recommended MVP Screens for Copilot to Build First

1. Landing page
2. Onboarding form
3. Dashboard
4. Match recommendations page
5. AI project idea generator
6. Team collaboration planner

---

## Sample Seed Users

Use these sample profiles for demo purposes.

```ts
const sampleProfiles = [
  {
    fullName: "Aisha Bello",
    school: "University of Abuja",
    skillLevel: "intermediate",
    skills: ["UI/UX Design", "Research", "Presentation"],
    interests: ["Education", "Student Productivity", "Social Impact"],
    goals: ["Join a hackathon team", "Build portfolio projects"],
    availability: ["Saturday evening", "Sunday afternoon"],
  },
  {
    fullName: "David Okafor",
    school: "Baze University",
    skillLevel: "advanced",
    skills: ["Backend Development", "Database Design", "API Integration"],
    interests: ["FinTech", "AI Tools", "Productivity"],
    goals: ["Build scalable apps", "Mentor beginners"],
    availability: ["Weekday evenings", "Saturday morning"],
  },
  {
    fullName: "Zainab Musa",
    school: "Nile University",
    skillLevel: "beginner",
    skills: ["Frontend Development", "Content Writing"],
    interests: ["Education", "Scholarships", "Community"],
    goals: ["Find a project team", "Improve coding skills"],
    availability: ["Friday evening", "Saturday afternoon"],
  },
  {
    fullName: "Emeka Nwosu",
    school: "Veritas University",
    skillLevel: "intermediate",
    skills: ["Mobile Development", "Firebase", "Pitching"],
    interests: ["HealthTech", "Student Life", "AI"],
    goals: ["Build a hackathon MVP", "Find a designer"],
    availability: ["Saturday", "Sunday"],
  },
];
```

---

## Final Product Statement

Kampus Konnect AI is built on a simple belief:

> Students do not just need more contacts. They need the right connections, the right team, and the right plan to create something meaningful.

This platform turns student networking into intelligent collaboration.

