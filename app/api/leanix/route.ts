import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { queryLeanIX } from '@/lib/leanix';
import {
  mockApplications,
  mockTechnologyStacks,
  mockITComponents,
  mockBusinessCapabilities,
} from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    // Check if in demo mode (no LeanIX credentials configured)
    const isDemoMode =
      !process.env.LEANIX_OAUTH_CLIENT_ID ||
      !process.env.LEANIX_OAUTH_CLIENT_SECRET;

    // Check authentication
    const session = await getServerSession(authOptions);

    // In demo mode, allow requests without real LeanIX token
    if (!isDemoMode && !session?.leanixAccessToken) {
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

    // In demo mode, return mock data
    if (isDemoMode) {
      // Determine which mock data to return based on query content
      if (query.includes('allApplications')) {
        return NextResponse.json({ data: mockApplications });
      } else if (query.includes('allTechnologyStacks')) {
        return NextResponse.json({ data: mockTechnologyStacks });
      } else if (query.includes('allITComponents')) {
        return NextResponse.json({ data: mockITComponents });
      } else if (query.includes('allBusinessCapabilities')) {
        return NextResponse.json({ data: mockBusinessCapabilities });
      }
      return NextResponse.json({ data: mockApplications });
    }

    // Execute real LeanIX query
    const data = await queryLeanIX(query, variables, session?.leanixAccessToken || '');

    return NextResponse.json(data);
  } catch (error) {
    console.error('LeanIX API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from LeanIX' },
      { status: 500 }
    );
  }
}
