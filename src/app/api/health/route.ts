import { NextResponse } from 'next/server';

export function GET(request: Request) {
  return NextResponse.json(
    { status: 'pass', message: 'success to connect' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/health+json',
      },
    }
  );
}
