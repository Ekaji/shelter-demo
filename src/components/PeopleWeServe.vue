<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">People we serve</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <service-card
          v-for="(service, index) in services"
          :key="index"
          :stat="service.stat"
          :title="service.title"
          :description="service.description"
          @learn-more="handleLearnMore(service.title)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ServiceCard from './ServiceCard.vue'

export default {
  name: 'PeopleWeServe',
  components: {
    ServiceCard
  },
  data() {
    return {
      services: [
        {
          stat: '500',
          title: 'Landlords',
          description: 'Get your complete rent without delay or stress.'
        },
        {
          stat: '3,000',
          title: 'Tenants',
          description: 'We pay your rent so you enjoy sustainable living.'
        },
        {
          stat: '30',
          title: 'Organizations',
          description: 'Onboard your staff and enjoy more benefit.'
        }
      ]
    }
  },
  methods: {
    handleLearnMore(title) {
      console.log(`Learn more clicked for: ${title}`)
    }
  }
}
</script>

<style scoped>
</style>