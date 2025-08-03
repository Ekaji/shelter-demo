<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSignup">
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="mt-1">
              <input id="confirmPassword" v-model="confirmPassword" name="confirmPassword" type="password" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">I am a:</label>
            <div class="mt-2 space-y-2">
              <div class="flex items-center">
                <input id="renter" v-model="userType" name="userType" type="radio" value="renter" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                <label for="renter" class="ml-3 block text-sm font-medium text-gray-700">Renter</label>
              </div>
              <div class="flex items-center">
                <input id="landlord" v-model="userType" name="userType" type="radio" value="landlord" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                <label for="landlord" class="ml-3 block text-sm font-medium text-gray-700">Landlord</label>
              </div>
              <div class="flex items-center">
                <input id="agent" v-model="userType" name="userType" type="radio" value="agent" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                <label for="agent" class="ml-3 block text-sm font-medium text-gray-700">Agent</label>
              </div>
            </div>
          </div>

          <!-- Additional fields based on user type -->
          <div v-if="userType === 'renter'">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <input id="firstName" v-model="userDetails.firstName" type="text" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mt-4">
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input id="lastName" v-model="userDetails.lastName" type="text" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mt-4">
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input id="phone" v-model="userDetails.phone" type="tel" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div v-if="userType === 'landlord'">
            <div>
              <label for="landlordName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="landlordName" v-model="userDetails.fullName" type="text" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mt-4">
              <label for="landlordPhone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input id="landlordPhone" v-model="userDetails.phone" type="tel" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div v-if="userType === 'agent'">
            <div>
              <label for="agentName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="agentName" v-model="userDetails.fullName" type="text" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div class="mt-4">
              <label for="agentPhone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input id="agentPhone" v-model="userDetails.phone" type="tel" required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="!loading">Sign up</span>
              <span v-else>Processing...</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div class="mt-6">
            <router-link to="/login" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'renter',
      userDetails: {
        firstName: '',
        lastName: '',
        phone: '',
        fullName: ''
      }
    }
  },
  computed: {
    ...mapState('auth', ['loading', 'error'])
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async handleSignup() {
      if (this.password !== this.confirmPassword) {
        this.$store.commit('auth/setError', 'Passwords do not match')
        return
      }

      try {
        await this.signup({
          email: this.email,
          password: this.password,
          userType: this.userType,
          userDetails: this.getUserDetails()
        })
        
        // Redirect based on user type
        switch (this.userType) {
          case 'renter':
            this.$router.push('/dashboard')
            break
          case 'landlord':
            this.$router.push('/dashboard')
            break
          case 'agent':
            this.$router.push('/dashboard')
            break
          default:
            this.$router.push('/')
        }
      } catch (error) {
        console.error('Signup error:', error)
      }
    },
    getUserDetails() {
      switch (this.userType) {
        case 'renter':
          return {
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
            phone: this.userDetails.phone
          }
        case 'landlord':
          return {
            fullName: this.userDetails.fullName,
            phone: this.userDetails.phone
          }
        case 'agent':
          return {
            fullName: this.userDetails.fullName,
            phone: this.userDetails.phone
          }
        default:
          return {}
      }
    }
  }
}
</script>