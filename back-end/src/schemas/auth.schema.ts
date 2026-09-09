import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ message: 'Username is required' })
      .min(3, 'Username must be at least 3 characters'),
    email: z
      .string({ message: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ message: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ message: 'Password is required' }),
  }),
});