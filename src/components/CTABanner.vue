<template>
  <section class="relative bg-[#0033ea] py-16 md:py-20 overflow-hidden m-12">
    <!-- Decorative dots - top left -->
    <div class="absolute top-6 left-6 grid grid-cols-4 gap-2">
      <div v-for="dot in 16" :key="`top-${dot}`" class="w-2 h-2 bg-white opacity-30 rounded-full"></div>
    </div>
    
    <!-- Decorative dots - bottom right -->
    <div class="absolute bottom-6 right-6 grid grid-cols-4 gap-2">
      <div v-for="dot in 16" :key="`bottom-${dot}`" class="w-2 h-2 bg-white opacity-30 rounded-full"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <!-- Main Heading -->
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16 leading-tight">
        {{ title }}
      </h2>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <!-- Primary Button -->
        <button 
          @click="handlePrimaryClick"
          class="bg-white text-[#0033ea] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-50 transition-colors duration-200 transform hover:scale-105 shadow-lg min-w-200px"
        >
          {{ primaryButtonText }}
        </button>

        <!-- Secondary Button -->
        <button 
          @click="handleSecondaryClick"
          class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-[#0033ea] transition-all duration-200 transform hover:scale-105 min-w-200px"
        >
          {{ secondaryButtonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// import CustomButton from './CustomButton.vue';

export default {
  name: 'CTABanner',
  components: {
    // CustomButton
  },
  props: {
    title: {
      type: String,
      default: 'Ready to get started'
    },
    primaryButtonText: {
      type: String,
      default: 'Create a free account'
    },
    secondaryButtonText: {
      type: String,
      default: 'Contact Sales'
    },
    backgroundColor: {
      type: String,
      default: '[#0033ea]',
      validator: (value) => {
        return typeof value === 'string'
      }
    }
  },
  methods: {
    handlePrimaryClick() {
      this.$emit('primary-click')
    },
    handleSecondaryClick() {
      this.$emit('secondary-click')
    }
  }
}
</script>

<style scoped>
/* Ensure smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
}

.transition-all {
  transition-property: all;
}

.transform {
  transition: transform 0.2s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Button shadows */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-w-200px {
    min-width: 100%;
  }
}
/* Decorative dots grid */
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

/* Custom blue gradient background option */
.bg-blue-600 {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}
</style>