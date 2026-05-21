import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/ai/gemini";
import { buildProjectIdeasPrompt } from "@/lib/ai/prompts";
import { ProjectIdeasBodySchema } from "@/lib/validators/profile";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProjectIdeasBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ output: STUB_IDEAS });
    }
    const prompt = buildProjectIdeasPrompt(parsed.data.interests, parsed.data.goals ?? [], parsed.data.skillLevel);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.error("[project-ideas]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}

const STUB_IDEAS = `### Scholarship Tracker
- **Problem it solves:** Students miss application deadlines.
- **Target users:** Undergraduates seeking funding.
- **MVP features:** Deadline calendar, eligibility filter, email reminders.
- **Why it's achievable:** Public data + simple CRUD UI.
- **Suggested team roles:** frontend, backend, content curator.

---

### AI Study Group Finder
- **Problem it solves:** Hard to find peers studying the same topic.
- **Target users:** Course-based study groups.
- **MVP features:** Course tags, schedule overlap, group chat.
- **Why it's achievable:** Can ship MVP with auth + simple matching.
- **Suggested team roles:** frontend, backend, designer.

---

### Campus Lost & Found
- **Problem it solves:** Items lost on campus rarely return.
- **Target users:** Students + campus security.
- **MVP features:** Photo upload, location tag, claim flow.
- **Why it's achievable:** Standard mobile-first form workflow.
- **Suggested team roles:** mobile dev, designer, ops lead.

---

### Skill-Swap Marketplace
- **Problem it solves:** Students want to learn but can't always pay tutors.
- **Target users:** Peer learners.
- **MVP features:** Profile skills, request swap, schedule.
- **Why it's achievable:** Profile + matching + chat.
- **Suggested team roles:** fullstack, designer, growth.

---

### Project Pulse
- **Problem it solves:** Student teams stall mid-project.
- **Target users:** Hackathon and class teams.
- **MVP features:** Weekly check-ins, task board, AI nudges.
- **Why it's achievable:** Reuses task-app patterns + Gemini.
- **Suggested team roles:** PM, backend, frontend.`;
