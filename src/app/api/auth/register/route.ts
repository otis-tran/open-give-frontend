import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { RegisterRequest, RegisterResponse, ErrorResponse } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: RegisterRequest = await req.json();
    const apiUrl = process.env.API_URL;

    const { data } = await axios.post<RegisterResponse>(`${apiUrl}/auth/register`, body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      return NextResponse.json(
        { error: errorData?.message || 'Registration failed' },
        { status: error.response?.status || 400 },
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
