import { Response } from 'express';
import User from '@/models/User';
import { AuthRequest } from '@/middleware/auth.middleware';
import { generateAccessToken, generateRefreshToken } from '@/utils/jtw.utils';
import { AppError, asyncHandler } from '@/middleware/error.middleware';

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, phone, password, role, name, vehicle } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    throw new AppError('User with this email or phone already exists', 409);
  }

  // If driver, validate vehicle info
  if (role === 'driver' && !vehicle) {
    throw new AppError('Vehicle information is required for drivers', 400);
  }

  // Create user
  const user = await User.create({
    email,
    phone,
    password,
    role,
    profile: { name },
    ...(role === 'driver' && { vehicle }),
  });

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
      },
      accessToken,
      refreshToken,
    },
  });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Find user and include password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
      },
      accessToken,
      refreshToken,
    },
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});