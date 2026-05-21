import type { CollaborationType } from "@/types/profile";

export const COLLABORATION_TYPES: {
  value: CollaborationType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "hackathon-team",
    label: "Hackathon Team",
    description: "Build something amazing in a sprint",
    icon: "Trophy",
  },
  {
    value: "study-partner",
    label: "Study Partner",
    description: "Prepare for exams or learn together",
    icon: "BookOpen",
  },
  {
    value: "project-collaboration",
    label: "Project Collaboration",
    description: "Build long-term projects together",
    icon: "Rocket",
  },
  {
    value: "mentor",
    label: "Mentor",
    description: "Share your experience with juniors",
    icon: "GraduationCap",
  },
  {
    value: "mentee",
    label: "Mentee",
    description: "Learn from someone more experienced",
    icon: "Sparkles",
  },
  {
    value: "skill-swap",
    label: "Skill Swap",
    description: "Teach what you know, learn what you don't",
    icon: "Repeat",
  },
  {
    value: "accountability-partner",
    label: "Accountability Partner",
    description: "Keep each other on track",
    icon: "Target",
  },
];
