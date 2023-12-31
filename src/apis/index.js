// api/endpoints.js
const API_URL = "https://0gpshzkd-8000.asse.devtunnels.ms";

// const API_URL = "http://localhost:8000";

export const REGISTER_API = `${API_URL}/register`;
export const ADD_USER = `${API_URL}/add-user`;
export const GET_USER = `${API_URL}/user`;
export const LOGIN_API = `${API_URL}/login`;
export const VERIFY_USER = `${API_URL}/verify-user`;
export const RESEND_OTP = `${API_URL}/resend-otp`;
export const FORGOT_PASSWORD = `${API_URL}/forgot-password`;
export const RESET_PASSWORD = `${API_URL}/reset-password`;
export const WHOAMI = `${API_URL}/whoami`;
export const GET_ALL_USER = `${API_URL}/all-user-karyawan`;
export const GET_ALL_USER_BY_ADMIN = `${API_URL}/all-user`;
export const ADD_PRODUCT = `${API_URL}/product`;
export const GET_PRODUCT = `${API_URL}/product`;
export const TRANSACTION = `${API_URL}/transaction`;
export const TRANSACTION_EMAIL = `${API_URL}/transaction-email`;
export const TRANSACTION_BY_USER = `${API_URL}/transactionByIdUser`;
export const TRANSACTION_ADMIN = `${API_URL}/all-transaction`;
export const TRANSACTION_ADDRESS = `${API_URL}/transaction-address`;
export const NEW_TRANSACTION = `${API_URL}/transaction-new`;
export const INFORMATION = `${API_URL}/information`;
export const LEADERBOARD_BUYER = `${API_URL}/pointsBuyer`;
export const POINT_EMPLOYEE = `${API_URL}/pointsAllEmployee`;
export const POINT_BUYER = `${API_URL}/pointsByQuery`;
export const POINT_USER = `${API_URL}/pointsIdUser`;
export const REWARD = `${API_URL}/reward`;
export const REWARD_BUYER = `${API_URL}/reward-buyer`;
export const REWARD_BY_POINT_BUYER = `${API_URL}/rewardbypoin`;
export const REWARD_EMPLOYEE = `${API_URL}/reward-employee`;
export const REWARD_AVAILABLE_EMPLOYEE = `${API_URL}/reward-available-employee`;
export const CLAIM_REWARD = `${API_URL}/claim-reward`;
