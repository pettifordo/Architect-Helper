import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { queryLeanIX } from '@/lib/leanix';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.leanixAccessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const { query, variables } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Execute LeanIX query
    const data = await queryLeanIX(query, variables, session.leanixAccessToken);

    return NextResponse.json(data);
  } catch (error) {
    console.error('LeanIX API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from LeanIX' },
      { status: 500 }
    );
  }
}
