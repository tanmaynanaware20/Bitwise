# 🥗 BiteWise

### Full-Stack Smart AI Nutrition Engine & Food Tracker

**BiteWise** is a modern, AI-powered nutrition platform that helps users understand what they eat, track meals, calculate nutrition accurately, and stay engaged through gamified rewards.

Built with **React, TypeScript, Node.js, Express, PostgreSQL, Prisma, and OpenRouter AI**, BiteWise combines food recognition, nutrition calculations, authentication, rewards, and a clean responsive interface into one full-stack application.

---

## 🚀 Live Demo

🌐 **Frontend:** [BiteWise Live App](https://bitewise.vercel.app/?utm_source=chatgpt.com)

⚙️ **Backend Health API:** [BiteWise Backend API](https://bitewise-backend-kpqn.onrender.com/api/v1/health?utm_source=chatgpt.com)

📦 **GitHub Repository:** [BiteWise GitHub Repository](https://github.com/tanmaynanaware20/Bitwise?utm_source=chatgpt.com)

---

## ✨ Why BiteWise?

Traditional food trackers often require users to manually search through large nutrition databases.

**BiteWise makes the process smarter.**

📸 Take a food photo → 🤖 AI recognizes the meal → 🧮 Nutrition is calculated → 📊 Meal is tracked → 🪙 Rewards keep you engaged.

The goal is to make nutrition tracking **fast, intelligent, interactive, and accessible**.

---

## 🔥 Core Features

### 🤖 1. Smart AI Assistant

Interact with BiteWise using natural language or food images.

* 📝 Text-based meal parsing
* 📸 Food photo recognition
* 👁️ Multimodal AI vision
* 🍱 Automatic food identification
* 🧠 AI-powered nutrition understanding
* 🔧 Tool-calling engine for structured actions
* ☁️ Powered by OpenRouter Cloud AI

---

### 🧮 2. 100g / 100ml Food Diary Math

BiteWise uses standardized nutrition calculations to accurately scale food portions.

For example:

```text
Base Nutrition → 100g / 100ml
        ↓
User Portion
        ↓
Scaled Nutrition
        ↓
Calories + Protein + Carbs + Fats
```

This allows nutrition values to be calculated consistently for different serving sizes.

Tracked metrics include:

* 🔥 Calories
* 💪 Protein
* 🍚 Carbohydrates
* 🥑 Fats

---

### 🪙 3. BiteCoins Rewards Store

Nutrition tracking becomes more engaging with gamification.

Users can:

* 🪙 Earn BiteCoins
* 💰 Track their coin balance
* 🎁 Access rewards
* 🎟️ Generate instant promotional coupon codes
* 🏆 Stay motivated through a reward-based experience

---

### 🔐 4. Step 1 Authentication Gate

BiteWise protects user sessions while keeping the experience frictionless.

* 🔒 Session-based user protection
* ⚡ Instant authentication gate
* 👤 Guest access mode
* 🚪 Protected application experience

Users can explore the application quickly without unnecessary friction.

---

### 🌗 5. 0.3s Theme Morphing

A polished interface with fast dark/light mode switching.

* ☀️ Light mode
* 🌙 Dark mode
* ⚡ Class-based theme switching
* 🎨 Smooth 0.3-second visual transition
* 📱 Responsive UI

---

## 🏗️ Tech Stack

| Layer                  | Technologies                      |
| ---------------------- | --------------------------------- |
| 🎨 Frontend            | React 18, Vite, TypeScript        |
| 💅 Styling             | Tailwind CSS                      |
| 🔄 State / Data        | TanStack React Query              |
| 🎯 Icons               | Lucide Icons                      |
| ⚙️ Backend             | Node.js, Express.js, TypeScript   |
| 🛡️ Validation         | Zod Payload Validation            |
| 🔌 API                 | REST API                          |
| 🤖 AI                  | OpenRouter Cloud AI, GPT-4o-mini  |
| 👁️ Vision             | Multimodal Food Photo Recognition |
| 🧰 AI Engine           | Tool Calling                      |
| 🗄️ Database           | PostgreSQL                        |
| 🔷 ORM                 | Prisma                            |
| ☁️ Frontend Deployment | Vercel                            |
| 🚀 Backend Deployment  | Render                            |

---

## 🧠 AI Architecture

BiteWise uses an AI pipeline designed around structured application actions rather than simply generating text.

```text
                ┌─────────────────────┐
                │      User Input     │
                └──────────┬──────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
         📝 Text Input             📸 Food Image
              │                         │
              └────────────┬────────────┘
                           ↓
                 ┌──────────────────┐
                 │  OpenRouter AI   │
                 │    GPT-4o-mini   │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Tool Calling     │
                 │ / AI Processing  │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Nutrition Logic  │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ PostgreSQL +     │
                 │ Prisma ORM       │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ BiteWise UI      │
                 └──────────────────┘
```

---

## 📁 Project Structure

```text
BiteWise/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

> **Note:** The structure above represents the recommended high-level organization of the BiteWise application.

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tanmaynanaware20/Bitwise.git
cd Bitwise
```

---

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3️⃣ Configure Frontend Environment

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

### 4️⃣ Start the Frontend

```bash
npm run dev
```

The Vite development server will start locally.

---

### 5️⃣ Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

### 6️⃣ Configure Backend Environment

Create a `.env` file:

```env
PORT=5000

DATABASE_URL="your_postgresql_connection_string"

OPENROUTER_API_KEY="your_openrouter_api_key"
```

> 🔐 Never commit API keys, database credentials, or other secrets to GitHub.

---

### 7️⃣ Configure Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

---

### 8️⃣ Start the Backend

```bash
npm run dev
```

Your local API will be available at:

```text
http://localhost:5000/api/v1
```

---

## 🌐 Deployment

### Frontend — Vercel

The BiteWise frontend is deployed using **Vercel**.

Production application:

[bitewise.vercel.app](https://bitewise.vercel.app/?utm_source=chatgpt.com)

### Backend — Render

The REST API is deployed using **Render**.

Production health endpoint:

[BiteWise API Health Check](https://bitewise-backend-kpqn.onrender.com/api/v1/health?utm_source=chatgpt.com)

---

## 🔐 Environment Variables

### Frontend

```env
VITE_API_URL=
```

### Backend

```env
PORT=
DATABASE_URL=
OPENROUTER_API_KEY=
```

Keep environment variables private and add `.env` to `.gitignore`.

---

## 🔄 Application Flow

```text
👤 User
  │
  ├── Login / Guest Access
  │
  ↓
🏠 BiteWise Dashboard
  │
  ├── 📝 Enter Meal
  │
  ├── 📸 Upload / Capture Food
  │
  ↓
🤖 AI Food Recognition
  │
  ↓
🧮 Nutrition Calculation
  │
  ├── Calories
  ├── Protein
  ├── Carbs
  └── Fats
  │
  ↓
📔 Food Diary
  │
  ↓
🪙 BiteCoins
  │
  ↓
🎁 Rewards Store
```

---

## 🛡️ Engineering Highlights

BiteWise demonstrates practical full-stack engineering concepts including:

* ⚛️ Component-based React architecture
* 🟦 End-to-end TypeScript development
* 🔌 RESTful API architecture
* 🛡️ Runtime request validation using Zod
* 🔷 Type-safe database access with Prisma
* 🐘 PostgreSQL relational data modeling
* 🤖 LLM integration through OpenRouter
* 👁️ Multimodal AI processing
* 🧰 AI tool-calling workflows
* 🔄 Server-state management with TanStack React Query
* 🌐 Cloud deployment with Vercel and Render
* 📱 Responsive modern UI
* 🌗 Dynamic theme architecture

---

## 📊 What Makes BiteWise Different?

| Feature                     | BiteWise |
| --------------------------- | :------: |
| AI Meal Understanding       |     ✅    |
| Food Photo Recognition      |     ✅    |
| Natural Language Meal Input |     ✅    |
| Portion Scaling             |     ✅    |
| Nutrition Tracking          |     ✅    |
| Protein / Carbs / Fats      |     ✅    |
| Gamified Rewards            |     ✅    |
| Promo Coupon Generation     |     ✅    |
| Guest Access                |     ✅    |
| Dark / Light Mode           |     ✅    |
| Full-Stack TypeScript       |     ✅    |
| PostgreSQL + Prisma         |     ✅    |
| Cloud Deployment            |     ✅    |

---

## 🚀 Future Improvements

Potential future enhancements include:

* 📈 Advanced nutrition analytics
* 📊 Weekly and monthly nutrition reports
* 🎯 Personalized nutrition goals
* 🧠 More advanced AI food recommendations
* 🍽️ Personalized meal planning
* 🏆 Leaderboards and achievement systems
* 📱 PWA / mobile application
* 🔔 Smart nutrition reminders
* 🧬 Personalized dietary profiles
* 📷 Improved regional food recognition

---

## 👨‍💻 Author

### Tanmay Nanaware

Computer Engineering Student & Full-Stack Developer

Passionate about building **full-stack applications, AI-powered products, and practical developer-focused solutions.**

🔗 **GitHub:** [Tanmay Nanaware on GitHub](https://github.com/tanmaynanaware20?utm_source=chatgpt.com)

🔗 **Project Repository:** [BiteWise Repository](https://github.com/tanmaynanaware20/Bitwise?utm_source=chatgpt.com)

---

## ⭐ Support the Project

If you find **BiteWise** interesting or useful:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements
🤝 Contribute to the project

---

<div align="center">

### 🥗 Eat Smarter. Track Better. Live Better.

**BiteWise — Full-Stack Smart AI Nutrition Engine & Food Tracker**

Made with ❤️ by **Tanmay Nanaware**

</div>
