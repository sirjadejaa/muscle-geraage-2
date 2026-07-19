import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'muscle_garaage_secret_token_key_123!';

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || admin.passwordHash !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // Generate JWT token (expires in 12 hours)
    const token = jwt.sign(
      { adminId: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    // Set JWT token in an HTTP-only cookie
    const cookie = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 12, // 12 hours
      path: '/',
    });

    const response = NextResponse.json({ success: true });
    response.headers.append('Set-Cookie', cookie);
    return response;
  } catch (error) {
    console.error('Admin login API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
