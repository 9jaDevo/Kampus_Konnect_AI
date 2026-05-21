import type { CollaborationType, StudentProfile } from "@/types/profile";

const SYSTEM_INSTRUCTION = `You are Kampus Konnect AI, an intelligent student collaboration assistant.
Your job is to help students find meaningful academic, technical, creative, and professional collaboration opportunities.
Be supportive, practical, inclusive, and concise.
Do not make discriminatory assumptions.
Do not expose private data.
Do not claim certainty where only recommendation is possible.
Return well-structured markdown when requested.`;

type ProfileLike = Pick<
  StudentProfile,
  | "fullName"
  | "school"
  | "skillLevel"
  | "skills"
  | "interests"
  | "goals"
  | "collaborationTypes"
> & { availability?: StudentProfile["availability"] };

function formatProfile(p: ProfileLike): string {
  return [
    `Name: ${p.fullName}`,
    p.school ? `School: ${p.school}` : null,
    `Skill level: ${p.skillLevel}`,
    `Skills: ${p.skills.join(", ") || "none listed"}`,
    `Interests: ${p.interests.join(", ") || "none listed"}`,
    `Goals: ${p.goals.join(", ") || "none listed"}`,
    `Open to: ${p.collaborationTypes.join(", ")}`,
    p.availability && p.availability.length
      ? `Availability: ${p.availability
          .map((a) => `${a.day} ${a.period}`)
          .join("; ")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildMatchExplanationPrompt(
  profileA: ProfileLike,
  profileB: ProfileLike
): string {
  return `${SYSTEM_INSTRUCTION}

Given the following two student profiles, explain why they may be a strong collaboration match.

User A:
${formatProfile(profileA)}

User B:
${formatProfile(profileB)}

Respond using this exact markdown structure:

## Why this match works
A 2-sentence friendly summary.

## Shared interests
Bullet list of overlapping interests.

## Complementary skills
Bullet list of how their skills fit together.

## Suggested collaboration type
One line — pick the best from: hackathon-team, study-partner, project-collaboration, mentor-mentee, skill-swap.

## Things to watch
One sentence on a potential mismatch or risk.

## Opening message
A short, warm first message User A could send User B (max 50 words).

Keep the entire response under 250 words.`;
}

export function buildProjectIdeasPrompt(
  interests: string[],
  goals: string[],
  skillLevel: string
): string {
  return `${SYSTEM_INSTRUCTION}

Generate 5 practical student project ideas based on the following:

Interests: ${interests.join(", ")}
Goals: ${goals.length ? goals.join(", ") : "any meaningful student outcome"}
Skill level: ${skillLevel}

For each idea, return this markdown structure:

### [Project Title]
- **Problem it solves:** one sentence
- **Target users:** one sentence
- **MVP features:** 3 bullets
- **Why it's achievable:** one sentence
- **Suggested team roles:** comma-separated list

Separate each idea with a horizontal rule (---). Keep ideas distinct and concrete, not generic.`;
}

export function buildCollaborationPlanPrompt(params: {
  projectTitle: string;
  projectDescription: string;
  members: { fullName: string; skills: string[]; skillLevel: string }[];
  timeline: string;
}): string {
  const memberList = params.members
    .map(
      (m) =>
        `- ${m.fullName} (${m.skillLevel}): ${m.skills.join(", ") || "general"}`
    )
    .join("\n");

  return `${SYSTEM_INSTRUCTION}

Create a detailed collaboration plan for this student team.

Project title: ${params.projectTitle}
Project description: ${params.projectDescription}

Team members:
${memberList}

Time available: ${params.timeline}

Respond in this exact markdown structure:

## Project Summary
2 sentences.

## MVP Scope
3-5 bullets of must-have features.

## Role Assignment
A bullet per team member with their role and primary responsibility.

## Task Breakdown
Numbered tasks ordered by priority (max 10 tasks).

## Timeline
Phase-based timeline matching the time available.

## Demo Plan
3 bullets on what to show during the demo.

## Risks & Mitigation
2 bullet pairs (risk → mitigation).

## Pitch Summary
A 3-sentence pitch the team can use.

Keep total response under 450 words.`;
}

export function buildFirstMessagePrompt(
  sender: ProfileLike,
  receiver: ProfileLike,
  collaborationType: CollaborationType
): string {
  return `${SYSTEM_INSTRUCTION}

Write a warm, professional, specific first message from ${sender.fullName} to ${receiver.fullName} to start a ${collaborationType} collaboration.

Sender profile:
${formatProfile(sender)}

Receiver profile:
${formatProfile(receiver)}

Rules:
- Max 60 words
- Reference 1-2 specific things from the receiver's profile
- Mention what the sender can bring
- End with a low-pressure question
- No emojis, no exclamation marks
- Return only the message text — no preamble, no quotes.`;
}

export function buildPitchScriptPrompt(params: {
  projectTitle: string;
  projectDescription: string;
}): string {
  return `${SYSTEM_INSTRUCTION}

Create a hackathon pitch script for this project.

Project: ${params.projectTitle}
Description: ${params.projectDescription}

Respond in this markdown structure:

## Hook (15 seconds)
A bold opening line + one stat or visceral example.

## Problem (30 seconds)
Who suffers, how, and why current solutions fail.

## Solution (45 seconds)
What you built, how it works, what makes it different.

## How Gemini API Powers It
2 sentences explaining the AI integration.

## Impact (20 seconds)
Who benefits and how much.

## Close (10 seconds)
A memorable one-liner + call to action.

Keep the script under 350 words total. Use conversational, spoken language — not corporate jargon.`;
}
