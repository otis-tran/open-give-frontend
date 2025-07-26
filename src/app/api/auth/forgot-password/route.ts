import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { ForgotPasswordRequest, ErrorResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const { email }: ForgotPasswordRequest = await req.json();
    const apiUrl = process.env.API_URL;

    await axios.post(`${apiUrl}/auth/forgot-password`, { email });
    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      return NextResponse.json(
        { error: errorData?.message || 'Failed to send email' },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
