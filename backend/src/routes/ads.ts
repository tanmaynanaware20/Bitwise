import { Router, Request, Response } from 'express';

export const adsRouter = Router();

adsRouter.get('/ads/banner', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      adId: 'ad-partner-nutripure-01',
      title: 'NutriPure Organic Protein',
      sponsorName: 'NutriPure Health',
      description: 'Get 15% off clean plant-based protein powder for BiteWise members.',
      imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
      targetUrl: 'https://example.com/nutripure',
      badgeText: 'Sponsored',
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
