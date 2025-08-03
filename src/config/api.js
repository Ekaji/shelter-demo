// config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
}

export default API_CONFIG 