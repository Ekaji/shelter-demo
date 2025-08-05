<!-- parent -->
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <DashboardSideBar @tabChanged="handleTabChange" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col bg-gray-50">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex justify-end items-center gap-4">
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <i class="fas fa-bell text-lg"></i>
          </button>
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <i class="fas fa-user-circle text-2xl"></i>
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
     <DashboardContent v-if="activeTab === 'dashboard'" />
     <LandLords v-if="activeTab === 'landlords'" />
     <AssignedRequests v-if="activeTab === 'assigned-requests'" />
     <MyVouchers v-if="activeTab === 'vouchers'" />
     <StateBonusDashboard v-if="activeTab === 'state-bonus'" />
    </div>
  </div>
</template>

<script>
// import Chart from 'chart.js/auto';
import DashboardSideBar from '@/components/dashboard-components/DashboardSideBar.vue';

export default {
  name: 'PropertyManagementDashboard',
  components: {
    DashboardSideBar,
    DashboardContent: () => import('@/views/dashboard/DashboardContent.vue'),
    LandLords: () => import('@/views/dashboard/LandLords.vue'),
    AssignedRequests: () => import('@/views/dashboard/AssignedRequests.vue'),
    MyVouchers: () => import('@/views/dashboard/MyVouchers.vue'),
    StateBonusDashboard: () => import('@/views/dashboard/StateBonus.vue'),
  },
  data() {
    return {
      activeTab: 'dashboard',
      // autoSave: true
    }
  },
  methods: {
    handleTabChange (tabId) {
      this.activeTab = tabId;
      this.$router.push(`#${tabId}`);
      console.log(`Active tab changed to: ${tabId}`);
      console.log("Event received:", tabId);
    },
  },

}
</script>