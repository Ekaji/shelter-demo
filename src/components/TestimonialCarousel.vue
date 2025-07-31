<template>
  <section class="py-16" >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with Navigation -->
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">{{ title }}</h2>
        <div class="flex space-x-4" v-if="showNavigation">
          <button 
            @click="prevSlide"
            :class="`p-2 rounded-full bg-white border hover:bg-gray-100 transition-colors duration-200 ${ currentIndex === 0 && 'bg-blue-900' }`"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" :class="`h-6 w-6  ${ currentIndex === 0 ? 'text-white' : 'text-gray-700' }`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click="nextSlide"
            :class="`p-2 rounded-full bg-white border hover:bg-gray-100 transition-colors duration-200 ${ currentIndex === 1 && 'bg-blue-900' }`"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" :class="`h-6 w-6  ${ currentIndex === 1 ? 'text-white' : 'text-gray-700' }`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Carousel Content -->
      <div class="relative overflow-hidden bg-gray-200 rounded-xl ">
        <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <!-- Dynamic Testimonials -->
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="w-full flex-shrink-0">
            <div class="bg-white rounded-xl overflow-hidden">
              <div class="flex flex-col md:flex-row" :class="imageHeight">
                <!-- Image Section -->
                <div class="md:w-1/2 relative overflow-hidden">
                  <div :class="imageHeightClass">
                    <img 
                      :src="testimonial.image" 
                      :alt="`${testimonial.name} - ${testimonial.role}`" 
                      class="w-full h-full object-cover object-center"
                    >
                  </div>
                </div>
                
                <!-- Content Section -->
                <div class="md:w-1/2 p-8 md:p-12 flex flex-col min-h-full bg-gray-50">
                  <div class="flex flex-col">
                    <!-- Badge -->
                    <div class="mb-6">
                      <span 
                        class="inline-block py-2 text-3xl font-semibold rounded-full"
                      >
                        {{ testimonial.type }}
                      </span>
                    </div>
                    
                    <!-- Quote -->
                    <div class="flex-grow flex ">
                      <blockquote class="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
                        "{{ testimonial.quote }}"
                      </blockquote>
                    </div>
                    
                    <!-- Author Info -->
                    <div class="mt-8 pt-6 border-t border-gray-100">
                      <p class="font-bold text-gray-900 text-lg">{{ testimonial.name }}</p>
                      <p class="text-gray-600 mt-1">{{ testimonial.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicators -->
      <!-- <div class="flex justify-center mt-8 space-x-2" v-if="showIndicators">
        <button 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          @click="goToSlide(index)"
          class="rounded-full transition-all duration-300 ease-in-out"
          :class="{
            'bg-[#0033ea] w-8 h-3': currentIndex === index,
            'bg-gray-300 w-3 h-3 hover:bg-gray-400': currentIndex !== index
          }"
          :aria-label="`Go to testimonial ${index + 1}`"
        ></button>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialCarousel',
  props: {
    testimonials: {
      type: Array,
      default: () => [
        {
          id: 1,
          type: "Happy Landlord",
          quote: "I wish I would have thought of it first. Shelta is the next big property management company.",
          name: "Adedayo E.",
          role: "Landlord",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          type: "Happy Tenant",
          quote: "Seriously, Shelta was my saver in times of need. I was in a situation where I had just 8 days to leave my previous house, and Shelta came to my rescue. Beyond their quick response, I am happy with the flexibility payment because it takes a whole lot of financial burden on myself. Thank you, Shelta.",
          name: "Eliana M.",
          role: "Tenant",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    title: {
      type: String,
      default: "What our clients say"
    },
    autoRotate: {
      type: Boolean,
      default: true
    },
    rotateInterval: {
      type: Number,
      default: 8000
    },
    showNavigation: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    
    imageHeight: {
      type: String,
      default: "md:h-[500px]",
      validator: (value) => {
        return typeof value === 'string'
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      interval: null
    }
  },
  computed: {
    imageHeightClass() {
      return `h-64 ${this.imageHeight}`
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    getBadgeClasses(type) {
      const typeClasses = {
        'Happy Landlord': 'text-[#0033ea] bg-blue-100',
        'Happy Tenant': 'text-purple-600 bg-purple-100',
        'Happy Customer': 'text-green-600 bg-green-100',
        'Satisfied Client': 'text-orange-600 bg-orange-100'
      }
      return typeClasses[type] || 'text-gray-600 bg-gray-100'
    },
    startAutoRotation() {
      if (this.autoRotate && this.testimonials.length > 1) {
        this.interval = setInterval(() => {
          this.nextSlide()
        }, this.rotateInterval)
      }
    },
    stopAutoRotation() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  },
  // mounted() {
  //   this.startAutoRotation()
  // },
  beforeDestroy() {
    this.stopAutoRotation()
  },
  watch: {
    autoRotate: {
      handler(newVal) {
        if (newVal) {
          this.startAutoRotation()
        } else {
          this.stopAutoRotation()
        }
      }
    },
    rotateInterval: {
      handler() {
        this.stopAutoRotation()
        this.startAutoRotation()
      }
    }
  }
}
</script>

<style scoped>
/* Ensure smooth transitions */
.transition-transform {
  transition-property: transform;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

/* Ensure consistent image sizing */
.object-cover {
  object-fit: cover;
}

.object-center {
  object-position: center;
}

/* Custom indicator animations */
.transition-all {
  transition-property: all;
}

/* Ensure content fills available height */
.min-h-full {
  min-height: 100%;
}
</style>