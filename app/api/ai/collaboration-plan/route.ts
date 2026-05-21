import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildCollaborationPlanPrompt } from "@/lib/ai/prompts";
import { CollaborationPlanBodySchema } from "@/lib/validators/profile";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CollaborationPlanBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ output: STUB });
    }
    const prompt = buildCollaborationPlanPrompt(parsed.data);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.error("[collaboration-plan]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}

const STUB = `## Team roles
- **Lead / PM:** owns scope and timeline.
- **Backend:** API + database schema.
- **Frontend:** UI components and flows.
- **Designer:** wireframes, brand, demo polish.

## Week-by-week timeline
- **Week 1:** Scope MVP, design wireframes, set up repo.
- **Week 2:** Build core flows, integrate auth + data.
- **Week 3:** Polish UI, run user tests, prepare demo.

## Communication
- Daily async standup in chat.
- 30-min sync call every Saturday morning.

## Demo plan
1. 30-sec problem framing.
2. Live walkthrough of the happy path.
3. One AI moment that shows the magic.
4. Close with metrics + next steps.

## Risks
- Scope creep — lock the MVP in week 1.
- Time-zone overlap — pre-schedule the syncs now.`;
