import jwt, { SignOptions } from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role: 'rider' | 'driver';
}

const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return secret;
};

const getJWTRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');
  return secret;
};

export const generateAccessToken = (payload: JWTPayload): string => {
  const expiresIn: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, getJWTSecret(), options);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  const expiresIn: SignOptions['expiresIn'] = (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, getJWTRefreshSecret(), options);
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, getJWTSecret()) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, getJWTRefreshSecret()) as JWTPayload;
};