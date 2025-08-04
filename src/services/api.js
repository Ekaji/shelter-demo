// services/api.js
import API_CONFIG from '@/config/api'

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    console.log('🌐 API Request Details:', {
      url,
      method: options.method || 'POST',
      headers: options.headers || {},
      body: options.body ? JSON.parse(options.body) : null
    })
    
    const defaultOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)
    defaultOptions.signal = controller.signal

    try {
      const response = await fetch(url, defaultOptions)
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `HTTP error! status: ${response.status}`)
      }
      
      const result = await response.text()
      
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: result
      })
      
      try {
        const parsedResult = JSON.parse(result)
        console.log('✅ Parsed Response:', parsedResult)
        return parsedResult
      } catch {
        console.log('⚠️ Response is not JSON, returning as text:', result)
        return result
      }
    } catch (error) {
      console.error('❌ API Request Failed:', {
        error: error.message,
        url,
        status: error.status,
        stack: error.stack
      })
      throw error
    }
  }

  async register(userData) {
    console.log('📝 Registration - Input Data:', userData)
    
    // Handle name conversion based on user type
    let firstname, lastname
    
    if (userData.userType === 'renter') {
      firstname = userData.userDetails.firstName || ''
      lastname = userData.userDetails.lastName || ''
    } else {
      const fullName = userData.userDetails.fullName || ''
      const nameParts = fullName.trim().split(' ')
      firstname = nameParts[0] || ''
      lastname = nameParts.slice(1).join(' ') || ''
    }

    const requestData = {
      email: userData.email,
      password: userData.password,
      accounttype: this.mapUserTypeToAccountType(userData.userType),
      ispartner: userData.userType === 'agent' ? 'YES' : 'NO',
      firstname: firstname,
      lastname: lastname
    }

    console.log('📝 Registration - Processed Request Data:', requestData)

    return this.makeRequest('/register', {
      body: JSON.stringify(requestData)
    })
  }

  // Login user
  async login(credentials) {
    console.log('🔐 Login - Input Credentials:', { email: credentials.email, password: '***' })
    
    const requestData = {
      email: credentials.email,
      password: credentials.password
    }

    console.log('🔐 Login - Request Data:', { email: requestData.email, password: '***' })
    const response = await this.makeRequest('/login', {
      body: JSON.stringify(requestData)
    })
    console.log('🔐 Login - Final Response:', response)
    return response
  }

  mapUserTypeToAccountType(userType) {
    const mapping = {
      'renter': 'individual',
      'landlord': 'individual', 
      'agent': 'individual'
    }
    return mapping[userType] || 'individual'
  }

  async getUserProfile(token) {
    return this.makeRequest('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Logout user (if your API supports it)
  async logout(token) {
    return this.makeRequest('/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Check account status (if your API supports it)
  async checkAccountStatus(email) {
    console.log('🔍 Checking account status for:', email)
    return this.makeRequest('/check-status', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }
}

export default new ApiService() 