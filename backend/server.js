import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main model first, backup model second
const MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function askGroq(model, message) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    const err = new Error(`Groq error ${response.status}`);
    err.status = response.status;
    throw err;
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Try each model 2 times before giving up
async function getReply(message) {
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        return await askGroq(model, message);
      } catch (error) {
        console.error(`Model ${model}, attempt ${attempt} failed:`, error.message);
        if (error.status === 401) throw error; // wrong key, retry is useless
        await sleep(1000);
      }
    }
  }
  throw new Error('All models failed');
}

app.get('/', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const botResponse = await getReply(message);
    res.json({ bot: botResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(503).json({
      bot: 'Sorry, the AI is busy right now. Please try again in a few seconds.',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Chatbot API running on http://localhost:${PORT}`);
});