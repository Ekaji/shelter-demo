<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
        
        <!-- Left Content -->
        <div>
          <!-- Section Label -->
          <div class="mb-6">
            <span class="text-[#0033ea] font-semibold text-xl uppercase tracking-wide">
              {{ sectionLabel }}
            </span>
          </div>
          
          <!-- Main Heading -->
          <h2 class="text-4xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {{ mainHeading }}
          </h2>
          
          <!-- Description Paragraphs -->
          <div class="space-y-3 text-gray-600 text-base leading-relaxed">
            <p v-for="(paragraph, index) in descriptionParagraphs" :key="index">
              {{ paragraph }} 
            </p>
          </div>
        </div>

        <!-- Right Content - Service Cards -->
        <div class="grid grid-cols-3 gap-4 h-[300px]">
  <!-- First Column - Top Aligned -->
  <div class="flex flex-col justify-start">
    <!-- Property Management Card -->
    <div class="bg-[#fbf1cc] rounded-2xl p-4 h-[50%]">
      <div class="flex items-center justify-end mb-2">
        <img :src="require('/public/pmicon.svg')" alt="Property Management Icon" class="w-12 h-12 rounded-full" />
      </div>
      <p class="text-gray-700">Property</p>
      <p class="text-gray-700">Management</p>
    </div>
  </div>

  <!-- Second Column - Bottom Aligned -->
  <div class="flex flex-col justify-end">
    <!-- Litigation Cover Card -->
    <div class="bg-[#f1ccfb] rounded-2xl p-4 h-[50%]">
      <div class="flex items-center justify-end mb-2">
        <img :src="require('/public/fmicon.svg')" alt="Litigation Cover Icon" class="w-12 h-12 rounded-full" />
      </div>
      <p class="text-gray-700">Facility</p>
      <p class="text-gray-700">Management</p>
    </div>
  </div>

  <!-- Third Column - Top Aligned -->
  <div class="flex flex-col justify-start">
    <!-- Facility Management Card -->
    <div class="bg-[#ccfbd9] rounded-2xl p-4 h-[50%]">
      <div class="flex items-center justify-end mb-2">
        <img :src="require('/public/lcicon.svg')" alt="Facility Management Icon" class="w-12 h-12 rounded-full" />
      </div>
      <p class="text-gray-700">Litigation Cover</p>
    </div>
  </div>
</div>

      </div>

      <!-- Trusted Brands Section -->
      <div class="text-center">
        <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {{ trustedBrandsTitle }}
        </h3>
        
        <!-- Brand Logos -->
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <div v-for="brand in brands" :key="brand.name" class="flex items-center">
            <!-- GTCO Logo -->
            <div v-if="brand.name === 'GTCO'" class="bg-red-600 text-white px-4 py-3 rounded font-bold text-xl">
              {{ brand.name }}
            </div>
            
            <!-- Printrite Logo -->
            <div v-else-if="brand.name === 'Printrite'" class="text-red-600 text-2xl font-bold">
              {{ brand.name }}
              <span class="text-xs bg-red-600 text-white rounded-full px-2 py-1 ml-2">GO</span>
            </div>
            
            <!-- Generic Logo -->
            <div v-else class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-400 rounded-full"></div>
              <div class="text-gray-600">
                <div class="text-sm font-semibold">{{ brand.line1 }}</div>
                <div class="text-sm">{{ brand.line2 }}</div>
                <div class="text-sm">{{ brand.line3 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'PropertyManagementSection',
  props: {
    sectionLabel: {
      type: String,
      default: 'PROPERTY MANAGEMENT'
    },
    mainHeading: {
      type: String,
      default: 'Everything you need to enjoy sustainable living.'
    },
    descriptionParagraphs: {
      type: Array,
      default: () => [
        'As a landlord, you should not wait to get your deserved rent nor beg to handle your properties with care.',
        'Shelta SAFE product offers a simple and secure way for landlords to get paid without delay.',
        'Also, we manage your properties that it retains its value and protect you and yours from any act of legal claim from tenants.'
      ]
    },
    trustedBrandsTitle: {
      type: String,
      default: 'Trusted by brands you trust.'
    },
    brands: {
      type: Array,
      default: () => [
        { name: 'GTCO' },
        { name: 'Printrite' },
        { 
          name: 'sustainable-innovation',
          line1: 'SUSTAINABLE',
          line2: 'INNOVATION',
          line3: 'ENTERPRISE'
        }
      ]
    },
    services: {
      type: Array,
      default: () => [
        {
          title: 'Property',
          subtitle: 'Management',
          bgColor: 'yellow-100',
          iconBg: 'yellow-200',
          iconColor: 'yellow-700',
          icon: 'building'
        },
        {
          title: 'Litigation Cover',
          subtitle: '',
          bgColor: '#ccfbd9',
          iconBg: '#ccfbd9',
          iconColor: '#ccfbd9',
          icon: 'shield'
        },
        {
          title: 'Facility',
          subtitle: 'Management',
          bgColor: 'purple-200',
          iconBg: 'purple-300',
          iconColor: 'purple-700',
          icon: 'cog',
          fullWidth: true
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Custom spacing and typography */
.leading-tight {
  line-height: 1.25;
}

.leading-relaxed {
  line-height: 1.625;
}

.tracking-wide {
  letter-spacing: 0.025em;
}

/* Hover effects for cards */
.bg-yellow-100:hover,
.bg-green-100:hover,
.bg-purple-200:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Brand logo styling */
.bg-red-600 {
  background-color: #dc2626;
}

.text-red-600 {
  color: #dc2626;
}

.bg-green-400 {
  background-color: #4ade80;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .sm\:col-span-2 {
    grid-column: span 1;
  }
}
</style>