import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { query } = await req.json();

    // Improved prompt for strict structure
    const prompt = `
You are a helpful recipe assistant. Suggest 3 recipes based on this user request: "${query}".
For each recipe, return a JSON object with the following structure:
{
  id: string,
  title: string,
  image: string, // a placeholder image URL
  description: string,
  ingredients: string[], // array of ingredient strings
  instructions: string[], // array of step-by-step detailed instructions 
  prepTime: string, // e.g. "20 min"
  servings: number,
  sourceUrl: string // a plausible recipe URL (can be a placeholder)
}
Respond ONLY with a JSON array of 3 such objects, no extra text.
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.75,
            max_tokens: 1100,
        }),
    });

    const data = await openaiRes.json();
    let recipes: any[] = [];
    try {
        const text = data.choices[0].message.content;
        recipes = JSON.parse(text);
    } catch (e) {
        return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }

    return NextResponse.json(recipes);
}