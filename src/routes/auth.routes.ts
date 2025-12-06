import { Router, Request, Response } from 'express';
import { register, login } from '@/controllers/auth.controller';
import { authenticate } from '@/middleware/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example (for testing auth middleware)
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

export default router;