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
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <ErrorMessage error={error || undefined} />
        <FormButton type="submit" loading={loading}>
          Login
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
