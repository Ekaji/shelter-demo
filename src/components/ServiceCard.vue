<template>
  <div class=" rounded-xl border  h-[350px] overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-center">
    <div class="p-8 items-center text-center">
      <div class="text-5xl font-bold text-gray-200 mb-4">{{ stat }}</div>
      <h3 class="text-3xl font-semibold text-gray-800 mb-3">{{ title }}</h3>
      <p class="text-gray-600 mb-2 text-lg">{{ description }}</p>
    </div>
    <div class="px-8 pb-6 text-center">
      <a 
        href="#" 
        class="text-[#0033ea]  text-2xl hover:text-blue-800 transition-colors duration-200 inline-flex items-center"
        @click.prevent="$emit('learn-more')"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    stat: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  emits: ['learn-more']
}
</script>