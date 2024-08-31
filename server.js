const express = require('express');
const app = express();
const port = 3000; // Choose your preferred port

// Load environment variables (API key)
require('dotenv').config();
const apiKey = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(apiKey); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Or your chosen model

// Serve static files (like your HTML, CSS, JS)
app.use(express.json())
app.use(express.static('public')); 

app.post('/generate-text', async (req, res) => {
  try {
    const userPrompt = req.body.prompt; 
    console.log('Request received at /generate-text'); // Should appear in console
    console.log('Request body:', req.body); // Check the contents of req.body
    
    if (!userPrompt) {
      return res.status(400).json({ error: 'Missing "prompt" in request body' });
    }

    const result = await model.generateContent(userPrompt);
    
    // Check if 'result' and 'result.response' exist before accessing 'text()'
    if (!result || !result.response) {
      console.error('Unexpected response structure from model:', result);
      return res.status(500).json({ error: 'Error generating text' });
    }

    const response = result.response;
    const generatedText = response.text(); 

    res.json({ generatedText }); 

  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/test', (req, res) => {
  res.send('Test route working!'); 
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
