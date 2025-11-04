import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import status from "../../../../utils/status";

export async function POST(req) {
  const text = await req.json();

  if (!text) {
    return NextResponse.json({ message: "" }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You're a smart, cheerful, and human-like assistant.but does not use emoji .
Always reply in a friendly and polite tone — as if you're smiling and talking warmly. 
Keep the answers short, sweet, and clear — ideally 1 to 2 lines if posible then answer in 2-3 word.
Imagine your words are being spoken aloud using a voice, so it should sound smooth and pleasant, like you're chatting with a friend.

You can even add light humor, a positive vibe, or a little laugh when appropriate. 
Never sound robotic or too formal. Just natural, happy, and human.

Now, here's my question:`,
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
    });
    const res = response.text;
    return NextResponse.json({ text: res }, { status: status.OK.code });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
