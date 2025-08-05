// config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.VUE_APP_BASE_URL,
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
}

export default API_CONFIG 