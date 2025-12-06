import { Router } from 'express';
import { register, login, logout } from '@/controllers/auth.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validate } from '@/middleware/validate.middleware';
import { registerSchema, loginSchema } from '@/validators/auth.validator';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

// Role-based route (driver only)
// router.get('/driver-dashboard', authenticate, authorize('driver'), (req, res) => {
//   res.json({
//     success: true,
//     message: 'Welcome to driver dashboard',
//     data: req.user,
//   });
// });

export default router;