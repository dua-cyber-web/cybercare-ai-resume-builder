CyberCare AI — AI Resume & Cover Letter Builder

AI-powered resume and cover-letter builder using OpenRouter API.

Setup

1. Install Node.js 18+.

2. Create an OpenRouter API key.

3. Copy `.env.example` to `.env`.

4. Add your OpenRouter API key to `.env`:

OPENROUTER_API_KEY=your_openrouter_api_key_here

5. Optional: change the model in `.env`:

OPENROUTER_MODEL=openrouter/free

6. Open Command Prompt in this folder and run:

npm install
npm start

7. Open:

http://localhost:3000

Important

Never paste your API key into the frontend or share it publicly.

Keep your `.env` file private. It is excluded from Git using `.gitignore`.

The application uses a server-side API request so the API key remains protected.
