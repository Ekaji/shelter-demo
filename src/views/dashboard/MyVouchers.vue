<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Container -->
    <div class="max-w-7xl mx-auto p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My vouchers</h1>
        <p class="text-gray-600">Track and manage all your vouchers in one place</p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex space-x-1 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-6 py-2 text-sm font-medium rounded-lg transition-colors',
            activeTab === tab 
              ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Search and Filter Controls -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <input 
            v-model="searchCode"
            type="text" 
            placeholder="Search voucher code..."
            class="px-4 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
        </div>
        <div class="flex gap-3">
            <div>
                <input 
                v-model="filterToDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
            </div>
          <button 
            @click="showFilterModal = true"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Type
          </button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="mb-6">
        <button class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          View bulk voucher requests
        </button>
      </div>

      <!-- Voucher Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Voucher code</div>
          <div>Category</div>
          <div>Date purchased</div>
          <div>Status</div>
        </div>

        <!-- Table Rows -->
        <div 
          v-for="(voucher, index) in filteredVouchers" 
          :key="voucher.code" 
          :class="['grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50', 
                   index === filteredVouchers.length - 1 ? 'border-b-0' : '']"
        >
          <div class="text-blue-600 font-medium">{{ voucher.code }}</div>
          <div class="text-gray-600">{{ voucher.category }}</div>
          <div class="text-gray-600">{{ voucher.datePurchased }}</div>
          <div>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              voucher.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            ]">
              {{ voucher.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Modal -->
    <transition name="modal">
      <div 
        v-if="showFilterModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
        @click.self="showFilterModal = false"
      >
        <transition name="modal-content">
          <div v-if="showFilterModal" class="bg-white rounded-lg shadow-xl w-full max-w-md">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Filter</h3>
              <button @click="showFilterModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-4">
              <!-- Date Range -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">From date</label>
                  <input 
                    v-model="filterFromDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">To date</label>
                  <input 
                    v-model="filterToDate"
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
              </div>

              <!-- Type/Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Type/Category</label>
                <select 
                  v-model="filterType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Type</option>
                  <option value="Smart Subscription">Smart Subscription</option>
                  <option value="Gift Card">Gift Card</option>
                  <option value="Discount">Discount</option>
                </select>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 p-6 border-t border-gray-200">
              <button 
                @click="resetFilters"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                Cancel/Reset
              </button>
              <button 
                @click="applyFilters"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
              >
                Apply
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MyVouchers',
  data() {
    return {
      activeTab: 'All',
      tabs: ['All', 'Active', 'Used'],
      searchCode: '',
      selectedType: '',
      showFilterModal: false,
      filterFromDate: '',
      filterToDate: '',
      filterType: '',
      vouchers: [
        {
          code: '1731-0529-0433-8631',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Used'
        },
        {
          code: '1742-7560-1433-8822',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Active'
        },
        {
          code: '1462-8390-1433-8822',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Active'
        },
        {
          code: '1827-4812-1433-8822',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Active'
        },
        {
          code: '1590-4067-1433-8822',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Active'
        },
        {
          code: '1589-7415-1433-8822',
          category: 'Smart Subscription',
          datePurchased: 'March 30th 2025',
          status: 'Active'
        }
      ]
    }
  },
  computed: {
    filteredVouchers() {
      let filtered = this.vouchers;

      // Filter by active tab
      if (this.activeTab !== 'All') {
        filtered = filtered.filter(voucher => voucher.status === this.activeTab);
      }

      // Filter by search code
      if (this.searchCode) {
        filtered = filtered.filter(voucher => 
          voucher.code.toLowerCase().includes(this.searchCode.toLowerCase())
        );
      }

      // Filter by selected type
      if (this.selectedType) {
        filtered = filtered.filter(voucher => voucher.category === this.selectedType);
      }

      return filtered;
    }
  },
  methods: {
    applyFilters() {
      // Apply the modal filters to the main filters
      this.selectedType = this.filterType;
      this.showFilterModal = false;
    },
    resetFilters() {
      this.filterFromDate = '';
      this.filterToDate = '';
      this.filterType = '';
      this.selectedType = '';
      this.searchCode = '';
      this.showFilterModal = false;
    }
  }
}
</script>

<style>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-content-enter-active, .modal-content-leave-active {
  transition: transform 0.3s;
}
.modal-content-enter, .modal-content-leave-to {
  transform: scale(0.9);
}
</style>