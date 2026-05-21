import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_PROFILES } from "@/constants/sample-profiles";
import { computeCompatibilityScore, getSharedInterests, getComplementarySkills } from "@/lib/matching/scoring";
import { StudentProfileSchema } from "@/lib/validators/profile";
import type { Match } from "@/types/match";
import type { CollaborationType, StudentProfile } from "@/types/profile";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = StudentProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid profile", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const me = parsed.data as unknown as StudentProfile;
    const matches = buildMatches(me, SAMPLE_PROFILES);
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("[matches]", error);
    return NextResponse.json({ error: "Failed to compute matches" }, { status: 500 });
  }
}

// GET returns demo matches between SAMPLE_PROFILES[0] and the rest.
export async function GET() {
  const me = SAMPLE_PROFILES[0];
  const others = SAMPLE_PROFILES.slice(1);
  const matches = buildMatches(me, others);
  return NextResponse.json({ matches });
}

function buildMatches(me: StudentProfile, others: StudentProfile[]) {
  return others
    .map((other) => {
      const breakdown = computeCompatibilityScore(me, other);
      const suggested = pickCollaborationType(me, other);
      const m: Match & { matchedProfile: StudentProfile; scoreBreakdown: typeof breakdown } = {
        id: `${me.id}-${other.id}`,
        userId: me.id,
        matchedUserId: other.id,
        compatibilityScore: breakdown.total,
        sharedInterests: getSharedInterests(me, other),
        complementarySkills: getComplementarySkills(me, other),
        aiExplanation: "",
        suggestedCollaborationType: suggested,
        createdAt: new Date().toISOString(),
        matchedProfile: other,
        scoreBreakdown: breakdown,
      };
      return m;
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

function pickCollaborationType(a: StudentProfile, b: StudentProfile): CollaborationType {
  const shared = a.collaborationTypes.find((t) => b.collaborationTypes.includes(t));
  return shared ?? "project-collaboration";
}
