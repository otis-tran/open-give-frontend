import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { serialize } from 'cookie';
import {
  LoginWithTwoFactorRequest,
  LoginResponse,
  ErrorResponse,
  CookieOptions,
} from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginWithTwoFactorRequest = await req.json();
    const { searchParams } = new URL(req.url);
    const twoFactorCode = searchParams.get('twoFactorCode');

    const apiUrl = process.env.API_URL;
    const cookieOptions: CookieOptions = JSON.parse(process.env.COOKIE_OPTIONS || '{}');

    const requestBody = twoFactorCode ? { email, password, twoFactorCode } : { email, password };

    const { data } = await axios.post<LoginResponse>(`${apiUrl}/auth/login`, requestBody);
    const { access_token, refresh_token, user } = data;

    const res = NextResponse.json({ user, message: data.message });
    res.headers.append(
      'Set-Cookie',
      serialize('accessToken', access_token, { ...cookieOptions, httpOnly: true }),
    );
    res.headers.append(
      'Set-Cookie',
      serialize('refreshToken', refresh_token, { ...cookieOptions, httpOnly: true }),
    );

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      return NextResponse.json(
        { error: errorData?.message || 'Login failed' },
        { status: error.response?.status || 401 },
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
