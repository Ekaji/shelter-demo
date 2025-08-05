<template>
  <div class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <div class="p-5 border-b border-gray-200">
      <h6 class="text-center">Verified</h6>
      
      <div class="w-full flex flex-col ">
        <div class="flex items-center gap-4 mx-auto">
          <div class="relative">
            <input type="checkbox" v-model="autoSave" class="sr-only">
            <div @click="toggleAutoSave"  class=" bg-gray-300 h-8 w-32 rounded-full cursor-pointer transition-colors relative flex items-center">
              <span class="absolute text-xs font-medium text-white h-full rounded-full bg-green-600 p-2" v-if="autoSave">Subscribed</span>
              <span class="absolute right-2 text-xs font-medium text-white" v-else>OFF</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    <nav class="flex-1 py-4 text-base">
      <ul class="space-y-1 px-4">
        <li v-for="tab in tabs" :key="tab.id">
          <a :href="`#${tab.id}`" :class="`flex items-center gap-3 py-3 ${tab.id === activeTab ? 'bg-blue-600 rounded-md text-white' : 'text-gray-700 hover:bg-gray-50'}`" @click.prevent="setActiveTab(tab.id)">
            <i class="fas fa-home w-5"></i>
            <span>{{ tab.name }}</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center gap-3 py-3 text-gray-700 hover:bg-gray-50" @click.prevent>
            <i class="fas fa-sign-out-alt w-5"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
    
    <div class="p-5 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-gray-500 text-sm"></i>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900">Austin Igwe</div>
          <div class="text-xs text-gray-500">igweaustin@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardSideBar',
  data() {
    return {
      activeTab: 'dashboard',
      autoSave: !false,
      tabs: [
        { id: 'dashboard', name: 'Dashboard' },
        { id: 'landlords', name: 'Landlords & Properties' },
        { id: 'assigned-requests', name: 'Assigned Requests' },
        { id: 'vouchers', name: 'My Vouchers' },
        { id: 'state-bonus', name: 'State Bonus' }
      ]
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
      this.$emit('tabChanged', this.activeTab);
    },
    toggleAutoSave() {
      this.autoSave = !this.autoSave;
    }
  }
}
</script>