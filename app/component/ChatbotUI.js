"use client";
import React, { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../utils/chatbot/chatbot";
import { useTheme } from "next-themes";
import '../styles/chatbot.css'; 

export default function ChatbotUI() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  
  const chatbotRef = useRef(null); 

  useEffect(() => {
    // Menyesuaikan tema yang sudah diterapkan
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const aiResponse = await sendMessageToAI(input);
      const botMessage = { text: aiResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error contacting AI.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chatbot-container chatbot-title" ref={chatbotRef}>
      {isOpen ? (
        <div className="chatbot-box chatbot-title">
          <div className="chatbot-messages chatbot-title">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "user" ? "message user" : "message bot"}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbot-input chatbot-title">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
          <button className="chatbot-close chatbot-title" onClick={() => setIsOpen(false)}>🤖</button>
        </div>
      ) : (
        <button className="chatbot-toggle chatbot-title" onClick={() => setIsOpen(true)}>
          🤖
        </button>
      )}
    </div>
  );
}
