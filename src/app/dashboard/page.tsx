'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthProvider';

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Thông tin người dùng</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Tên:</span> {user?.full_name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium">Vai trò:</span>{' '}
              {user?.role === 'donor' ? 'Nhà tài trợ' : 'Người thụ hưởng'}
            </p>
            <p>
              <span className="font-medium">Trạng thái xác thực:</span>{' '}
              {user?.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
            </p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Đăng xuất
        </button>
      </div>
    </ProtectedRoute>
  );
}
