import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});


export async function POST(req) {
  const {
    job_description,
    company,
    interview_style,
    position,
    difficulty_level,
    experience
  } = await req.json();

  console.log(
    company,
    interview_style,
    position,
    difficulty_level,
    experience)

  // Keep a simple in-memory session history (you can move this to DB or Redis later)
  let chatHistory = [
    {
      role: 'model',
      parts: [
        {
          text: `
          ### 🎯 Prompt: Generate 10 Diverse Interview Questions

You are an AI interview assistant. Based on the job_description,
**company**,
**interview style**,
**difficulty level**,
**position**,
**job_description**,
**experience**
 generate a set of **10 diverse technical interview questions**.

---

#### 📝 Input
- **company**: {{${company}}},
**interview style**: {{${interview_style}}},
**difficulty level**: {{${difficulty_level}}},
**position**: {{${position}}},
**job_description**: {{${job_description}}},
**experience**: {{${experience}}},

---

#### ✅ Output Guidelines

- **Total Questions:** 10  
- **Coverage:** Include a mix of the following:
  1. Conceptual questions (definitions, theory)
  2. Practical usage (real-world scenarios)
  3. Code behavior analysis (what will this do?)
  4. Debugging/thinking questions (find the bug or fix)
  5. Trade-offs & best practices
  6. Performance-related questions (if applicable)
  7. Advanced/edge-case questions (for hard level)
  8. Comparison-based questions (e.g., X vs Y)
  9. Common mistakes or misconceptions
  10. Design/system-level thinking (if relevant)

---

#### ✍️ Format

Return only the list of questions as plain text, numbered 1 to 10.  
Do **not** include answers unless explicitly asked.

---

#### 🌟 Notes

- Keep questions concise and clear.
- Match difficulty level with depth and scope.
- Avoid repetitive phrasing and topics (follow DRY).

---

#### 💡 Example

**company**: Google,
**interview style**: Technical,
**difficulty level**: Medium,
**position**: Frontend developer,
**job_description**: This is a position for front end developer with 4+ years of experience,
**experience**: Mid Senior 

✅ The 10 questions should include things like:
- Controlled vs uncontrolled
- useEffect edge cases
- Virtual DOM behavior
- Lifting state up
- Memoization strategies
- Props drilling vs context
- etc.


        `,
        },
      ],
    },
  ];

  // Add user input to conversation history
  // chatHistory.push({
  //   role: 'user',
  //   parts: [{ text: input }],
  // });

  const result = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash',
    contents: chatHistory,
  });

  const encoder = new TextEncoder();
  let responseText = '';
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of result) {
        const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          responseText += text;
          controller.enqueue(encoder.encode(text));
        }
      }
      chatHistory.push({
        role: 'model',
        parts: [{ text: responseText }],
      });
      controller.close();
    }
  });


  console.log("responseText", responseText)

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });

}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
