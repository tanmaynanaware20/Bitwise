import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

export const userRouter = Router();

const updateTargetsSchema = z.object({
  body: z.object({
    dailyCalories: z.number().positive(),
    proteinG: z.number().nonnegative(),
    carbsG: z.number().nonnegative(),
    fatG: z.number().nonnegative(),
  }),
});

userRouter.get('/user/profile', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      id: 'mock-user-uuid-1',
      email: 'demo@bitewise.app',
      fullName: 'Alex Morgan',
      referralCode: 'BW-ALEX88',
      bitecoinBalance: 240,
      themePreference: 'light',
      dietaryPreferences: { vegan: false, keto: false, allergies: ['peanuts'] },
      macroTargets: { daily_calories: 2100, protein_g: 160, carbs_g: 210, fat_g: 65 },
    },
    meta: { timestamp: new Date().toISOString() },
  });
});

userRouter.put(
  '/user/targets',
  validateRequest(updateTargetsSchema),
  (req: Request, res: Response) => {
    const { dailyCalories, proteinG, carbsG, fatG } = req.body;
    res.status(200).json({
      success: true,
      data: {
        daily_calories: dailyCalories,
        protein_g: proteinG,
        carbs_g: carbsG,
        fat_g: fatG,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  }
);
