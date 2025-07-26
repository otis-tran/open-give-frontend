'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useAuth from '@/hooks/useAuth';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Xây dựng schema đầy đủ
const schema = z
  .object({
    email: z.string().email('Vui lòng nhập email hợp lệ.'),
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự.'),
    confirmPassword: z.string().min(6),
    full_name: z.string().min(6, 'Họ tên ít nhất 6 ký tự.'),
    phone: z.string().min(10, 'Số điện thoại ít nhất 10 số.'),
    role: z.enum(['donor', 'beneficiary'], { message: 'Vai trò không hợp lệ' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu nhập lại không khớp.',
      });
    }
  });

type RegisterForm = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  // 2. Submit đúng body theo API
  const onSubmit = (data: RegisterForm) => {
    registerUser({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      full_name: data.full_name,
      phone: data.phone,
      role: data.role,
    });
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6">Register</h2>
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
        <FormInput
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <FormInput
          label="Full Name"
          type="text"
          {...register('full_name')}
          error={errors.full_name?.message}
        />
        <FormInput label="Phone" type="text" {...register('phone')} error={errors.phone?.message} />
        <label className="block mb-2 font-medium">Role</label>
        <select {...register('role')} className="input-class">
          <option value="">Chọn loại</option>
          <option value="donor">Donor</option>
          <option value="beneficiary">Beneficiary</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        <ErrorMessage error={error || undefined} />
        <FormButton type="submit" loading={loading}>
          Register
        </FormButton>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
