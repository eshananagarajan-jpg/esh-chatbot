import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use Gemini to generate response
    const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });
    const result = await model.generateContent(message);
    const botResponse = result.response.text();

    res.json({ bot: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again.',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 Chatbot API running on http://localhost:${PORT}`);
});