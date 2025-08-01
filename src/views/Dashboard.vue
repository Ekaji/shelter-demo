<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-lg font-bold text-indigo-600">
              {{ dashboardTitle }} Dashboard
            </h1>
          </div>
          <div class="ml-6 flex items-center space-x-4">
            <router-link 
              v-if="userType === 'agent'" 
              to="/properties" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              My Listings
            </router-link>
            <router-link 
              v-if="userType === 'landlord'" 
              to="/my-properties" 
              class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              My Properties
            </router-link>
            <button 
              @click="logout" 
              class="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Header -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900">
            Welcome, {{ userDisplayName }}
          </h2>
          <p class="mt-2 text-gray-600">
            {{ welcomeMessage }}
          </p>
        </div>

        <!-- Dashboard Content -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Renter Specific Content -->
          <div 
            v-if="userType === 'renter'" 
            class="bg-white p-6 rounded-lg shadow"
          >
            <h3 class="text-lg font-medium text-gray-900">Saved Properties</h3>
            <p class="mt-2 text-gray-600">
              View your saved properties and upcoming viewings.
            </p>
            <router-link 
              to="/saved-properties" 
              class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              View properties
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>

          <!-- Landlord Specific Content -->
          <div 
            v-if="userType === 'landlord'" 
            class="bg-white p-6 rounded-lg shadow"
          >
            <h3 class="text-lg font-medium text-gray-900">Property Management</h3>
            <p class="mt-2 text-gray-600">
              Manage your {{ userData.propertiesOwned || 0 }} properties and tenants.
            </p>
            <router-link 
              to="/manage-properties" 
              class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              Manage properties
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>

          <!-- Agent Specific Content -->
          <div 
            v-if="userType === 'agent'" 
            class="bg-white p-6 rounded-lg shadow"
          >
            <h3 class="text-lg font-medium text-gray-900">Listings Dashboard</h3>
            <p class="mt-2 text-gray-600">
              Manage your property listings and client appointments.
            </p>
            <div class="mt-4 space-y-2">
              <router-link 
                to="/create-listing" 
                class="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                Create new listing
              </router-link>
              <router-link 
                to="/appointments" 
                class="block inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                View appointments
              </router-link>
            </div>
          </div>

          <!-- Common Content for All Users -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Account Settings</h3>
            <p class="mt-2 text-gray-600">
              Update your profile information and preferences.
            </p>
            <router-link 
              to="/settings" 
              class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              Go to settings
            </router-link>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Notifications</h3>
            <p class="mt-2 text-gray-600">
              View your recent notifications and messages.
            </p>
            <router-link 
              to="/notifications" 
              class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              View notifications
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DashboardView',
  computed: {
    ...mapGetters('auth', ['userData', 'userType']),
    
    userDisplayName() {
      if (this.userType === 'renter') {
        return this.userData.firstName || 'Renter'
      } else if (this.userType === 'landlord' || this.userType === 'agent') {
        return this.userData.fullName || this.userType.charAt(0).toUpperCase() + this.userType.slice(1)
      }
      return 'User'
    },
    
    dashboardTitle() {
      return {
        renter: 'Renter',
        landlord: 'Landlord',
        agent: 'Agent'
      }[this.userType] || 'User'
    },
    
    welcomeMessage() {
      const messages = {
        renter: 'Find your perfect home from our listings.',
        landlord: 'Manage your properties and tenants efficiently.',
        agent: 'Connect buyers and sellers with our platform.'
      }
      return messages[this.userType] || 'Welcome to your dashboard'
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async logout() {
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
  }
}
</script>