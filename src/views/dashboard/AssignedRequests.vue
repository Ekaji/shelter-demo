<template>
  <div class="m-6 p-5 font-sans">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Assigned Request</h2>
      <p class="text-sm text-gray-500">Manage all assigned properties, FMs, and maintenance tasks sent to you for action</p>
    </div>

    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-200 mb-5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'px-4 py-3 text-sm font-medium transition-colors',
          activeTab === tab.id 
            ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
            : 'text-gray-500 hover:text-blue-500'
        ]"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[400px]">
      <!-- Property Management Tab -->
      <div v-if="activeTab === 'property'">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property address</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="property in propertyData" :key="property.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ property.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ property.address }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ property.dateAssigned }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    property.status.toLowerCase() === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]">
                    {{ property.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button class="text-blue-600 hover:text-blue-800 underline">View details</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    v-if="property.status !== 'Accepted'"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-xs"
                  >
                    Reassign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Inspection Tab -->
      <div v-if="activeTab === 'inspection'">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property address</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection fee</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection fee status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="inspection in inspectionData" :key="inspection.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ inspection.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ inspection.address }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ inspection.fee }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ inspection.feeStatus }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ inspection.dateAssigned }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    inspection.status.toLowerCase() === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]">
                    {{ inspection.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button class="text-blue-600 hover:text-blue-800 underline">View details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Facility Management Tab -->
      <div v-if="activeTab === 'facility'" class="flex flex-col items-center justify-center py-16 text-gray-500">
        <div class="text-5xl mb-4 opacity-50">🏠</div>
        <h3 class="text-lg font-medium text-gray-700 mb-1">No record found</h3>
        <p class="text-sm">Record will be displayed when updated or available</p>
      </div>

      <!-- Maintenance Tab -->
      <div v-if="activeTab === 'maintenance'">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property address</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="maintenance in maintenanceData" :key="maintenance.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ maintenance.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ maintenance.address }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ maintenance.dateAssigned }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ maintenance.issue }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {{ maintenance.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button class="text-blue-600 hover:text-blue-800 underline">View details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FM/IO Tab -->
      <div v-if="activeTab === 'fmio'">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FM/IO Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="fmio in fmioData" :key="fmio.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.phone }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.code }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ fmio.dateAssigned }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssignedRequestTabs',
  data() {
    return {
      activeTab: 'property',
      tabs: [
        { id: 'property', name: 'Property Management' },
        { id: 'inspection', name: 'Inspection' },
        { id: 'facility', name: 'Facility Management' },
        { id: 'maintenance', name: 'Maintenance' },
        { id: 'fmio', name: 'FM/IO' }
      ],
      propertyData: [
        {
          id: 1,
          address: 'Sahara 4 Lingo Estate, Lokogoma',
          dateAssigned: 'July 16th 2025',
          status: 'Accepted'
        },
        {
          id: 2,
          address: 'Lokogoma',
          dateAssigned: 'July 16th 2025',
          status: 'Declined'
        },
        {
          id: 3,
          address: '68 An Amosun Naf Valley Estate, Asokoro',
          dateAssigned: 'July 16th 2025',
          status: 'Declined'
        },
        {
          id: 4,
          address: 'Golden Spring Estate Lokogoma',
          dateAssigned: 'July 9th 2025',
          status: 'Declined'
        }
      ],
      inspectionData: [
        {
          id: 1,
          address: '68 An Amosun Naf Valley Estate, Asokoro',
          fee: '₦7,000',
          feeStatus: 'Not paid',
          dateAssigned: 'July 4th 2025',
          status: 'Accepted'
        }
      ],
      maintenanceData: [
        {
          id: 1,
          address: '68 An Amosun Naf Valley Estate, Asokoro',
          dateAssigned: 'July 4th 2025',
          issue: 'AC',
          status: 'Rejected'
        }
      ],
      fmioData: [
        {
          id: 1,
          name: 'Austin Igwe',
          email: 'igweaustin3@gmail.com',
          phone: '08032900005',
          code: 'RS812095',
          dateAssigned: 'April 1st 2021'
        }
      ]
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    }
  }
}
</script>