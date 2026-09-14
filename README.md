# CyberCare AI — Resume & Cover Letter Builder

An AI-powered **Resume & Cover Letter Builder** designed to help students, graduates, and job seekers create professional, ATS-friendly resumes and tailored cover letters based on their target job description.

🚀 **Live Demo:**
https://cybercare-ai-resume-builder.cybercare-ai-resume-builder.workers.dev

---

## ✨ Features

* 🤖 AI-powered resume generation
* 📝 Personalized cover letter generation
* 🎯 Job-description-based resume tailoring
* 📊 ATS keyword matching
* 📈 Resume match score
* 🔍 Matched and missing keyword analysis
* 💡 Resume improvement suggestions
* 📄 Multiple professional resume templates
* 🖨️ Print / Save Resume as PDF
* 📥 Download resume as TXT
* 🎓 Education and certification sections
* 💼 Experience and project sections
* 🔐 Server-side API key protection
* ⚡ Cloudflare Workers deployment
* 📱 Responsive web interface

---

## 🧠 How It Works

CyberCare AI takes the candidate's information and target job description and uses AI to generate a tailored application.

### Workflow


Candidate Information
        ↓
Target Job Description
        ↓
CyberCare AI
        ↓
OpenRouter AI
        ↓
ATS Analysis
        ↓
Resume + Cover Letter
        ↓
Keyword Match & Suggestions


The system analyzes the provided job description and helps align the resume with relevant skills and keywords without intentionally inventing candidate experience, education, certifications, or achievements.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* Hono

### AI

* OpenRouter API
* Configurable OpenRouter model
* Default model: `openrouter/free`

### Deployment

* Cloudflare Workers
* Cloudflare Workers Static Assets

### Development Tools

* npm
* Wrangler CLI
* Git
* GitHub

📂 Project Structure


cybercare-ai-resume-builder/
│
├── public/
│   └── index.html
│
├── index.html
├── server.js
├── worker.js
├── wrangler.jsonc
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

For local development, create a `.env` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
```

### Important Security Note

**Never commit `.env` to GitHub.**

The project uses `.gitignore` to prevent sensitive environment variables from being uploaded.

For the Cloudflare deployment, the OpenRouter API key is stored as a **Cloudflare Worker Secret** rather than being exposed in the frontend.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/dua-cyber-web/cybercare-ai-resume-builder.git
```

### 2. Enter the project directory

```bash
cd cybercare-ai-resume-builder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your `.env` file

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
```

### 5. Start the application

```bash
npm start
```

The local application will be available at:

```text
http://localhost:3000
```

---

## ☁️ Cloudflare Workers Deployment

The project can be deployed using Wrangler.

### Login to Cloudflare

```bash
npx wrangler login
```

### Add the OpenRouter secret

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

When prompted, enter your OpenRouter API key.

### Deploy

```bash
npx wrangler deploy
```

Cloudflare Workers hosts the backend API while Cloudflare Static Assets serves the frontend.

---

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "ok": true,
  "aiConnected": true,
  "provider": "OpenRouter",
  "model": "openrouter/free"
}
```

### Generate Resume

```http
POST /api/generate
```

The endpoint accepts candidate information and a target job description.

Example request:

```json
{
  "name": "John Doe",
  "job": "SOC Analyst",
  "level": "Entry Level",
  "skills": "SIEM, Linux, Networking, Python",
  "education": "BS Cyber Security",
  "certs": "Security+",
  "experience": "SOC internship",
  "projects": "Threat detection project",
  "jd": "SOC Analyst job description..."
}
```

The API returns generated resume content, cover letter content, ATS keywords, match score, missing keywords, and improvement suggestions.

---

## 📊 ATS Analysis

CyberCare AI provides several job-matching insights, including:

* Overall match score
* Matched keywords
* Missing keywords
* Suggested improvements
* Job-specific resume content

This helps users understand how closely their resume aligns with a particular job description.

---

## 🎨 Resume Templates

The application supports multiple resume styles, including:

* Classic
* Modern
* Cybersecurity
* Executive
* Minimal
* Creative Portfolio
* Timeline Pro
* Editorial

Users can select a template before generating or formatting their resume.

---

## 🔒 Security

Security was considered throughout the application architecture.

### API Key Protection

The OpenRouter API key is **not stored in the frontend**.

For production deployment, it is stored as a Cloudflare Worker Secret:

```text
OPENROUTER_API_KEY
```

### Git Protection

Sensitive environment files are excluded using:

```gitignore
node_modules/
.env
.env.local
```

### AI Safety Rules

The generation prompt instructs the AI not to intentionally fabricate:

* Employers
* Employment dates
* Degrees
* Certifications
* Tools
* Achievements
* Statistics

---

## 🎯 Use Cases

CyberCare AI can be useful for:

* Cybersecurity graduates
* University students
* Entry-level job seekers
* Career changers
* IT professionals
* SOC Analyst applicants
* Security Analyst applicants
* Software and technology professionals
* Freelancers and job applicants

---

## 🚀 Future Improvements

Planned improvements may include:

* User accounts
* Resume history
* Cloud database storage
* Additional resume templates
* LinkedIn profile optimization
* Job application tracking
* Advanced ATS scoring
* Resume version management
* More AI providers
* Export to additional document formats
* Authentication and user dashboards

---

## ⚠️ Disclaimer

CyberCare AI is an AI-assisted career tool.

Users should review and verify all generated content before submitting a resume or cover letter to an employer.

The application should not be used to create false employment history, qualifications, certifications, or achievements.

---
**CyberCare AI — Resume & Cover Letter Builder**

Built as a practical AI-powered career technology project combining:

* AI integration
* Web application development
* ATS optimization
* Cybersecurity-focused career workflows
* API integration
* Cloud deployment
* Secure secret management

---

## 📄 License

This project is currently intended for personal, educational, and portfolio purposes.

If you plan to distribute or commercially use the project, add an appropriate open-source or commercial license.
