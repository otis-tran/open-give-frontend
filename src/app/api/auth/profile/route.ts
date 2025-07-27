// src/app/api/auth/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { ErrorResponse, UserProfile } from '@/types/auth';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Không tìm thấy token xác thực' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const apiUrl = process.env.API_URL;

    const { data } = await axios.get<UserProfile>(`${apiUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Trả về dữ liệu profile người dùng
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      // Xử lý lỗi từ backend API
      const errorData = error.response?.data as ErrorResponse;
      const statusCode = error.response?.status || 401;

      if (statusCode === 401) {
        return NextResponse.json(
          { error: errorData?.message || 'Token không hợp lệ hoặc đã hết hạn' },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { error: errorData?.message || 'Không thể lấy thông tin người dùng' },
        { status: statusCode },
      );
    }

    // Xử lý lỗi không xác định
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi không xác định khi lấy thông tin người dùng' },
      { status: 500 },
    );
  }
}
