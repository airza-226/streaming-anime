import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
    maxRetriesPerRequest:3,
    enableOfflineQueue:false
});

redis.on('connect', () => {
  console.log('Redis Client Connected');
});

redis.on('error', (err) => {
  console.error(' Redis Error:', err.message);
});