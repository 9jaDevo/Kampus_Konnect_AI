import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildFirstMessagePrompt } from "@/lib/ai/prompts";
import { FirstMessageBodySchema } from "@/lib/validators/profile";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FirstMessageBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      const receiver = parsed.data.receiver.fullName.split(" ")[0];
      return NextResponse.json({
        output: `Hi ${receiver}! I noticed we share interests in ${parsed.data.receiver.interests.slice(0, 2).join(" and ")}. I'm working on a ${parsed.data.collaborationType.replace("-", " ")} and would love to chat about teaming up. Free this weekend?`,
      });
    }
    const prompt = buildFirstMessagePrompt(
      parsed.data.sender,
      parsed.data.receiver,
      parsed.data.collaborationType
    );
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.error("[first-message]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
