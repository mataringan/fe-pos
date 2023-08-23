// api/endpoints.js
const API_URL = "http://localhost:8000";

export const REGISTER_API = `${API_URL}/register`;
export const LOGIN_API = `${API_URL}/login`;
export const VERIFY_USER = `${API_URL}/verify-user`;
export const RESEND_OTP = `${API_URL}/resend-otp`;
export const FORGOT_PASSWORD = `${API_URL}/forgot-password`;
export const RESET_PASSWORD = `${API_URL}/reset-password`;
export const WHOAMI = `${API_URL}/whoami`;
export const ADD_PRODUCT = `${API_URL}/product`;
export const GET_PRODUCT = `${API_URL}/product`;
export const TRANSACTION = `${API_URL}/transaction`;
export const TRANSACTION_ADMIN = `${API_URL}/all-transaction`;

// tambahkan lebih banyak URL endpoint sesuai kebutuhan Anda
