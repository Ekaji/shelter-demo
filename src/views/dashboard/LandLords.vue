<template>
  <div class=" m-6 bg-white rounded-lg shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="px-8 pt-8 bg-white">
      <h1 class="text-2xl font-semibold text-gray-800 mb-2">Landlord & Properties</h1>
      <p class="text-gray-500 text-base leading-relaxed mb-8">
        Efficiently manage assigned properties, landlords, track statuses, assign FM/IO, and access reports.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-0.5 mx-8 mb-8 bg-gray-100 w-[220px] rounded-lg p-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md transition-all duration-200"
        :class="{
          'text-gray-700 bg-gray-200 font-semibold': activeTab === tab.id
        }"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Content -->
    <div class="px-8 pb-8">
      <!-- Search -->
      <div class="relative max-w-md mb-6">
        <input
          type="text"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          placeholder="Search..."
          v-model="searchQuery"
          />
          <!-- @input="handleSearch" -->
      </div>

      <!-- Landlords Table -->
      <div v-if="activeTab === 'landlords'" class="mt-6 border border-gray-200 rounded-lg overflow-hidden">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property owned</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="landlord in filteredLandlords"
              :key="landlord.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-4 text-sm text-gray-700">{{ landlord.id }}</td>
              <td class="px-4 py-4 text-sm text-gray-700">{{ landlord.name }}</td>
              <td class="px-4 py-4 text-sm text-gray-700">{{ landlord.email }}</td>
              <td class="px-4 py-4 text-sm text-gray-700">{{ landlord.propertyOwned }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Properties Empty State -->
      <div v-if="activeTab === 'properties'" class="text-center py-16 text-gray-500">
        <div class="w-16 h-16 mx-auto mb-4 opacity-40">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <p>No properties found{{ searchQuery ? ' for "' + searchQuery + '"' : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandlordProperties',
  data() {
    return {
      activeTab: 'landlords',
      searchQuery: '',
      tabs: [
        { id: 'properties', name: 'Properties' },
        { id: 'landlords', name: 'Landlords' }
      ],
      landlords: [
        {
          id: 1,
          name: 'Anne Omananyi',
          email: 'primedataroom@gmail.com',
          propertyOwned: 2
        }
      ]
    }
  },
  computed: {
    filteredLandlords() {
      if (!this.searchQuery) {
        return this.landlords;
      }
      const query = this.searchQuery.toLowerCase();
      return this.landlords.filter(landlord => 
        landlord.name.toLowerCase().includes(query) ||
        landlord.email.toLowerCase().includes(query)
      )
  },
},
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    handleSearch() {
      console.log('Searching for:', this.searchQuery);
    }
  }
}

</script>