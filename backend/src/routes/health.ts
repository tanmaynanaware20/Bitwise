import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      service: 'BiteWise API',
      version: '1.0.0',
      uptime: process.uptime(),
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
