// store/auth.js
import { auth, db, firebase } from "@/firebase/config";

export default {
  namespaced: true,
  state: {
    user: null,
    userData: null,
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
  },
  actions: {
    async signup({ commit }, { email, password, userType, userDetails }) {
      commit("setLoading", true);
      commit("clearError");
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;

        await db
          .collection("users")
          .doc(user.uid)
          .set({
            email,
            userType,
            ...userDetails,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

        commit("setUser", user);
        commit("setUserData", { userType, ...userDetails });
        return user;
      } catch (error) {
        let errorMessage = error.message;
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered";
        } else if (error.code === "auth/weak-password") {
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
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;

        const userDoc = await db.collection("users").doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          commit("setUser", user);
          commit("setUserData", userData);
          return userData; // This is what we're using in the component
        }
        throw new Error("User data not found");
      } catch (error) {
        let errorMessage = error.message;
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          errorMessage = "Invalid email or password";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Account temporarily locked due to too many attempts";
        }
        commit("setError", errorMessage);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    // async login({ commit }, { email, password }) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   try {
    //     const userCredential = await auth.signInWithEmailAndPassword(email, password)
    //     const user = userCredential.user

    //     // Get user data from Firestore
    //     const userDoc = await db.collection('users').doc(user.uid).get()
    //     if (userDoc.exists) {
    //       commit('setUser', user)
    //       commit('setUserData', userDoc.data())
    //       return userDoc.data() // Return user data for redirection
    //     }
    //     throw new Error('User data not found')
    //   } catch (error) {
    //     let errorMessage = error.message
    //     if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
    //       errorMessage = 'Invalid email or password'
    //     } else if (error.code === 'auth/too-many-requests') {
    //       errorMessage = 'Account temporarily locked due to too many attempts'
    //     }
    //     commit('setError', errorMessage)
    //     throw error
    //   } finally {
    //     commit('setLoading', false)
    //   }
    // },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit("setUser", null);
        commit("setUserData", null);
      } catch (error) {
        commit("setError", "Failed to logout. Please try again.");
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userType: (state) => state.userData?.userType,
    userData: (state) => state.userData,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
    currentUserId: (state) => state.user?.uid,
    currentUserEmail: (state) => state.user?.email,
    isInitialized: (state) => state.initialized,
  },
};
