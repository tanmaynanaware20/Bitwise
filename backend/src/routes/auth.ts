import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

export const authRouter = Router();

// In-memory mock user database store for live authentication testing
interface RegisteredUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  referralCode: string;
  bitecoinBalance: number;
  macroTargets: {
    daily_calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  };
}

const usersDb: Map<string, RegisteredUser> = new Map([
  [
    'demo@bitewise.app',
    {
      id: 'usr-demo-001',
      email: 'demo@bitewise.app',
      passwordHash: 'password123', // Demo user
      fullName: 'Alex Morgan',
      referralCode: 'BW-ALEX88',
      bitecoinBalance: 240,
      macroTargets: { daily_calories: 2100, protein_g: 160, carbs_g: 210, fat_g: 65 },
    },
  ],
]);

const signupSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    referralCode: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

authRouter.post(
  '/auth/signup',
  validateRequest(signupSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, fullName, referralCode } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      if (usersDb.has(normalizedEmail)) {
        res.status(400).json({
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: 'An account with this email address already exists. Please log in instead.',
          },
          meta: { timestamp: new Date().toISOString() },
        });
        return;
      }

      const generatedRefCode = `BW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newUser: RegisteredUser = {
        id: `usr-${Date.now()}`,
        email: normalizedEmail,
        passwordHash: password,
        fullName: fullName.trim(),
        referralCode: generatedRefCode,
        bitecoinBalance: referralCode ? 100 : 50, // Bonus for using referral
        macroTargets: { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 },
      };

      usersDb.set(normalizedEmail, newUser);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
            referralCode: newUser.referralCode,
            bitecoinBalance: newUser.bitecoinBalance,
            macroTargets: newUser.macroTargets,
          },
          token: `token_${newUser.id}_${Date.now()}`,
        },
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/auth/login',
  validateRequest(loginSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim();
      const existingUser = usersDb.get(normalizedEmail);

      if (!existingUser || existingUser.passwordHash !== password) {
        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password. Please check your credentials and try again.',
          },
          meta: { timestamp: new Date().toISOString() },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: existingUser.id,
            email: existingUser.email,
            fullName: existingUser.fullName,
            referralCode: existingUser.referralCode,
            bitecoinBalance: existingUser.bitecoinBalance,
            macroTargets: existingUser.macroTargets,
          },
          token: `token_${existingUser.id}_${Date.now()}`,
        },
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get('/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'No valid authentication token provided.' },
    });
    return;
  }

  // Return demo user or registered user
  const demoUser = usersDb.get('demo@bitewise.app');
  res.status(200).json({
    success: true,
    data: {
      id: demoUser?.id || 'usr-demo-001',
      email: demoUser?.email || 'demo@bitewise.app',
      fullName: demoUser?.fullName || 'Alex Morgan',
      referralCode: demoUser?.referralCode || 'BW-ALEX88',
      bitecoinBalance: demoUser?.bitecoinBalance || 240,
      macroTargets: demoUser?.macroTargets || { daily_calories: 2100, protein_g: 160, carbs_g: 210, fat_g: 65 },
    },
    meta: { timestamp: new Date().toISOString() },
  });
});
