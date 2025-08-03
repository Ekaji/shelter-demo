import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

// Note: Vue 2 doesn't have built-in composition API
// If you want to use this pattern, install @vue/composition-api first:
// npm install @vue/composition-api

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)
  const store = useStore()

  onMounted(async () => {
    // Initialize auth state
    await store.dispatch('auth/initializeAuth')
    
    // Set up reactive user state
    user.value = store.getters['auth/userData']
    loading.value = false
    
    // Watch for auth state changes
    store.watch(
      (state) => state.auth.userData,
      (newUserData) => {
        user.value = newUserData
      }
    )
    
    store.watch(
      (state) => state.auth.loading,
      (newLoading) => {
        loading.value = newLoading
      }
    )
  })

  const logout = async () => {
    try {
      await store.dispatch('auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const login = async (credentials) => {
    try {
      return await store.dispatch('auth/login', credentials)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      return await store.dispatch('auth/signup', userData)
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    logout,
    login,
    signup,
    isAuthenticated: () => store.getters['auth/isAuthenticated'],
    userType: () => store.getters['auth/userType'],
    error: () => store.getters['auth/error']
  }
}