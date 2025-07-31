'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import FormButton from '@/components/FormButton';
import useAuth from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    login(data.email, data.password);
  };

  return (
    <AuthLayout>
      {/* Card container */}
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            className="block w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
          />

          <FormInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            className="block w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
          />

          <ErrorMessage error={error || undefined} />

          <FormButton
            type="submit"
            loading={loading}
            className="w-full py-2 px-4 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 disabled:opacity-50"
          >
            Login
          </FormButton>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Forgot password?{' '}
          <a
            href="/auth/forgot-password"
            className="font-medium text-blue-600 dark:text-cyan-400 hover:underline"
          >
            Reset here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
