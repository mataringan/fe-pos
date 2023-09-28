// api/endpoints.js
// const API_URL = "https://vwvk0hdp-8000.asse.devtunnels.ms";
const API_URL = "http://localhost:8000";

export const REGISTER_API = `${API_URL}/register`;
export const LOGIN_API = `${API_URL}/login`;
export const VERIFY_USER = `${API_URL}/verify-user`;
export const RESEND_OTP = `${API_URL}/resend-otp`;
export const FORGOT_PASSWORD = `${API_URL}/forgot-password`;
export const RESET_PASSWORD = `${API_URL}/reset-password`;
export const WHOAMI = `${API_URL}/whoami`;
export const GET_ALL_USER = `${API_URL}/all-user-karyawan`;
export const ADD_PRODUCT = `${API_URL}/product`;
export const GET_PRODUCT = `${API_URL}/product`;
export const TRANSACTION = `${API_URL}/transaction`;
export const TRANSACTION_ADMIN = `${API_URL}/all-transaction`;
export const TRANSACTION_ADDRESS = `${API_URL}/transaction-address`;
export const NEW_TRANSACTION = `${API_URL}/transaction-new`;
export const INFORMATION = `${API_URL}/information`;

// tambahkan lebih banyak URL endpoint sesuai kebutuhan Anda
