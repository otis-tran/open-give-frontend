import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import api from '../lib/api';
import Cookies from 'js-cookie';
import {
  User,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
} from '@/types/auth';

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (values: RegisterRequest) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  clearError: () => void;
}

export default function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start loading as true to check auth state
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Hàm lấy thông tin profile từ API với console log để debug
  const getProfile = async (): Promise<void> => {
    try {
      const accessToken = Cookies.get('accessToken');
      console.log('Current access token:', accessToken); // Debug: Kiểm tra token

      // Đảm bảo token được thiết lập cho request cụ thể này
      const { data } = await api.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Profile data received:', data); // Debug: Kiểm tra dữ liệu nhận được
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Profile fetch error:', err); // Debug: Kiểm tra lỗi
      setIsAuthenticated(false);
      if (err instanceof AxiosError) {
        console.log('Error response:', err.response?.data); // Debug: Xem thông tin lỗi
      }
    }
  };

  // Thiết lập token và header khi component mount
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    console.log('Initial access token check:', accessToken); // Debug: Kiểm tra token ban đầu

    if (accessToken) {
      // Thiết lập Authorization header một cách rõ ràng
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('Set Authorization header:', api.defaults.headers.common['Authorization']); // Debug

      // Lấy thông tin profile
      getProfile().finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting login for:', email); // Debug
      const { data } = await api.post<LoginResponse>('/api/auth/login', { email, password });
      console.log('Login response:', data); // Debug

      // Kiểm tra token trong response
      if (!data.access_token || !data.refresh_token) {
        console.error('Missing tokens in response'); // Debug
        throw new Error('Invalid response from server - missing tokens');
      }

      // Lưu token vào cookies
      Cookies.set('accessToken', data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      Cookies.set('refreshToken', data.refresh_token, {
        expires: 30,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Kiểm tra cookies đã được đặt đúng chưa
      const savedToken = Cookies.get('accessToken');
      console.log('Saved access token:', savedToken); // Debug

      // Thiết lập Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      console.log(
        'Set Authorization header after login:',
        api.defaults.headers.common['Authorization'],
      ); // Debug

      setUser(data.user);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err); // Debug
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ErrorResponse;
        console.log('Error response data:', errorData); // Debug
        setError(errorData?.error || errorData?.message || 'Login failed');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: RegisterRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<RegisterResponse>('/api/auth/register', values);
      // Không đặt isAuthenticated = true sau khi đăng ký
      router.push('/auth/login?registered=true');
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ErrorResponse;
        setError(errorData?.error || errorData?.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/auth/forgot-password', { email });
      // Success state can be handled here if needed
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ErrorResponse;
        setError(errorData?.error || errorData?.message || 'Failed to send email');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/auth/reset-password', { token, password });
      router.push('/auth/login?reset=true'); // Redirect to login with success message
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ErrorResponse;
        setError(errorData?.error || errorData?.message || 'Password reset failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    console.log('Logging out...'); // Debug

    // Xóa token khỏi cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    // Xóa header
    delete api.defaults.headers.common['Authorization'];

    // Reset state
    setUser(null);
    setIsAuthenticated(false);

    // Chuyển hướng về trang đăng nhập
    router.push('/auth/login');
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    getProfile,
    clearError,
  };
}
