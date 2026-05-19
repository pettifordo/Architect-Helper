import { NextRequest, NextResponse } from 'next/server';
import {
  mockApplications,
  mockTechnologyStacks,
  mockITComponents,
  mockBusinessCapabilities,
} from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    // Always in demo mode when LEANIX credentials not configured
    const isDemoMode = true; // Simplified for demo

    // Get request body
    let query = '';
    try {
      const body = await request.json();
      query = body.query || '';
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Return mock data based on query
    if (query.includes('allApplications')) {
      return NextResponse.json({ data: mockApplications });
    } else if (query.includes('allTechnologyStacks')) {
      return NextResponse.json({ data: mockTechnologyStacks });
    } else if (query.includes('allITComponents')) {
      return NextResponse.json({ data: mockITComponents });
    } else if (query.includes('allBusinessCapabilities')) {
      return NextResponse.json({ data: mockBusinessCapabilities });
    }

    // Default to applications
    return NextResponse.json({ data: mockApplications });
  } catch (error) {
    console.error('LeanIX API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch from LeanIX';
    return NextResponse.json(
      { error: errorMessage, details: 'Check browser console for more info' },
      { status: 500 }
    );
  }
}
