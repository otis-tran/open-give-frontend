'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import FormButton from '@/components/FormButton';

const schema = z.object({
  password: z.string().min(6),
});

type ResetForm = z.infer<typeof schema>;

const ResetPasswordPage: React.FC = () => {
  const { resetPassword, loading, error } = useAuth();
  const { token } = useParams<{ token: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ResetForm) => {
    resetPassword(token, data.password);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="New Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <ErrorMessage error={error || undefined} />
        <FormButton type="submit" loading={loading}>
          Reset Password
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
