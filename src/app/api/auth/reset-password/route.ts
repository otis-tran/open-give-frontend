import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { ResetPasswordRequest, ErrorResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, password }: ResetPasswordRequest = await req.json();
    const apiUrl = process.env.API_URL;

    await axios.post(`${apiUrl}/auth/reset-password`, { token, password });
    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      return NextResponse.json(
        { error: errorData?.message || 'Password reset failed' },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
