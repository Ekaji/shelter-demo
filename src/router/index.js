// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true, allowedRoles: ['renter', 'landlord', 'agent'] }
    }
  ]
})

// Initialize auth state when router is created
store.dispatch('auth/initializeAuth')

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
  
  // Wait for auth to be initialized
  if (!store.getters['auth/isInitialized']) {
    await store.dispatch('auth/initializeAuth')
  }

  const isAuthenticated = store.getters['auth/isAuthenticated']
  const userType = store.getters['auth/userType']
  const userData = store.getters['auth/userData']

  // If user has token but no user data, they might have a stale token
  if (isAuthenticated && !userData) {
    // Clear the stale token directly without calling logout action
    store.commit('auth/clearAuth')
    store.commit('auth/setInitialized')
    return next('/login')
  }

  if (hideForAuth && isAuthenticated) {
    return next('/dashboard')
  }

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (requiresAuth && to.meta.allowedRoles && !to.meta.allowedRoles.includes(userType)) {
    return next('/dashboard')
  }

  next()
})

export default router
