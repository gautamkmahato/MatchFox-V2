
import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});


export async function POST(req) {
  const { conversations } = await req.json();

  console.log(conversations)

  // Keep a simple in-memory session history (you can move this to DB or Redis later)
  let chatHistory = [
    {
      role: 'model',
      parts: [
        {
          text: `### Interview Transcript

The following is a structured array of messages between the candidate and the interviewer. Use this conversation to evaluate the candidate:

${JSON.stringify(conversations, null, 2)}


---

### 14. **Candidate Feedback Summary (Internal Use)**

> **Instructions:**
> Based on the conversation above, generate a complete interview evaluation report.
> Follow the rubric and format strictly.
> Return output in **valid JSON only**. Do not include markdown or explanations.

---

#### **Skill Evaluation Rubric**

| Category                 | Rating (1–5) | Notes                                                      |
| ------------------------ | ------------ | ---------------------------------------------------------- |
| Technical Knowledge      |              | (Understanding of topic, accuracy, completeness)           |
| Communication            |              | (Clarity, structure, confidence, terminology)              |
| Problem Solving Approach |              | (Logic, reasoning, explanation style)                      |
| Confidence & Composure   |              | (Calmness, honesty, attitude)                              |
| Best Practices & Style   |              | (Standards, patterns, cleanliness of thought)              |

---

#### **Overall Summary (2–3 lines)**

Provide a brief summary of the candidate's overall performance, style, and impression in 2–3 lines.

---

#### **Reasons for Selection or Rejection (8–10 Bullet Points)**

List up to 10 concise reasons that justify either selecting or rejecting the candidate.
Keep each point short and specific to the candidate's performance.

---

#### **Final Verdict (Internal Use)**
Give score out of 10 and give recommendation (YES or NO)
> \`\`\`json
> {
>   "recommendation": "YES" // or "NO",
>   "score": "8"  // give score out of 10
> }
> \`\`\`

> This section is **internal only** and should reflect the final decision.
> Do not repeat full notes here—only the final YES or NO.

Output Format Example: 
{
  "skill_evaluation": {
    "technical_knowledge": {
      "rating": "",
      "notes": ""
    },
    "communication": {
      "rating": "",
      "notes": ""
    },
    "problem_solving_approach": {
      "rating": "",
      "notes": ""
    },
    "confidence_composure": {
      "rating": "",
      "notes": ""
    },
    "best_practices_style": {
      "rating": "",
      "notes": ""
    }
  },
  "overall_summary": "",
  "reasons": [
  ],
  "final_verdict": {
    "recommendation": "",
    "score": ""
  }
}


**Note**: Strictly follow this output format, dont generate any additional character/string/object/array

`
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
