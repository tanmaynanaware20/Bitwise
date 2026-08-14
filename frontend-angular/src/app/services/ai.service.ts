import { Injectable } from '@angular/core';

const API_BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  async sendChatMessage(messages: any[]): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async estimateNutrition(foodName: string): Promise<any> {
    return this.sendChatMessage([
      {
        role: 'user',
        content: `Give accurate nutrition facts per 100g (or 100ml for liquids) for "${foodName}". Include: calories (kcal), protein (g), carbs (g), fat (g).`,
      },
    ]);
  }
}
