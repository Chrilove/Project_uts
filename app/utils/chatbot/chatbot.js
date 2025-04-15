// app/utils/chatbot/chatbot.js
export async function sendMessageToAI(prompt) {
  try {
    // Here's the problem - we're using the prompt parameter correctly
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }), // Use the prompt parameter passed into the function
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error;
  }
}