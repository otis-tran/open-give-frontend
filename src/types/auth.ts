// === User & Profile Types ===
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_verified: boolean;
  avatar_url?: string;
  phone?: string;
  two_factor_enabled?: boolean;
}

export interface UserProfile {
  sub: string;
  email: string;
  full_name: string;
  role: 'donor' | 'beneficiary' | 'admin';
  is_verified: boolean;
  iat?: number;
  exp?: number;
}

// === Request Types ===
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone?: string;
  role: 'donor' | 'beneficiary';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginWithTwoFactorRequest extends LoginRequest {
  twoFactorCode?: string;
}

export interface TwoFactorCodeRequest {
  code: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// === Response Types ===
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: User;
  requiresTwoFactor?: boolean;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface TwoFactorResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface LoginHistoryItem {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  login_time: string;
  is_current_session?: boolean;
}

export interface LoginHistoryResponse {
  data: LoginHistoryItem[];
  total: number;
  page?: number;
  limit?: number;
}

// === Error Types ===
export interface ErrorResponse {
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  validation_errors?: ValidationError[];
}

// === API Response Wrapper ===
export interface ApiResponse<T = Record<string, unknown>> {
  // ✅ Thay any bằng generic với default
  data?: T;
  message?: string;
  error?: string;
  success: boolean;
}

// === Query Parameters ===
export interface LoginHistoryQuery {
  limit?: number;
  page?: number;
  from_date?: string;
  to_date?: string;
}

// === JWT Payload Types ===
export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  iat: number;
  exp: number;
}

// === Cookie Options ===
export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

// === Auth Context Types (for frontend) ===
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  loginWithTwoFactor: (credentials: LoginWithTwoFactorRequest) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  refreshTokens: () => Promise<void>;
  setupTwoFactor: () => Promise<TwoFactorSetupResponse>;
  enableTwoFactor: (code: string) => Promise<void>;
  disableTwoFactor: (code: string) => Promise<void>;
}

// === Common Types ===
export type UserRole = 'donor' | 'beneficiary' | 'admin';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

// === HTTP Status Codes ===
export const AUTH_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// === Error Messages ===
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ',
  EMAIL_ALREADY_EXISTS: 'Email đã được sử dụng',
  PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp',
  INVALID_ROLE: 'Vai trò không hợp lệ',
  TOKEN_EXPIRED: 'Token đã hết hạn',
  INVALID_TOKEN: 'Token không hợp lệ',
  TWO_FACTOR_REQUIRED: 'Cần xác thực 2FA',
  INVALID_TWO_FACTOR_CODE: 'Mã 2FA không hợp lệ',
  UNAUTHORIZED_ACCESS: 'Không có quyền truy cập',
  USER_NOT_FOUND: 'Người dùng không tồn tại',
  SERVER_ERROR: 'Lỗi máy chủ nội bộ',
} as const;

// === Success Messages ===
export const AUTH_SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Đăng ký thành công',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công khỏi thiết bị hiện tại',
  LOGOUT_ALL_SUCCESS: 'Đăng xuất thành công khỏi tất cả thiết bị',
  TWO_FACTOR_ENABLED: '2FA đã được kích hoạt thành công',
  TWO_FACTOR_DISABLED: '2FA đã được tắt thành công',
  PASSWORD_RESET_SENT: 'Email đặt lại mật khẩu đã được gửi',
  PASSWORD_RESET_SUCCESS: 'Đặt lại mật khẩu thành công',
  PASSWORD_CHANGED: 'Đổi mật khẩu thành công',
} as const;
