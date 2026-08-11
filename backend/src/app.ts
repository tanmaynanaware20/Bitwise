import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

export const app: Express = express();

// Allow all origins for CORS so live frontend deployments on Vercel/Netlify can seamlessly access the API
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman) or any web origin
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'HTTP-Referer', 'X-Title'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// API Routes
app.use('/api/v1', apiRouter);

// 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);
