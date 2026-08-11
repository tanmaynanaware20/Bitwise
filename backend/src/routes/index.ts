import { Router } from 'express';
import { healthRouter } from './health';
import { authRouter } from './auth';
import { userRouter } from './user';
import { adsRouter } from './ads';
import { aiRouter } from './ai';
import { mealsRouter } from './meals';
import { rewardsRouter } from './rewards';
import { referralsRouter } from './referrals';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(authRouter);
apiRouter.use(userRouter);
apiRouter.use(adsRouter);
apiRouter.use(aiRouter);
apiRouter.use(mealsRouter);
apiRouter.use(rewardsRouter);
apiRouter.use(referralsRouter);
