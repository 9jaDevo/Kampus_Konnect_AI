import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildPitchScriptPrompt } from "@/lib/ai/prompts";
import { PitchScriptBodySchema } from "@/lib/validators/profile";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PitchScriptBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ output: STUB(parsed.data.projectTitle) });
    }
    const prompt = buildPitchScriptPrompt(parsed.data);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.error("[pitch-script]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}

const STUB = (title: string) => `## Hook (15 sec)
Every semester, students waste hours hunting for teammates and ideas. We fixed that.

## Problem (30 sec)
Student collaboration is broken — random group chats, mismatched skills, dead projects.

## Solution (45 sec)
${title} uses AI to match students by skills, goals, and availability — then generates a plan to ship together.

## Demo moment
Watch this — one click and Gemini explains why two strangers are a perfect team.

## Impact
500+ students. 50+ teams formed. 4.9★ rating.

## Ask
We're looking for school partnerships and your support.`;
