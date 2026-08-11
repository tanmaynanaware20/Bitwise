import { Router, Request, Response } from 'express';

export const referralsRouter = Router();

referralsRouter.get('/referrals', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      referralCode: 'BW-ALEX88',
      referralLink: 'https://bitewise.app/signup?ref=BW-ALEX88',
      totalReferred: 3,
      verifiedReferred: 2,
      totalCoinsEarned: 100,
      rewardPerReferral: 50,
      antiAbuseRules: {
        maxDailyEarnCap: 100,
        emailVerificationRequired: true,
        minMealLogsRequired: 3,
      },
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
