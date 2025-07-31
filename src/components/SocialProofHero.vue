<template>
  <section class="relative pt-16 overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top section: Hero + First two rows of images -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
        
        <!-- Hero Content -->
        <div class="text-center lg:text-left order-2 lg:order-1 m-4">
          <div class="bg-gray-900 text-white rounded-2xl p-8 md:p-12 lg:p-12 relative overflow-hidden">
            <!-- Background decoration -->
            <!-- <div class="absolute inset-0 bg-gradient-to-br from-[#0033ea] to-blue-800 opacity-10"></div> -->
            
            <div class="relative z-10 flex flex-col items-center ">
              <h1 class="text-xl text-center md:text-2xl lg:text-3xl font-bold mb-8 leading-tight">
                {{ heroTitle }}
              </h1>
              
              <div class="w-20 h-[1px] bg-white mx-auto lg:mx-0 mb-8"></div>
              
              <button 
                @click="handleCTAClick"
                class="bg-[#0033ea] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 transform hover:scale-105 shadow-lg"
              >
                {{ ctaText }}
              </button>
            </div>
          </div>
        </div>

        <!-- Top Two Rows of Images -->
        <div class="order-1 lg:order-2">
          <div class="grid grid-cols-4 gap-2 mb-3 md:mb-4 lg:mb-2">
            <!-- Row 1 -->
            <div 
              v-for="(person, index) in topRowPeople" 
              :key="`top-${index}`"
              class="aspect-square overflow-hidden  transform hover:scale-105 transition-transform duration-300"
              :class="getPersonAnimation(index)"
            >
              <img 
                :src="person.image" 
                :alt="person.alt"
                class="w-full h-full object-cover"
                :style="{ backgroundColor: person.bgColor }"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-4 gap-2 mb-3 mb-2">
            <!-- Row 2 -->
            <div 
              v-for="(person, index) in middleRowPeople" 
              :key="`middle-${index}`"
              class="aspect-square overflow-hidden  transform hover:scale-105 transition-transform duration-300"
              :class="getPersonAnimation(index + 4)"
            >
              <img 
                :src="person.image" 
                :alt="person.alt"
                class="w-full h-full object-cover"
                :style="{ backgroundColor: person.bgColor }"
              >
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom section: Full-width third row -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 ">
    <div 
      v-for="(person, index) in bottomRowPeople" 
      :key="`bottom-${index}`"
      class="aspect-square overflow-hidden  transform hover:scale-105 transition-transform duration-300"
      :class="getPersonAnimation(index + 7)"
    >
      <img 
        :src="person.image" 
        :alt="person.alt"
        class="w-full h-full object-cover"
        :style="{ backgroundColor: person.bgColor }"
      >
    </div>
  </div>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'SocialProofHero',
  props: {
    heroTitle: {
      type: String,
      default: 'Loved by 10,000+ Africans'
    },
    ctaText: {
      type: String,
      default: 'Create a free account'
    },
    people: {
      type: Array,
      default: () => [
        // Top row
        { image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop&crop=face', alt: 'Happy customer', bgColor: '#f97316' },
        { image: 'https://images.unsplash.com/photo-1594736797933-d0601ba2fe65?w=300&h=300&fit=crop&crop=face', alt: 'Satisfied user', bgColor: '#6b7280' },
        { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', alt: 'Customer testimonial', bgColor: '#facc15' },
        { image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face', alt: 'Happy client', bgColor: '#f9a8d4' },
        
        // Middle row
        { image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face', alt: 'Excited user', bgColor: '#fb7185' },
        { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', alt: 'Joyful customer', bgColor: '#ef4444' },
        { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', alt: 'Celebrating user', bgColor: '#e5e7eb' },
        
        // Bottom row
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
        { image: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=300&h=300&fit=crop&crop=face', alt: 'Smiling user', bgColor: '#fbbf24' },
      ]
    },
    animateOnScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    topRowPeople() {
      return this.people.slice(0, 4)
    },
    middleRowPeople() {
      return this.people.slice(4, 8)
    },
    bottomRowPeople() {
      return this.people.slice(9, 17)
    }
  },
  methods: {
    handleCTAClick() {
      this.$emit('cta-click')
      // You can add additional logic here like tracking or navigation
    },
    getPersonAnimation(
        // index
    ) {
      if (!this.animateOnScroll) return ''
      
      // Stagger animations for a wave effect
    //   const delay = index * 0.1
      return `animate-fade-in-up`
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Staggered animation delays */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }

/* Hover effects */
.transform {
  transition: transform 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Button hover effect */
.hover\:scale-105 {
  transition: all 0.2s ease;
}

/* Background gradients and shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive grid adjustments */
@media (max-width: 640px) {
  .grid-cols-4 {
    gap: 0.5rem;
  }
}

/* Custom background colors for fallback */
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>