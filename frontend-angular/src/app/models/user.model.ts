export interface MacroTargets {
  daily_calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  referralCode: string;
  bitecoinBalance: number;
  macroTargets: MacroTargets;
}

export interface MealEntryItem {
  id: string;
  name: string;
  unit: 'g' | 'ml';
  portionQuantity: number;
  basePer100: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
  };
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  source: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  toolCall?: {
    name: string;
    args: Record<string, any>;
    status: 'executing' | 'completed';
    resultSummary?: string;
  };
  timestamp: string;
}

export interface CouponCode {
  id: string;
  rewardId: string;
  title: string;
  code: string;
  discount: string;
  redeemedAt: string;
}
