import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const JWT_SECRET = process.env.JWT_SECRET || 'pgl_secret_2026_migration_789';

    // 1. HARDCODED DEMO FALLBACK (for ease of testing/deployment)
    if (username === 'admin' && password === 'ProGreenLife@2026') {
      const token = jwt.sign(
        { id: 'demo-admin-id', username: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return NextResponse.json({
        token,
        admin: { id: 'demo-admin-id', username: 'admin', isDemo: true }
      });
    }

    // 2. Database Connection
    await connectToDatabase();

    // 3. Standard DB Check
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
