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
        commit('setToken', token);
        // You might want to validate the token with your API here
        // For now, we'll assume it's valid
        commit('setUser', { token });
        commit('setUserData', { userType: 'renter' }); // Default user type
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
        const response = await apiService.login({
          email,
          password
        });

        // Handle the API response
        // You may need to adjust this based on your API's actual response format
        if (response.success || response.token) {
          const token = response.token || response.access_token;
          const userData = {
            email,
            userType: response.userType || response.user?.userType || 'renter',
            ...response.user // if your API returns user data
          };

          commit("setToken", token);
          commit("setUser", { email, token });
          commit("setUserData", userData);
          return userData;
        } else {
          throw new Error(response.message || 'Login failed');
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

    async logout({ commit }) {
      commit("clearAuth");
      commit("setInitialized");
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
