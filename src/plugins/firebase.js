// // plugins/firebase.js
// import Vue from 'vue'
// import { auth, db, storage } from '@/firebase/config'
// import store from '@/store' // Import the main store instance, not the auth module directly

// // Handle auth state changes
// // auth.onAuthStateChanged(async (user) => {
// //   if (user) {
// //     const userDoc = await db.collection('users').doc(user.uid).get()
// //     if (userDoc.exists) {
// //       store.commit('auth/setUser', user)
// //       store.commit('auth/setUserData', userDoc.data())
// //     }
// //   } else {
// //     store.commit('auth/setUser', null)
// //     store.commit('auth/setUserData', null)
// //   }
// // })

// auth.onAuthStateChanged(async (user) => {
//   if (user) {
//     const userDoc = await db.collection('users').doc(user.uid).get()
//     if (userDoc.exists) {
//       store.commit('auth/setUser', user)
//       store.commit('auth/setUserData', userDoc.data())
//       store.commit('auth/setInitialized')
//     }
//   } else {
//     store.commit('auth/setUser', null)
//     store.commit('auth/setUserData', null)
//   }
//   store.commit('auth/setInitialized')
// })

// // Make Firebase available globally
// Vue.prototype.$firebase = {
//   auth,
//   db,
//   storage
// }

// export { auth, db, storage }


// plugins/firebase.js
import Vue from 'vue'
import { auth, db, storage } from '@/firebase/config'
import store from '@/store'

// Track if we've initialized auth state
let authInitialized = false

// Handle auth state changes
auth.onAuthStateChanged(async (user) => {
  try {
    if (user) {
      const userDoc = await db.collection('users').doc(user.uid).get()
      if (userDoc.exists) {
        store.commit('auth/setUser', user)
        store.commit('auth/setUserData', userDoc.data())
      } else {
        // User document doesn't exist - handle this case
        console.warn('User document not found for uid:', user.uid)
        store.commit('auth/setUser', null)
        store.commit('auth/setUserData', null)
      }
    } else {
      // No user is signed in
      store.commit('auth/setUser', null)
      store.commit('auth/setUserData', null)
    }
  } catch (error) {
    console.error('Error during auth state change:', error)
    store.commit('auth/setError', 'Failed to initialize authentication')
  } finally {
    if (!authInitialized) {
      store.commit('auth/setInitialized')
      authInitialized = true
    }
  }
})

// Make Firebase available globally
Vue.prototype.$firebase = {
  auth,
  db,
  storage
}

export { auth, db, storage }