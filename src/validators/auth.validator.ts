import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['rider', 'driver'], {
    message: 'Role must be either rider or driver',
  }),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  vehicle: z
    .object({
      type: z.enum(['bike', 'car', 'suv']),
      plate: z.string().min(1, 'Vehicle plate is required'),
      model: z.string().min(1, 'Vehicle model is required'),
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});