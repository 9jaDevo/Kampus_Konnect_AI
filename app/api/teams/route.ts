import { NextResponse } from "next/server";
import type { Team } from "@/types/team";
import { SAMPLE_PROFILES } from "@/constants/sample-profiles";

export const runtime = "nodejs";

const DEMO_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "EduSpark",
    projectTitle: "AI Scholarship Tracker",
    projectDescription:
      "Centralizes scholarship deadlines and uses AI to surface a personalized shortlist per student.",
    ownerId: SAMPLE_PROFILES[0].id,
    memberIds: [SAMPLE_PROFILES[0].id, SAMPLE_PROFILES[1].id, SAMPLE_PROFILES[2].id],
    requiredRoles: ["Frontend Developer", "Designer", "Content Writer"],
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-2",
    name: "PulsePeer",
    projectTitle: "Campus Mental Health Companion",
    projectDescription:
      "Anonymous peer check-ins with mood tracking and supportive nudges.",
    ownerId: SAMPLE_PROFILES[3].id,
    memberIds: [SAMPLE_PROFILES[3].id, SAMPLE_PROFILES[4].id],
    requiredRoles: ["Backend", "Mobile Developer"],
    status: "forming",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ teams: DEMO_TEAMS });
}
