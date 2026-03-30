import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verifies the JWT from the Authorization header.
 * @param req - The Request object
 * @returns The decoded user info if valid, null otherwise.
 */
export const verifyAuth = async (req: Request) => {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!JWT_SECRET) throw new Error('JWT_SECRET missing');

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
};
