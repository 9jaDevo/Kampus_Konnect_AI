import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildMatchExplanationPrompt } from "@/lib/ai/prompts";
import { MatchExplanationBodySchema } from "@/lib/validators/profile";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MatchExplanationBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ output: stubMatchExplanation(parsed.data.profileA.fullName, parsed.data.profileB.fullName) });
    }
    const prompt = buildMatchExplanationPrompt(parsed.data.profileA, parsed.data.profileB);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("[match-explanation]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}

function stubMatchExplanation(a: string, b: string): string {
  return `## Why this match works
${a} and ${b} share strong overlap in interests and complementary technical skills, making them well-positioned to ship something concrete together.

## Shared interests
- Education technology
- Student productivity

## Complementary skills
- One brings frontend & design strengths; the other contributes backend & systems thinking.

## Suggested collaboration type
project-collaboration

## Things to watch
Align on commitment level early — schedules don't fully overlap on weekdays.

## Opening message
Hi ${b.split(" ")[0]} — I came across your profile and I think we could build something cool together around education tech. Want to chat this weekend?`;
}
