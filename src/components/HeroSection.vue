<template>
  <section class="bg-white min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center">
        <!-- Left Column - Text Content -->
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Property Financing and Management For Every African.
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Shelta makes living sustainable, affordable, accessible, peaceful and rewarding for all.
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              @click="createAccount"
              class="bg-[#0033ea] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 shadow-md hover:shadow-lg"
            >
              Create a free account
            </button>
            <button 
              @click="contactSales"
              class="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-md transition duration-200 shadow-sm hover:shadow-md"
            >
              Contact sales
            </button>
          </div>
        </div>

        <!-- Right Column - Image -->
        <div class="relative rounded-xl overflow-hidden shadow-xl">
          <img 
            :src="require('/public/firsthero.63beec61.svg')" 
            alt="Modern African housing" 
            class="w-full h-auto object-cover"
          >
          <!-- <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 mix-blend-multiply"></div> -->
        </div>
        <!-- <div class="md:w-1/2 min-h-screen">
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    createAccount() {
      console.log('Create account clicked');
      // Add your create account logic here
    },
    contactSales() {
      console.log('Contact sales clicked');
      // Add your contact sales logic here
    }
  }
}
</script>

<style scoped>
/* Custom animations can be added here if needed */
.container {
  max-width: 1280px;
}

button {
  transition: all 0.3s ease;
}

</style>