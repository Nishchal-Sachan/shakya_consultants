import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '7d';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // 1. Missing fields check
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    // 2. Check if admin exists (must use .select('+password') since it's hidden by default)
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    // 3. Compare password using the method on the model
    const isMatch = await admin.matchPassword(password);
    
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    // 4. Generate JWT
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is missing in environment variables');
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    // 5. Return success and token
    return NextResponse.json({ 
      success: true, 
      token,
      message: 'Logged in successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error during login' 
    }, { status: 500 });
  }
}
