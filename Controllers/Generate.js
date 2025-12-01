import openai from "../Config/openAI.js";
export default async function (req, res) {
  try {
    const { noteText, choices } = req.body;
    if (!noteText) {
      return res.status(400).json({ error: "No Text Provided" });
    }
    const prompt = `
      You are a strict teacher. Generate ${choices} multiple choice questions from the text below.
      Return ONLY a JSON array. Format: 
      [{ "question": "...", "options": ["A", "B", "C", "D"], "answer": "Correct Option" }]
      
      Text: ${noteText.substring(0, 3000)}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "chatgpt-4o-latest",
    });

    const rawData = completion.choices[0].message.content;
    const Quiz = JSON.parse(rawData);
    res.status(200).json({ success: true, quiz: Quiz });
  } catch (err) {
    console.error(`OpenAI Error: ${err}`);
    res.status(500).json({ error: "Something Went Wrong: " + err });
  }
}
