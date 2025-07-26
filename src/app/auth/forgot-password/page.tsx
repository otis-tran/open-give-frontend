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
});

type ForgotForm = z.infer<typeof schema>;

const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ForgotForm) => {
    forgotPassword(data.email);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <ErrorMessage error={error || undefined} />
        <FormButton type="submit" loading={loading}>
          Send Reset Email
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
