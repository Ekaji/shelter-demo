// store/auth.js
import apiService from '@/services/api'

export default {
  namespaced: true,
  state: {
    user: null,
    userData: null,
    token: null,
    loading: false,
    error: null,
    initialized: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setToken(state, token) {
      state.token = token;
      // Store token in localStorage for persistence
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setInitialized(state) {
      state.initialized = true;
    },
    clearAuth(state) {
      state.user = null;
      state.userData = null;
      state.token = null;
    }
  },
  actions: {
    // Initialize auth state from localStorage
    async initializeAuth({ commit }) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // Try to validate the token with the API
        try {
          // You can add a token validation endpoint here if your API supports it
          // For now, we'll just check if the token exists and is not expired
          // You might want to decode the JWT token to check expiration
          commit('setToken', token);
          commit('setUser', { token });
          // Don't set default user data - let the API provide it
          commit('setUserData', null);
        } catch (error) {
          // If token validation fails, clear the auth state
          console.log('Token validation failed, clearing auth state');
          commit('clearAuth');
        }
      }
      commit('setInitialized');
    },

    async signup({ commit }, { email, password, userType, userDetails }) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const response = await apiService.register({
          email,
          password,
          userType,
          userDetails
        });

        // Handle the API response
        // You may need to adjust this based on your API's actual response format
        if (response.success || response.token) {
          const token = response.token || response.access_token;
          const userData = {
            email,
            userType,
            ...userDetails,
            ...response.user // if your API returns user data
          };

          commit("setToken", token);
          commit("setUser", { email, token });
          commit("setUserData", userData);
          return userData;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      } catch (error) {
        let errorMessage = error.message;
        if (error.message.includes('email') && error.message.includes('already')) {
          errorMessage = "This email is already registered";
        } else if (error.message.includes('password')) {
          errorMessage = "Password should be at least 6 characters";
        }
        commit("setError", errorMessage);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async login({ commit }, { email, password }) {
      commit("setLoading", true);
      commit("clearError");
      try {
        console.log('Store login - attempting login with:', { email })
        const response = await apiService.login({
          email,
          password
        });

        console.log('Store login - API response received:', response)

        // Handle the API response
        // You may need to adjust this based on your API's actual response format
        console.log('Store login - checking response format:', {
          hasSuccess: !!response.success,
          hasToken: !!response.token,
          hasAccessToken: !!response.access_token,
          responseKeys: Object.keys(response)
        })

        if (response.success || response.token || response.access_token) {
          const token = response.token || response.access_token;
          const userData = {
            email,
            userType: response.userType || response.user?.userType || 'renter',
            ...response.user // if your API returns user data
          };

          console.log('✅ Store login - setting auth state with:', { token: !!token, userData })
          commit("setToken", token);
          commit("setUser", { email, token });
          commit("setUserData", userData);
          return userData;
        } else if (response.status === 'error' || response.error) {
          // Check for specific error types
          const errorMsg = response.message || response.error || response.msg || 'Login failed'
          console.log('❌ Store login - API returned error status:', errorMsg)
          
          // Check for common activation/verification errors
          if (errorMsg.toLowerCase().includes('verify') || 
              errorMsg.toLowerCase().includes('confirm') || 
              errorMsg.toLowerCase().includes('activation') ||
              errorMsg.toLowerCase().includes('email')) {
            throw new Error('Please check your email and click the confirmation link before logging in.')
          }
          
          throw new Error(errorMsg)
        } else {
          console.log('❌ Store login - login failed, response:', response)
          console.log('❌ Store login - response type:', typeof response)
          console.log('❌ Store login - response keys:', Object.keys(response))
          
          // Check for common error patterns
          let errorMessage = 'Login failed'
          if (response.message) errorMessage = response.message
          else if (response.error) errorMessage = response.error
          else if (response.msg) errorMessage = response.msg
          else if (typeof response === 'string') errorMessage = response
          else if (response.status === 'error') errorMessage = response.message || 'Login failed'
          
          console.log('❌ Store login - final error message:', errorMessage)
          throw new Error(errorMessage);
        }
      } catch (error) {
        let errorMessage = error.message;
        if (error.message.includes('Invalid') || error.message.includes('credentials')) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes('too many')) {
          errorMessage = "Account temporarily locked due to too many attempts";
        }
        commit("setError", errorMessage);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async logout({ commit, state }) {
      try {
        // Optionally call logout API if token exists
        if (state.token) {
          try {
            await apiService.logout(state.token);
          } catch (error) {
            // Don't throw error if logout API fails
            console.log('Logout API call failed:', error);
          }
        }
      } catch (error) {
        console.log('Error during logout:', error);
      } finally {
        // Always clear local auth state
        commit("clearAuth");
        commit("setInitialized");
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userType: (state) => state.userData?.userType,
    userData: (state) => state.userData,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
    currentUserId: (state) => state.user?.id,
    currentUserEmail: (state) => state.user?.email,
    isInitialized: (state) => state.initialized,
    token: (state) => state.token,
  },
};
