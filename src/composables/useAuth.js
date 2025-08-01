import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

// Note: Vue 2 doesn't have built-in composition API
// If you want to use this pattern, install @vue/composition-api first:
// npm install @vue/composition-api

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  })

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    loading,
    logout
  }
}