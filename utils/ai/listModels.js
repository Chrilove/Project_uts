import 'dotenv/config';
import fetch from 'node-fetch';

const apiKey = process.env.GEMINI_API_KEY;

// Tambahan untuk debug
console.log("API Key:", apiKey);

async function listModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
  const data = await response.json();

  if (data.models) {
    console.log('Available models:');
    data.models.forEach((model) => {
      console.log(`- ${model.name}`);
    });
  } else {
    console.error('Error:', data);
  }
}

listModels();
