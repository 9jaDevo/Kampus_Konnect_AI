import type {
  AvailabilitySlot,
  SkillLevel,
  StudentProfile,
} from "@/types/profile";
import type { ScoreBreakdown } from "@/types/match";

type MatchableProfile = Pick<
  StudentProfile,
  "skills" | "interests" | "goals" | "availability" | "skillLevel"
>;

function overlap<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b.map((x) => String(x).toLowerCase()));
  return a.filter((x) => setB.has(String(x).toLowerCase()));
}

function skillComplementarityScore(a: MatchableProfile, b: MatchableProfile) {
  const shared = overlap(a.skills, b.skills).length;
  const uniqueA = a.skills.length - shared;
  const uniqueB = b.skills.length - shared;
  const complementary = uniqueA + uniqueB;
  const totalPool = Math.max(a.skills.length + b.skills.length, 1);
  // Reward complementarity (different skills) more than overlap.
  const raw = (complementary * 1.0 + shared * 0.5) / totalPool;
  return Math.min(100, raw * 110);
}

function sharedInterestScore(a: MatchableProfile, b: MatchableProfile) {
  const sharedCount = overlap(a.interests, b.interests).length;
  if (sharedCount === 0) return 10;
  const denom = Math.max(Math.min(a.interests.length, b.interests.length), 1);
  return Math.min(100, (sharedCount / denom) * 100 + 15);
}

function slotKey(s: AvailabilitySlot) {
  return `${s.day}-${s.period}`;
}

function availabilityScore(a: MatchableProfile, b: MatchableProfile) {
  if (!a.availability.length || !b.availability.length) return 50;
  const setB = new Set(b.availability.map(slotKey));
  const overlapCount = a.availability.filter((s) => setB.has(slotKey(s))).length;
  if (overlapCount === 0) return 20;
  const max = Math.max(a.availability.length, b.availability.length);
  return Math.min(100, (overlapCount / max) * 100 + 20);
}

const STOPWORDS = new Set([
  "to",
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "for",
  "in",
  "on",
  "with",
  "my",
  "i",
  "want",
  "build",
  "find",
  "join",
  "get",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function goalAlignmentScore(a: MatchableProfile, b: MatchableProfile) {
  const tokA = new Set(a.goals.flatMap(tokenize));
  const tokB = new Set(b.goals.flatMap(tokenize));
  if (tokA.size === 0 || tokB.size === 0) return 40;
  let shared = 0;
  for (const t of tokA) if (tokB.has(t)) shared++;
  const denom = Math.max(Math.min(tokA.size, tokB.size), 1);
  return Math.min(100, (shared / denom) * 100 + 10);
}

const LEVEL_PAIR_SCORES: Record<string, number> = {
  "beginner-beginner": 70,
  "beginner-intermediate": 80,
  "intermediate-beginner": 80,
  "intermediate-intermediate": 75,
  "beginner-advanced": 65,
  "advanced-beginner": 65,
  "intermediate-advanced": 90,
  "advanced-intermediate": 90,
  "advanced-advanced": 75,
};

function experienceBalanceScore(a: SkillLevel, b: SkillLevel): number {
  return LEVEL_PAIR_SCORES[`${a}-${b}`] ?? 70;
}

export function computeCompatibilityScore(
  a: MatchableProfile,
  b: MatchableProfile
): ScoreBreakdown {
  const skill = skillComplementarityScore(a, b);
  const interest = sharedInterestScore(a, b);
  const avail = availabilityScore(a, b);
  const goal = goalAlignmentScore(a, b);
  const exp = experienceBalanceScore(a.skillLevel, b.skillLevel);

  const total =
    skill * 0.3 + interest * 0.2 + avail * 0.2 + goal * 0.2 + exp * 0.1;

  return {
    skillComplementarity: Math.round(skill),
    sharedInterest: Math.round(interest),
    availability: Math.round(avail),
    goalAlignment: Math.round(goal),
    experienceBalance: Math.round(exp),
    total: Math.round(total),
  };
}

export function getSharedInterests(
  a: MatchableProfile,
  b: MatchableProfile
): string[] {
  return overlap(a.interests, b.interests);
}

export function getComplementarySkills(
  a: MatchableProfile,
  b: MatchableProfile
): string[] {
  const setA = new Set(a.skills.map((s) => s.toLowerCase()));
  return b.skills.filter((s) => !setA.has(s.toLowerCase()));
}
