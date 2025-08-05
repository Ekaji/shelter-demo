<template>
  <div class="m-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-2 mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-blue-900">State bonus • Federal Capital Territory</h1>
      </div>
      
      <div class="relative">
        <select 
          v-model="selectedMonth" 
          class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.label }}
          </option>
        </select>
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
      </div>
    </div>

    <p class="text-gray-500 text-sm mb-8">
      Keep track of registrations, subscriptions, and earned bonuses.
    </p>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>Total registration count</span>
          <div class="relative group">
            <span class="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full text-xs cursor-pointer">?</span>
            <div class="absolute z-10 hidden group-hover:block w-48 p-2 text-xs text-white bg-black rounded shadow-lg">
              The number of people who registered up this month
            </div>
          </div>
        </div>
        <div class="text-3xl font-bold text-gray-800">{{ dashboardData.totalRegistrations }}</div>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>Total bonus</span>
          <div class="relative group">
            <span class="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full text-xs cursor-pointer">?</span>
            <div class="absolute z-10 hidden group-hover:block w-48 p-2 text-xs text-white bg-black rounded shadow-lg">
              Total amount of bonuses earned from all subscription this month
            </div>
          </div>
        </div>
        <div class="text-3xl font-bold ">₦{{ dashboardData.totalBonus }}</div>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>Total receivable bonus</span>
          <div class="relative group">
            <span class="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full text-xs cursor-pointer">?</span>
            <div class="absolute z-10 hidden group-hover:block w-48 p-2 text-xs text-white bg-black rounded shadow-lg">
              The amount you are entitled to after bonuses are shared this month
            </div>
          </div>
        </div>
        <div class="text-3xl font-bold ">₦{{ dashboardData.totalReceivableBonus }}</div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription type</th>
            <th class="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total count</th>
            <th class="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr 
            v-for="item in subscriptionData" 
            :key="item.type" 
            class="hover:bg-gray-50"
          >
            <td class="py-4 whitespace-nowrap font-medium text-gray-900">{{ item.type }}</td>
            <td class="py-4 whitespace-nowrap text-gray-500">{{ item.count }}</td>
            <td class="py-4 whitespace-nowrap font-medium ">₦{{ item.bonus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateBonusDashboard',
  data() {
    return {
      selectedMonth: 'AUG 2025',
      months: [
        { value: 'JUL 2025', label: 'JUL 2025' },
        { value: 'AUG 2025', label: 'AUG 2025' },
        { value: 'SEP 2025', label: 'SEP 2025' },
        { value: 'OCT 2025', label: 'OCT 2025' }
      ],
      dashboardData: {
        totalRegistrations: 0,
        totalBonus: 0,
        totalReceivableBonus: 0
      },
      subscriptionData: [
        { type: 'Agent', count: 0, bonus: 0 },
        { type: 'Standard', count: 0, bonus: 0 },
        { type: 'Exclusive', count: 0, bonus: 0 },
        { type: 'Premium', count: 0, bonus: 0 },
        { type: 'Alliance', count: 0, bonus: 0 }
      ]
    }
  },
  methods: {
    updateDashboardData(newData) {
      this.dashboardData = { ...this.dashboardData, ...newData };
    },
    
    updateSubscriptionData(newData) {
      this.subscriptionData = newData;
    },

    onMonthChange() {
      console.log('Month changed to:', this.selectedMonth);
    }
  },
  watch: {
    selectedMonth: 'onMonthChange'
  },
  mounted() {
    console.log('State Bonus Dashboard mounted');
  }
}
</script>