<template>
  <div class="bg-white font-sans">
    <div class="container mx-auto px-6 py-16 md:py-20">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <div>
          <p class="text-xl font-semibold text-[#0033ea] uppercase tracking-wider">
            Property Financing
          </p>
          <h1 class="mt-2 text-4xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to get paid on time.
          </h1>
        </div>

        <div>
          <p class="text-lg text-gray-600 leading-relaxed">
            Living in your desired environment or getting your dream house should not be difficult. With SAFE flexible payment by Shelta, you can rent or buy properties in any location of your choice and also benefits from our renewable energy solutions that takes care of your lighting needs.
          </p>
        </div>
      </div>

      <div class="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        <div v-for="(feature, index) in features" :key="index" class="flex items-center">
          
          <div class="flex-shrink-0 flex items-center justify-center rain-drop ">
            <span class="text-gray-500 font-bold number">{{ index + 1 }}</span>
          </div>

          <p class="ml-4 text-lg font-medium text-gray-800">
            {{ feature.name }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyFinancingComponent',
  data() {
    return {
      features: [
        { name: 'Rent Financing' },
        { name: 'Property Financing' },
        { name: 'Renewable Energy' }
      ]
    };
  }
};
</script>

<style scoped>

 .rain-drop {
  display: inline-flex; 
  transform: rotate(130deg);
  border: 1px solid #555c74;
  width: 25px;
  height: 25px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  margin-right: 12px;
  cursor: pointer;
  align-items: center; 
  justify-content: center; 
}

span.number {
  transform: rotate(-130deg);
  display: inline-block;
  line-height: 1; 
}
</style>