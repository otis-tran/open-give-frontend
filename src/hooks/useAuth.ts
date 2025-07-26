import { useState } from 'react';
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

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (values: RegisterRequest) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  logout: () => void;
}

export default function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<LoginResponse>('/api/auth/login', { email, password });
      setUser(data.user);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ErrorResponse;
        setError(errorData?.error || errorData?.message || 'Login failed');
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
      setUser(data.user);
      router.push('/auth/login');
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
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, error, login, register, forgotPassword, resetPassword, logout };
}
