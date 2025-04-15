import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateGeminiResponse = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Try the simplest model name
  const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 

  try {
    const result = await model.generateContent(prompt);
    return await result.response.text();
  } catch (error) {
    console.error("Error while generating response:", error);
    return "Sorry, something went wrong.";
  }
};