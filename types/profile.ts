export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type CollaborationType =
  | "hackathon-team"
  | "study-partner"
  | "project-collaboration"
  | "mentor"
  | "mentee"
  | "skill-swap"
  | "accountability-partner";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Period = "morning" | "afternoon" | "evening" | "night";

export type AvailabilitySlot = {
  day: DayOfWeek;
  period: Period;
};

export type CommunicationPreference =
  | "chat"
  | "video"
  | "email"
  | "in-person"
  | "flexible";

export type StudentProfile = {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  school?: string;
  courseOfStudy?: string;
  bio?: string;
  skillLevel: SkillLevel;
  skills: string[];
  interests: string[];
  goals: string[];
  collaborationTypes: CollaborationType[];
  availability: AvailabilitySlot[];
  communicationPreference?: CommunicationPreference;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
};
