// test-gemini.js
import { GoogleGenAI } from "@google/genai";

// Load API key dari environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash", // atau "gemini-2.5-pro" kalau kamu punya akses
    contents: "Jelaskan bagaimana AI bekerja secara singkat",
  });

  console.log(result.text);
}

main();
