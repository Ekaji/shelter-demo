// import Vue from "vue";
// import VueRouter from "vue-router";
// import store from "@/store/auth"; // Assuming you have a Vuex store set up

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: () => import("@/views/Home.vue"),
//     meta: { requiresAuth: false },
//   },
//   {
//     path: "/about",
//     name: "About",
//     component: () => import("@/views/About.vue"),
//     meta: { requiresAuth: false },
//   },
//   {
//     path: "/signup",
//     name: "SignUp",
//     component: () => import("@/views/Signup.vue"),
//     meta: { requiresAuth: false },
//   },
//   {
//     path: "/login",
//     name: "login",
//     component: () => import("@/views/Login.vue"),
//     meta: { requiresAuth: false },
//   },
//   {
//     path: "/dashboard",
//     name: "dashboard",
//     component: () => import("@/views/Dashboard.vue"),
//     meta: { requiresAuth: true, allowedRoles: ["renter", "landlord", "agent"] },
//   },
// ];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const allowedRoles = to.meta.allowedRoles
//   const isAuthenticated = store.getters['auth/isAuthenticated']
//   const userType = store.getters['auth/userType']

//   if (requiresAuth && !isAuthenticated) {
//     next('/login')
//   } else if (requiresAuth && isAuthenticated && allowedRoles && !allowedRoles.includes(userType)) {
//     next('/') // or to a not-authorized page
//   } else {
//     next()
//   }
// })


// export default router;


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

// Simplified auth initialization check
let authInitialized = false

// Listen for auth state changes once when router is created
const unsubscribe = store.subscribe((mutation) => {
  if (mutation.type === 'auth/SET_INITIALIZED') {
    authInitialized = true
    unsubscribe()
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
  
  // If auth isn't initialized yet, wait briefly
  if (!authInitialized) {
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  const isAuthenticated = store.getters['auth/isAuthenticated']
  const userType = store.getters['auth/userType']

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
