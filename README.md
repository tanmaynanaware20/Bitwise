BiteWise 🍎
A modern full-stack AI-powered nutrition engine and food tracking application built using React, Node.js, Express, PostgreSQL, and OpenRouter Cloud AI. The goal of this project was to create a clean, interactive experience where users can track daily meals, get AI nutritional breakdowns, earn BiteCoins, and manage health goals.

🌐 Live Project
Frontend Web App: https://bitewise.vercel.app/
Backend API Service: https://bitewise-backend-kpqn.onrender.com/api/v1/health
💡 About the Project
This project focuses on building a full-stack smart nutrition system with cloud AI capabilities. It handles real-time natural language meal parsing, camera food photo recognition, portion-based nutrient scaling (100g/100ml math), calorie tracking, and a gamified rewards ecosystem.

The idea was to combine modern UI design with intelligent AI assistance to make food logging effortless.

⚙️ What It Does
Analyzes text food entries and food photos using Cloud AI (GPT-4o-mini)
Calculates calories, protein, carbs, and fats using 100g/100ml base portion math
Tracks daily macro progress with visual progress bars
Rewards user consistency with BiteCoins and redeemable promo coupons
Restricts feature access behind a Step 1 Authentication Gate (with instant Guest mode)
Offers smooth 0.3s Light and Dark theme switching
🛠 Tech Used
Frontend: React 18, Vite, TypeScript, Tailwind CSS, TanStack React Query, Lucide Icons
Backend: Node.js, Express.js, TypeScript, Zod Schema Validation, REST API
AI Engine: OpenRouter Cloud AI API (gpt-4o-mini), Multimodal Vision Processing
Database & ORM: PostgreSQL, Prisma ORM
Hosting & DevOps: Vercel (Frontend), Render (Backend), GitHub
📂 Project Structure


Bitwise/
 ├── backend/
 │    ├── src/
 │    │    ├── routes/        # Express REST API endpoints (/health, /ai, /auth)
 │    │    ├── middleware/    # Error handler & validation
 │    │    └── server.ts      # Server entry point
 │    └── package.json
 ├── frontend/
 │    ├── src/
 │    │    ├── pages/         # Dashboard, Food Diary, AI Chat, Rewards, Profile
 │    │    ├── context/       # Auth & Theme context
 │    │    └── App.tsx        # Main router & layout
 │    └── package.json
 └── README.md
▶️ How to Run
Clone the repository:
git clone https://github.com/tanmaynanaware20/Bitwise.git
Open the project folder:
cd Bitwise
Run the Backend server:


cd backend
npm install
npm run dev
Open a new terminal and run the Frontend application:


cd frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.
🧠 What I Focused On
While building this project, the focus was on:

Integrating cloud AI vision and tool calling for accurate meal recognition
Implementing clean 100g/100ml base nutrient calculation math
Designing a fast, responsive UI with smooth dark mode transitions
Building a reliable RESTful API with schema validation and error handling
Deploying a seamless production stack on Vercel and Render
👨💻 Author
Tanmay Nanaware
https://github.com/tanmaynanaware20

⭐
If you found this project useful or interesting, feel free to star the repo!

6:43 PM
