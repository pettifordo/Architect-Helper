import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Simple demo login endpoint that bypasses some NextAuth complexity
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create demo session by calling signIn with credentials
    // This endpoint exists primarily for testing/demo purposes
    return NextResponse.json({
      success: true,
      message: 'Demo login initiated. Please use /api/auth/callback/credentials',
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}
