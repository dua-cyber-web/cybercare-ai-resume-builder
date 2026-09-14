import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json({ limit: '1mb' }));

// Protect the AI endpoint from excessive requests
const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many resume generation requests. Please try again later.'
  }
});

app.use('/api/generate', generateLimiter);
app.use(express.static(__dirname));


// ===============================
// OPENROUTER CONFIGURATION
// ===============================

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || 'openrouter/free';


// ===============================
// HELPER
// ===============================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ===============================
// OPENROUTER AI FUNCTION
// ===============================

async function generateWithOpenRouter(prompt) {

  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt++) {

    try {

      console.log(
        'Trying OpenRouter model: ' +
        OPENROUTER_MODEL +
        ' | Attempt: ' +
        attempt
      );

      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'CyberCare AI Resume Builder'
          },

          body: JSON.stringify({
            model: OPENROUTER_MODEL,

            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],

            temperature: 0.4,

            max_tokens: 5000
          })
        }
      );

      const body = await response.json();

      if (response.ok) {

        const raw =
          body &&
          body.choices &&
          body.choices[0] &&
          body.choices[0].message &&
          body.choices[0].message.content
            ? body.choices[0].message.content
            : '';

        if (!raw) {
          throw new Error(
            'OpenRouter returned an empty response.'
          );
        }

        // Remove possible markdown JSON fences
        const cleaned = raw
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();

        return JSON.parse(cleaned);
      }


      const message =
        body &&
        body.error &&
        body.error.message
          ? body.error.message
          : 'OpenRouter API request failed.';

      console.error(
        'OpenRouter API error (' +
        response.status +
        '):',
        message
      );

      lastError = new Error(message);


      // Retry temporary errors
      if (
        response.status === 429 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504
      ) {

        if (attempt < 3) {

          console.log(
            'Temporary OpenRouter error. Retrying...'
          );

          await sleep(2000 * attempt);

          continue;
        }
      }

      throw lastError;

    } catch (error) {

      lastError = error;

      console.error(
        'OpenRouter request failed:',
        error.message
      );

      if (attempt < 3) {
        await sleep(1500 * attempt);
      }
    }
  }

  throw lastError ||
    new Error('OpenRouter request failed.');
}


// ===============================
// GENERATE RESUME
// ===============================

app.post('/api/generate', async (req, res) => {

  const {
    name,
    job,
    level,
    skills,
    education,
    certs,
    experience,
    projects,
    jd
  } = req.body || {};


  // Required fields
  if (!job || !skills || !jd) {

    return res.status(400).json({
      error:
        'Job title, skills, and job description are required.'
    });

  }


  // Check OpenRouter connection
  if (!OPENROUTER_API_KEY) {

    return res.status(503).json({
      error:
        'AI is not connected yet. Add OPENROUTER_API_KEY to .env and restart the server.'
    });

  }


  // ===============================
  // AI PROMPT
  // ===============================

  const prompt = `
You are CyberCare AI, an expert cybersecurity career writer
and ATS resume strategist.

Create a truthful, professional and job-tailored application.

IMPORTANT RULES:

1. Never invent employers.
2. Never invent dates.
3. Never invent degrees.
4. Never invent certifications.
5. Never invent tools the candidate did not provide.
6. Never invent achievements or statistics.
7. If information is missing, use a placeholder.
8. Optimize the resume for ATS.
9. Keep the writing professional and concise.
10. Match the job description carefully.

CANDIDATE

Name:
${name || 'Not provided'}

Target role:
${job}

Level:
${level || 'Entry Level'}

Skills:
${skills}

Education:
${education || 'Not provided'}

Certifications:
${certs || 'Not provided'}

Experience:
${experience || 'Not provided'}

Projects:
${projects || 'Not provided'}


JOB DESCRIPTION

${jd}


Return ONLY valid JSON.

Use exactly these keys:

{
  "summary": "string",
  "skills": [],
  "experience_bullets": [],
  "project_bullets": [],
  "ats_keywords": [],
  "match_score": 0,
  "matched_keywords": [],
  "missing_keywords": [],
  "suggestions": [],
  "resume": "string",
  "cover_letter": "string"
}

The resume must be ATS-friendly plain text.

Use these sections:

NAME / CONTACT

PROFESSIONAL SUMMARY

TECHNICAL SKILLS

EXPERIENCE

PROJECTS

EDUCATION

CERTIFICATIONS

Do not create fake information.

The cover letter must be concise,
professional and specifically related
to the provided job description.
`;


  // ===============================
  // CALL AI
  // ===============================

  try {

    const data =
      await generateWithOpenRouter(prompt);

    console.log(
      'Resume generated successfully.'
    );

    return res.json(data);

  } catch (error) {

    console.error(
      'All OpenRouter attempts failed:',
      error
    );

    return res.status(503).json({

      error:
        'OpenRouter is temporarily unavailable. Please try again in a few seconds.'

    });

  }

});


// ===============================
// HEALTH CHECK
// ===============================

app.get('/api/health', (req, res) => {

  res.json({

    ok: true,

    aiConnected:
      Boolean(OPENROUTER_API_KEY),

    provider:
      'OpenRouter',

    model:
      OPENROUTER_MODEL

  });

});


// ===============================
// START SERVER
// ===============================

const port =
  process.env.PORT || 3000;


app.listen(port, () => {

  console.log(
    'CyberCare AI running at http://localhost:' +
    port
  );

  console.log(
    'AI provider: OpenRouter'
  );

  console.log(
    'OpenRouter model: ' +
    OPENROUTER_MODEL
  );

});