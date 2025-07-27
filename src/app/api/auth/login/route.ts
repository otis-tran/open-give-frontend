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
    console.log('[Login API] Request for:', email);

    // Lấy mã 2FA nếu có
    const { searchParams } = new URL(req.url);
    const twoFactorCode = searchParams.get('twoFactorCode');
    if (twoFactorCode) {
      console.log('[Login API] Two-factor code provided');
    }

    const apiUrl = process.env.API_URL;
    console.log('[Login API] API URL:', apiUrl);

    // Parse cấu hình cookie hoặc sử dụng mặc định nếu không có
    let cookieOptions: CookieOptions;
    try {
      cookieOptions = JSON.parse(process.env.COOKIE_OPTIONS || '{}');
    } catch (error) {
      cookieOptions = {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, // 1 day
      };
    }

    console.log('[Login API] Cookie options:', cookieOptions);

    const requestBody = twoFactorCode ? { email, password, twoFactorCode } : { email, password };
    console.log('[Login API] Sending request to backend...');

    const { data } = await axios.post<LoginResponse>(`${apiUrl}/auth/login`, requestBody);
    console.log('[Login API] Response received:', {
      hasUser: !!data.user,
      hasAccessToken: !!data.access_token,
      hasRefreshToken: !!data.refresh_token,
      message: data.message,
    });

    const { access_token, refresh_token, user } = data;

    // Trả về đầy đủ thông tin trong response JSON
    const res = NextResponse.json({
      user,
      access_token,
      refresh_token,
      message: data.message,
    });

    // Đặt cookies
    res.headers.append(
      'Set-Cookie',
      serialize('accessToken', access_token, { ...cookieOptions, httpOnly: true }),
    );

    res.headers.append(
      'Set-Cookie',
      serialize('refreshToken', refresh_token, {
        ...cookieOptions,
        httpOnly: true,
        maxAge: cookieOptions.maxAge ? cookieOptions.maxAge * 30 : 2592000, // 30 days
      }),
    );

    return res;
  } catch (error) {
    console.error('[Login API] Error:', error);

    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      console.error('[Login API] Backend error:', errorData);

      return NextResponse.json(
        { error: errorData?.message || 'Login failed' },
        { status: error.response?.status || 401 },
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
