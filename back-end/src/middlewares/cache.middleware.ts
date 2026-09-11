import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';

export const cacheMiddleware = (durationInSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedData = await redis.get(key);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
      const originalJson = res.json;
      res.json = function (body: any): Response {
        if (res.statusCode === 200 && body.success) {
          redis.set(key, JSON.stringify(body), 'EX', durationInSeconds).catch((err) => {
            console.error('Failed save cache in Redis:', err.message);
          });
        }
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};