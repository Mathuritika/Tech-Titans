require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function evaluateAnswer(text) {

const prompt = `
You are an expert teacher.

Evaluate the student's answer according to the rubric.

Question 1:
Concept: 0-3
Formula: 0-2
Calculation: 0-5

Question 2:
Step1: 0-2
Step2: 0-3

Student Answer:
${text}

Return ONLY valid JSON:

{
  "concept": number,
  "formula": number,
  "calculation": number,
  "step1": number,
  "step2": number,
  "feedback": "short constructive feedback"
}

Do not return markdown.
Do not return explanation.
Do not return text outside JSON.
`;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0,
  });

  const result =
    response.choices[0].message.content;

  console.log("RAW AI RESPONSE:");
  console.log(result);

  const clean = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(clean);

// Validation
parsed.concept = Math.min(Math.max(parsed.concept || 0, 0), 3);
parsed.formula = Math.min(Math.max(parsed.formula || 0, 0), 2);
parsed.calculation = Math.min(Math.max(parsed.calculation || 0, 0), 5);
parsed.step1 = Math.min(Math.max(parsed.step1 || 0, 0), 2);
parsed.step2 = Math.min(Math.max(parsed.step2 || 0, 0), 3);

// Total Score
parsed.total =
  parsed.concept +
  parsed.formula +
  parsed.calculation +
  parsed.step1 +
  parsed.step2;

return parsed;
}

module.exports = evaluateAnswer;