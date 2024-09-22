const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Load environment variables
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 

export default async function handler(req, res) { 
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res.status(400).json({ error: 'Missing "prompt" in request body' });
    }

    const result = await model.generateContent(userPrompt);
    if (!result || !result.response) {
      console.error('Unexpected response structure from model:', result);
      return res.status(500).json({ error: 'Error generating text' });
    }

    const generatedText = result.response.text(); 
    res.status(200).json({ generatedText });

  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
