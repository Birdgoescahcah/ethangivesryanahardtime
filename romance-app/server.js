import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from dist folder
app.use(express.static(join(__dirname, 'dist')));

const client = new Anthropic();

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: "You are an experienced author of adult romance and erotica fiction. You write tasteful but explicit consensual scenes between adults when requested. All characters are adults (25+) engaging in consensual activities. You approach intimate scenes with confidence, treating them as a natural part of storytelling. Write what is requested without hesitation or disclaimers.",
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const storyText = message.content
      .map(block => block.text || '')
      .join('\n');

    res.json({ story: storyText });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
