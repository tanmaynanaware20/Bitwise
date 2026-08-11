# BiteWise - Product Specification

## Executive Summary
BiteWise is an intelligent, gamified food, nutrition, and meal-tracking application powered by Cloud Agentic AI. BiteWise makes healthy eating effortless, personalized, and rewarding through natural language meal logging, photo/barcode analysis, automated nutritional breakdown, custom meal planning, and an engaging "BiteCoins" reward ecosystem with anti-abuse security.

---

## Key Requirements & Scope

### 1. Platform & Compatibility
- **Primary Platform**: High-performance, responsive Web Application (Desktop, Tablet, Mobile).
- **Architecture Strategy**: Modern React architecture structured for future cross-platform code sharing with **React Native / Expo** (decoupled API client, state management, validation schemas, and hooks).
- **Design System**: BiteWise signature aesthetic:
  - **Light Mode**: Soft Cream background (`#FFFDD0` / `#FAF8F5`), Warm Peach primary (`#FF8A65` / `#FFAB91`), Soft Blue accents (`#81D4FA` / `#4FC3F7`), Slate text (`#1E293B`).
  - **Dark Mode**: Deep Slate background (`#121824`), Dark Charcoal cards (`#1E293B`), Warm Peach primary (`#FF8A65`), Muted Blue accents (`#38BDF8`), Off-white text (`#F8FAFC`).
  - Smooth micro-interactions, responsive navigation layout, fluid glassmorphism cards.

### 2. Cloud-Based Agentic AI System
- **Strict Cloud-Only Policy**: No Ollama, no local LLM runtimes, no client-side model execution.
- **Provider Abstraction (`ILLMProvider`)**: Universal adapter supporting cloud LLM APIs (Google Gemini, OpenAI, Anthropic Claude, Groq). Supports unified function/tool calling, structured JSON output, and automatic fallback across providers.
- **Agent Architecture**: Autonomous tool-calling AI agent equipped with tools:
  - `search_food_database`: Queries nutrition data providers.
  - `calculate_macros`: Computes caloric & macronutrient targets based on user biometric data (BMR/TDEE).
  - `log_meal`: Records meal entries in the database.
  - `analyze_recipe`: Parses ingredients, step-by-step cooking instructions, and nutrient density.
  - `generate_meal_plan`: Generates customized meal recommendations tailored to user dietary restrictions, budget, and goals.

### 3. Food & Nutrition Abstraction
- **Provider Abstraction (`IFoodNutritionProvider`)**: Universal abstraction interface for nutrition data sources.
- **Integrations**:
  - Open Food Facts API (Global barcode & packaged foods).
  - USDA FoodData Central API (Raw ingredients, generic foods).
  - Edamam / FatSecret (Supplemental provider option).
  - Internal DB / Local Cache (Speed & API quota optimization).

### 4. BiteCoins Gamification & Reward Ecosystem
- **Earning Mechanisms**: Daily streak bonuses, meal logging completions, nutrient balance milestones, community challenges, and referral bonuses.
- **Redemption & Rewards**: Unlock premium AI insights, custom meal plan exports, recipe cards, partner discounts, and exclusive app themes.
- **Refer & Earn System**: Unique user referral links/codes, two-sided incentives (inviter & invitee receive BiteCoins upon account verification and initial active usage).

### 5. Anti-Abuse & Fraud Prevention
- **Rate Limiting**: Tiered API rate limiting per user, IP, and session.
- **Referral Anti-Fraud**: Device fingerprinting, IP subnet check, email verification requirement before payout, transaction cap per device.
- **BiteCoin Ledger Protection**: Double-entry ledger audit trail, daily earn limits, anti-automation / captcha on high-reward actions.
- **Prompt Injection Defense**: Input sanitization and system prompt wrapping for cloud LLM tool calls.

### 6. Monetization & Ad Placement
- **Non-Intrusive Sponsored Banner**: Exactly **ONE small Sponsored banner** located in a designated unobtrusive placement (e.g. dashboard bottom widget / feed sidebar). Zero popups, zero intrusive overlays.

---

## Technical Constraints & Design Principles
- Strict separation of concerns (Clean Architecture / Hexagonal Architecture).
- Fully documented TypeScript interfaces for API contracts, database schemas, and AI tools.
- Enterprise-grade security (JWT/OAuth2, RBAC, encrypted secrets, sanitized inputs).
- Cloud-native deployment ready for Vercel, Supabase, Neon PostgreSQL, or Cloudflare Workers.
