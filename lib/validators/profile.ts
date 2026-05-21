import { z } from "zod";

export const DayOfWeekSchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const PeriodSchema = z.enum(["morning", "afternoon", "evening", "night"]);

export const AvailabilitySlotSchema = z.object({
  day: DayOfWeekSchema,
  period: PeriodSchema,
});

export const CollaborationTypeSchema = z.enum([
  "hackathon-team",
  "study-partner",
  "project-collaboration",
  "mentor",
  "mentee",
  "skill-swap",
  "accountability-partner",
]);

export const SkillLevelSchema = z.enum(["beginner", "intermediate", "advanced"]);

export const StudentProfileSchema = z.object({
  fullName: z.string().min(2).max(80),
  school: z.string().max(120).optional(),
  courseOfStudy: z.string().max(120).optional(),
  bio: z.string().max(400).optional(),
  skillLevel: SkillLevelSchema,
  skills: z.array(z.string().min(1).max(60)).min(1).max(20),
  interests: z.array(z.string().min(1).max(60)).min(1).max(20),
  goals: z.array(z.string().min(1).max(120)).min(1).max(10),
  collaborationTypes: z.array(CollaborationTypeSchema).min(1).max(7),
  availability: z.array(AvailabilitySlotSchema).max(28),
  communicationPreference: z
    .enum(["chat", "video", "email", "in-person", "flexible"])
    .optional(),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
});

export type StudentProfileInput = z.infer<typeof StudentProfileSchema>;

// AI route schemas

export const ProfileMinimalSchema = z.object({
  fullName: z.string().min(1),
  school: z.string().optional(),
  skillLevel: SkillLevelSchema,
  skills: z.array(z.string()).max(20),
  interests: z.array(z.string()).max(20),
  goals: z.array(z.string()).max(10),
  collaborationTypes: z.array(CollaborationTypeSchema).max(7),
  availability: z.array(AvailabilitySlotSchema).max(28).optional(),
});

export const MatchExplanationBodySchema = z.object({
  profileA: ProfileMinimalSchema,
  profileB: ProfileMinimalSchema,
});

export const ProjectIdeasBodySchema = z.object({
  interests: z.array(z.string()).min(1).max(20),
  goals: z.array(z.string()).max(10).optional(),
  skillLevel: SkillLevelSchema,
});

export const CollaborationPlanBodySchema = z.object({
  projectTitle: z.string().min(2).max(120),
  projectDescription: z.string().min(10).max(1000),
  members: z
    .array(
      z.object({
        fullName: z.string(),
        skills: z.array(z.string()),
        skillLevel: SkillLevelSchema,
      })
    )
    .min(1)
    .max(10),
  timeline: z.string().min(2).max(120),
});

export const FirstMessageBodySchema = z.object({
  sender: ProfileMinimalSchema,
  receiver: ProfileMinimalSchema,
  collaborationType: CollaborationTypeSchema,
});

export const PitchScriptBodySchema = z.object({
  projectTitle: z.string().min(2).max(120),
  projectDescription: z.string().min(10).max(1000),
});
