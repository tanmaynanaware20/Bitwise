import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

export const rewardsRouter = Router();

const redeemSchema = z.object({
  body: z.object({
    rewardId: z.string(),
  }),
});

rewardsRouter.get('/rewards', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 'reward-1',
        title: '7-Day High-Protein AI Meal Plan',
        description: 'Structured 7-day meal plan tailored to high protein targets.',
        cost: 100,
        category: 'AI Plans',
      },
      {
        id: 'reward-2',
        title: 'Custom Deep Obsidian Theme Pack',
        description: 'Unlock exclusive pitch-black OLED dark mode theme.',
        cost: 50,
        category: 'Themes',
      },
      {
        id: 'reward-3',
        title: '15% Off NutriPure Protein Powder',
        description: 'Exclusive partner discount coupon for clean plant-based protein.',
        cost: 150,
        category: 'Discounts',
      },
    ],
    meta: { timestamp: new Date().toISOString() },
  });
});

rewardsRouter.post('/rewards/redeem', validateRequest(redeemSchema), (req: Request, res: Response) => {
  const { rewardId } = req.body;

  res.status(200).json({
    success: true,
    data: {
      redemptionId: `red-${Date.now()}`,
      rewardId,
      status: 'COMPLETED',
      coinsDeducted: 100,
      newBalance: 140,
      unlockedPayload: 'BW-UNLOCKED-PAYLOAD-KEY-8812',
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
