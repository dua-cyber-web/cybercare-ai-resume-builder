# CyberCare AI — Gemini Free Tier

AI-powered cybersecurity resume and cover-letter builder using Google's Gemini API.

## Setup

1. Install Node.js 18+.
2. Create a Gemini API key in Google AI Studio.
3. Copy `.env.example` to `.env`.
4. Put your key in `.env`:

   GEMINI_API_KEY=your_key_here

5. Optional: change `GEMINI_MODEL` if needed.
6. Open Command Prompt in this folder and run:

   npm install
   npm start

7. Open http://localhost:3000

## Important

- Never paste your API key into the frontend or share it publicly.
- The Gemini free tier has usage/rate limits. It is suitable for testing and small usage, not unlimited customer traffic.
- If the selected model is unavailable on your free tier, set `GEMINI_MODEL` in `.env` to another model currently available to your Gemini API project.
