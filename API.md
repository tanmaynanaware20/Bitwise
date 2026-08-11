# BiteWise - REST API Specification (`API.md`)

## 1. API Design Guidelines & Standards

The BiteWise API follows strict RESTful conventions, returning JSON responses with unified error formatting and supporting **Server-Sent Events (SSE)** for agentic AI streaming interactions.

### Standard Response Envelope
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
  };
}
```

### Global Headers & Authentication
- **Content-Type**: `application/json`
- **Authorization**: `Bearer <JWT_TOKEN>`
- **X-Device-Fingerprint**: Client-generated device signature hash for anti-abuse checks.

---

## 2. API Endpoint Map Summary

| Category | HTTP Method | Path | Description | Access |
|---|---|---|---|---|
| **Auth & User** | `POST` | `/api/v1/auth/signup` | Create user account & process referral code | Public |
| | `POST` | `/api/v1/auth/login` | Authenticate & return JWT token | Public |
| | `GET` | `/api/v1/user/profile` | Fetch profile, macro targets & preferences | Auth |
| | `PUT` | `/api/v1/user/targets` | Update caloric/macronutrient goals | Auth |
| **Agentic AI** | `POST` | `/api/v1/ai/chat` | Stream interactive agent responses via SSE | Auth |
| | `POST` | `/api/v1/ai/parse-meal` | Natural language / photo meal parser tool | Auth |
| | `POST` | `/api/v1/ai/analyze-recipe` | Recipe nutrient breakdown & recommendation | Auth |
| **Meals & Foods** | `GET` | `/api/v1/meals` | List daily meal logs with macro aggregates | Auth |
| | `POST` | `/api/v1/meals` | Log a new meal entry manually or from AI | Auth |
| | `DELETE` | `/api/v1/meals/:id` | Delete meal log entry | Auth |
| | `GET` | `/api/v1/food/search` | Query multi-source food provider engine | Auth |
| | `GET` | `/api/v1/food/barcode/:code` | Barcode lookup via Open Food Facts | Auth |
| **BiteCoins & Rewards** | `GET` | `/api/v1/bitecoins/ledger` | Fetch BiteCoins ledger transaction history | Auth |
| | `GET` | `/api/v1/rewards` | List redeemable reward catalog | Auth |
| | `POST` | `/api/v1/rewards/redeem` | Redeem BiteCoins for selected reward | Auth |
| **Refer & Earn** | `GET` | `/api/v1/referrals` | Get referral stats, link & earnings | Auth |
| **Monetization** | `GET` | `/api/v1/ads/banner` | Get single sponsored ad unit metadata | Public/Auth |

---

## 3. Detailed Endpoint Contracts

### 3.1 Agentic AI Chat Endpoint (SSE Stream)
- **Endpoint**: `POST /api/v1/ai/chat`
- **Description**: Streams responses from the agentic AI engine, invoking backend tools (`search_food_database`, `calculate_macros`, `log_meal`) dynamically.

#### Request Body
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I just ate 2 scrambled eggs, 1 slice of sourdough toast with avocado, and a cup of black coffee for breakfast."
    }
  ],
  "context": {
    "currentMealType": "breakfast",
    "timezone": "America/New_York"
  }
}
```

#### Response Stream (Server-Sent Events)
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

event: tool_call_start
data: {"tool": "search_food_database", "args": {"query": "scrambled egg"}}

event: tool_call_end
data: {"tool": "search_food_database", "resultCount": 1}

event: delta
data: {"content": "I've analyzed your breakfast! Here is the nutritional breakdown:\n\n- **2 Scrambled Eggs**: 140 kcal | 12g P | 1g C | 10g F\n- **1 Slice Sourdough Toast w/ Avocado**: 190 kcal | 4g P | 22g C | 10g F\n- **Black Coffee**: 2 kcal | 0g P | 0g C | 0g F\n\n**Total**: 332 kcal | 16g Protein | 23g Carbs | 20g Fat.\n\nWould you like me to log this meal to your daily record?"}

event: done
data: {"usage": {"totalTokens": 380}, "bitecoinsEarnable": 5}
```

---

### 3.2 Natural Language Meal Parser Endpoint
- **Endpoint**: `POST /api/v1/ai/parse-meal`
- **Description**: Parses unstructured meal descriptions or image metadata into structured JSON meal items.

#### Request Body
```json
{
  "text": "1 bowl of grilled chicken salad with olive oil dressing",
  "mealType": "lunch"
}
```

#### Response Body (200 OK)
```json
{
  "success": true,
  "data": {
    "mealType": "lunch",
    "totalCalories": 420.0,
    "totalProteinG": 38.5,
    "totalCarbsG": 12.0,
    "totalFatG": 24.0,
    "items": [
      {
        "foodName": "Grilled Chicken Breast",
        "servingSizeG": 150.0,
        "calories": 248.0,
        "proteinG": 36.0,
        "carbsG": 0.0,
        "fatG": 5.0,
        "sourceProvider": "usda"
      },
      {
        "foodName": "Mixed Salad Greens",
        "servingSizeG": 100.0,
        "calories": 20.0,
        "proteinG": 1.5,
        "carbsG": 4.0,
        "fatG": 0.2,
        "sourceProvider": "usda"
      },
      {
        "foodName": "Olive Oil Dressing",
        "servingSizeG": 15.0,
        "calories": 152.0,
        "proteinG": 0.0,
        "carbsG": 8.0,
        "fatG": 18.8,
        "sourceProvider": "usda"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-08-10T17:00:00Z"
  }
}
```

---

### 3.3 BiteCoins & Rewards Endpoint
- **Endpoint**: `POST /api/v1/rewards/redeem`
- **Description**: Atomically deducts BiteCoins from the user balance and unlocks the requested reward payload.

#### Request Body
```json
{
  "rewardId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Response Body (200 OK)
```json
{
  "success": true,
  "data": {
    "redemptionId": "771e8400-e29b-41d4-a716-446655441111",
    "rewardTitle": "7-Day High Protein AI Meal Plan",
    "bitecoinsDeducted": 100,
    "newBalance": 250,
    "unlockedPayload": {
      "planDownloadUrl": "https://api.bitewise.app/v1/downloads/plans/hp-7day.pdf",
      "accessKey": "BW-REWARD-883921"
    }
  }
}
```

---

### 3.4 Sponsored Ad Banner Endpoint
- **Endpoint**: `GET /api/v1/ads/banner`
- **Description**: Returns metadata for the single small sponsored banner slot.

#### Response Body (200 OK)
```json
{
  "success": true,
  "data": {
    "adId": "ad-partner-organic-protein-01",
    "title": "Clean Plant Protein",
    "sponsorName": "NutriPure",
    "description": "Get 15% off organic protein powder for BiteWise members.",
    "imageUrl": "https://assets.bitewise.app/ads/banner-nutripure.png",
    "targetUrl": "https://nutripure.example/bitewise",
    "badgeText": "Sponsored"
  }
}
```
