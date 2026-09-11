import { redis } from '../config/redis';

export const clearCacheByPattern = async (pattern: string) => {
  try {
    const keys = await redis.keys(`cache:${pattern}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error: any) {
    console.error('cannot delete cache:', error.message);
  }
};