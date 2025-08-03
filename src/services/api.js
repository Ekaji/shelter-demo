// services/api.js
import API_CONFIG from '@/config/api'

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
  }
  
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    // Add timeout
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
      
      try {
        return JSON.parse(result)
      } catch {
        return result
      }
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Register user
  async register(userData) {
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

    return this.makeRequest('/register', {
      body: JSON.stringify(requestData)
    })
  }

  // Login user
  async login(credentials) {
    const requestData = {
      email: credentials.email,
      password: credentials.password
    }

    return this.makeRequest('/login', {
      body: JSON.stringify(requestData)
    })
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
}

export default new ApiService() 