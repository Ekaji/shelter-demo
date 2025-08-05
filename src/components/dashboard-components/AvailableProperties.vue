<template>
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Available Properties</h3>
  <div class="border border-gray-200 rounded-lg p-4">
    <div class="relative">
      <!-- Carousel Container -->
      <div class="relative overflow-hidden">
        <!-- Carousel Track -->
        <div class="flex transition-transform duration-300 ease-in-out" :style="`transform: translateX(-${currentIndex * 100}%)`">
          <!-- Property Slide 1 -->
          <div class="w-full flex-shrink-0">
            <div class="flex flex-col gap-4">
              <div class="w-full h-48 bg-gray-200 rounded-lg bg-cover bg-center" 
                   style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'120\' viewBox=\'0 0 200 120\'%3E%3Crect width=\'200\' height=\'120\' fill=\'%23e5e5e5\'/%3E%3Cpath d=\'M20,60 L60,20 L140,20 L180,60 L180,100 L20,100 Z\' fill=\'%23ccc\'/%3E%3Crect x=\'40\' y=\'40\' width=\'30\' height=\'40\' fill=\'%23999\'/%3E%3Crect x=\'130\' y=\'40\' width=\'30\' height=\'40\' fill=\'%23999\'/%3E%3C/svg%3E');">
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">3 bedroom flat</h4>
                <div class="text-sm text-gray-600 mb-3">PIN: 2405200859</div>
                <div class="flex items-center gap-4 mb-3 text-gray-600">
                  <span class="flex items-center gap-1 text-sm">
                    <i class="fas fa-bed"></i> 3 Beds
                  </span>
                  <span class="flex items-center gap-1 text-sm">
                    <i class="fas fa-bath"></i> 2 Baths
                  </span>
                </div>
                <div class="mb-3">
                  <span class="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700">Lagos</span>
                </div>
                <div class="text-xl font-bold text-blue-600 mb-4">₦750,000/Year</div>
                <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <!-- Property Slide 2 -->
          <div class="w-full flex-shrink-0">
            <div class="flex flex-col gap-4">
              <div class="w-full h-48 bg-gray-200 rounded-lg bg-cover bg-center" 
                   style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'120\' viewBox=\'0 0 200 120\'%3E%3Crect width=\'200\' height=\'120\' fill=\'%23e5e5e5\'/%3E%3Cpath d=\'M20,60 L60,20 L140,20 L180,60 L180,100 L20,100 Z\' fill=\'%23ccc\'/%3E%3Crect x=\'40\' y=\'40\' width=\'30\' height=\'40\' fill=\'%23999\'/%3E%3Crect x=\'130\' y=\'40\' width=\'30\' height=\'40\' fill=\'%23999\'/%3E%3C/svg%3E');">
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">2 bedroom apartment</h4>
                <div class="text-sm text-gray-600 mb-3">PIN: 2405200860</div>
                <div class="flex items-center gap-4 mb-3 text-gray-600">
                  <span class="flex items-center gap-1 text-sm">
                    <i class="fas fa-bed"></i> 2 Beds
                  </span>
                  <span class="flex items-center gap-1 text-sm">
                    <i class="fas fa-bath"></i> 1 Bath
                  </span>
                </div>
                <div class="mb-3">
                  <span class="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700">Abuja</span>
                </div>
                <div class="text-xl font-bold text-blue-600 mb-4">₦500,000/Year</div>
                <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button @click="prevSlide" class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
        <i class="fas fa-chevron-left text-gray-600"></i>
      </button>
      <button @click="nextSlide" class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
        <i class="fas fa-chevron-right text-gray-600"></i>
      </button>

      <!-- Indicators -->
      <div class="flex justify-center mt-4 space-x-2">
        <button v-for="(item, index) in 2" :key="index" 
                @click="goToSlide(index)"
                :class="`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`">
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AvailableProperties',
  data() {
    return {
      currentIndex: 0,
      totalSlides: 2
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    },
    goToSlide(index) {
      this.currentIndex = index;
    }
  }
}
</script>