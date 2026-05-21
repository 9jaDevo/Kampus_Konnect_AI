import type { CollaborationType } from "./profile";

export type Match = {
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

export type ScoreBreakdown = {
  skillComplementarity: number;
  sharedInterest: number;
  availability: number;
  goalAlignment: number;
  experienceBalance: number;
  total: number;
};
