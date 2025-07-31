<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="text-xl font-bold text-gray-900">YourLogo</a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-gray-900 hover:text-[#0033ea] px-3 py-2 text-sm font-medium">Home</a>
          <a href="#" class="text-gray-900 hover:text-[#0033ea] px-3 py-2 text-sm font-medium">About</a>
          <a href="#" class="text-gray-900 hover:text-[#0033ea] px-3 py-2 text-sm font-medium">Blog</a>

          <!-- Services Dropdown -->
          <custom-dropdown label="Services" additional-classes="w-48">
            <template #trigger="{ isOpen }">
              <button class="flex items-center text-gray-900 hover:text-[#0033ea] px-3 py-2 text-sm font-medium focus:outline-none">
                Services
                <svg
                  :class="['ml-1 w-4 h-4 transition-transform duration-200', { 'transform rotate-180': isOpen }]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </template>
            <dropdown-item>Web Development</dropdown-item>
            <dropdown-item>Mobile Apps</dropdown-item>
            <dropdown-item>Consulting</dropdown-item>
          </custom-dropdown>

          <!-- Support Dropdown -->
          <custom-dropdown label="Support" additional-classes="w-48">
            <template #trigger="{ isOpen }">
              <button class="flex items-center text-gray-900 hover:text-[#0033ea] px-3 py-2 text-sm font-medium focus:outline-none">
                Support
                <svg
                  :class="['ml-1 w-4 h-4 transition-transform duration-200', { 'transform rotate-180': isOpen }]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </template>
            <dropdown-item>FAQ</dropdown-item>
            <dropdown-item>Contact Us</dropdown-item>
            <dropdown-item>Documentation</dropdown-item>
          </custom-dropdown>

          <div class="flex items-center space-x-4 ml-4">
            <custom-button variant="outline" size="sm" @click="login">Login</custom-button>
            <custom-button variant="primary" size="sm" @click="signup">Sign Up</custom-button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="[isMobileMenuOpen ? 'hidden' : 'block', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              :class="[isMobileMenuOpen ? 'block' : 'hidden', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1 px-2">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-[#0033ea] hover:bg-gray-50"
            >Home</a
          >
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-[#0033ea] hover:bg-gray-50"
            >About</a
          >
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-[#0033ea] hover:bg-gray-50"
            >Blog</a
          >

          <!-- Services Dropdown Mobile -->
          <div @click="toggleMobileDropdown('services')" class="px-3 py-2">
            <button class="w-full flex justify-between items-center text-base font-medium text-gray-900 hover:text-[#0033ea]">
              Services
              <svg
                :class="[
                  'ml-1 w-4 h-4 transition-transform duration-200',
                  { 'transform rotate-180': mobileDropdownOpen === 'services' }
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileDropdownOpen === 'services'" class="mt-2 space-y-1 pl-4">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >Web Development</a
              >
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >Mobile Apps</a
              >
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >Consulting</a
              >
            </div>
          </div>

          <!-- Support Dropdown Mobile -->
          <div @click="toggleMobileDropdown('support')" class="px-3 py-2">
            <button class="w-full flex justify-between items-center text-base font-medium text-gray-900 hover:text-[#0033ea]">
              Support
              <svg
                :class="[
                  'ml-1 w-4 h-4 transition-transform duration-200',
                  { 'transform rotate-180': mobileDropdownOpen === 'support' }
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="mobileDropdownOpen === 'support'" class="mt-2 space-y-1 pl-4">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >FAQ</a
              >
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >Contact Us</a
              >
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0033ea] hover:bg-gray-50"
                >Documentation</a
              >
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex space-x-4">
              <custom-button
                variant="outline"
                size="sm"
                additional-classes="w-full justify-center"
                @click="login"
                >Login</custom-button
              >
              <custom-button
                variant="primary"
                size="sm"
                additional-classes="w-full justify-center"
                @click="signup"
                >Sign Up</custom-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import CustomButton from './CustomButton.vue'
import CustomDropdown from './CustomDropdown.vue'
import DropdownItem from './DropdownItem.vue'

export default {
  name: 'ResponsiveNavbar',
  components: {
    CustomButton,
    CustomDropdown,
    DropdownItem
  },
  data() {
    return {
      isMobileMenuOpen: false,
      mobileDropdownOpen: null
    }
  },
  methods: {
    toggleMobileDropdown(dropdown) {
      this.mobileDropdownOpen = this.mobileDropdownOpen === dropdown ? null : dropdown
    },
    login() {
      console.log('Login clicked')
      this.isMobileMenuOpen = false
      // Add your login logic here
    },
    signup() {
      console.log('Sign Up clicked')
      this.isMobileMenuOpen = false
      // Add your signup logic here
    }
  }
}
</script>