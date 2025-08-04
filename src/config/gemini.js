// src/config/gemini.js
import {
  GoogleGenAI,
} from '@google/genai';

const GEMINI_API_KEY = "AIzaSyBvc6zn3FjCIBzD4iK6z04WbRVYBoVhlYI";

// Your models should be specified with full resource name, update accordingly
// const MODEL_NAME = "projects/your-project-id/locations/your-location/models/chat-bison"; // replace with your actual project and location

// Example chat function
async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  // const model = new GoogleGenAI.GenerativeModel({ model: MODEL_NAME });
  
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash', // replace with your actual model name
    contents,
    // temperature: 0.2, // Adjust temperature as needed
    // maxOutputTokens: 1024, // Adjust max output tokens as needed
  });

  let responseText = '';
  for await (const chunk of response) {
    console.log(chunk.text);
    responseText += chunk.text;
  }
  return responseText;
}

// Optional: List models function
// export async function listModels() {
//   const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
//   try {
//     const models = await ai.listModels();
//     console.log('Available models:', models);
//     return models;
//   } catch (err) {
//     console.error('Error listing models:', err);
//   }
// }

// Export the runChat function as default
export default runChat;