import openai from "../Config/openAI.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function (req, res) {
  try {
    const { noteText, choices } = req.body;
    if (!noteText) {
      return res.status(400).json({ error: "No Text Provided" });
    }
    const prompt = `
      You are a strict teacher. Generate ${
        choices || 5
      } multiple choice questions from the text below.
      
      CRITICAL INSTRUCTIONS:
      1. Return ONLY a JSON array. No markdown, no "Here is the quiz".
      2. Keep all options CONCISE (under 10 words each).
      3. Format: [{ "question": "...", "options": ["Option1", "Option2", "Option3", "Option4"], "answer": "Exact String of Correct Option" }]
      
      Text: ${noteText.substring(0, 3000)}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o-mini",
    });

    const rawData = completion.choices[0].message.content;
    const Quiz = JSON.parse(rawData);
    Quiz.forEach((q) => {
      shuffleArray(q.options);
    });
    res.status(200).json({ success: true, quiz: Quiz });
  } catch (err) {
    console.error(`OpenAI Error: ${err}`);
    res.status(500).json({ error: "Something Went Wrong: " + err });
  }
}
