import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

export const mealsRouter = Router();

mealsRouter.get('/meals', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      loggedAt: new Date().toISOString().split('T')[0],
      summary: {
        totalCalories: 1240,
        totalProteinG: 105,
        totalCarbsG: 130,
        totalFatG: 42,
      },
      meals: {
        breakfast: [
          { id: '1', name: 'Scrambled Eggs (2 large)', calories: 140, proteinG: 12, carbsG: 1, fatG: 10 },
          { id: '2', name: 'Sourdough Toast', calories: 120, proteinG: 4, carbsG: 22, fatG: 1.5 },
        ],
        lunch: [
          { id: '3', name: 'Grilled Chicken Breast', calories: 248, proteinG: 36, carbsG: 0, fatG: 5 },
          { id: '4', name: 'Brown Rice', calories: 111, proteinG: 2.6, carbsG: 23, fatG: 0.9 },
        ],
        dinner: [
          { id: '5', name: 'Baked Salmon Fillet', calories: 360, proteinG: 34, carbsG: 0, fatG: 22 },
        ],
        snack: [
          { id: '7', name: 'Greek Yogurt', calories: 130, proteinG: 15, carbsG: 6, fatG: 4 },
        ],
      },
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
