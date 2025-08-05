<template>
    <main class="flex-1 p-6 overflow-y-auto">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Left Column (2/3 width) -->
          <div class="w-full lg:w-2/3 space-y-6">
            <!-- Top Cards Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Wallet Balance Card -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center gap-2 mb-4">
                  <h3 class="text-sm font-medium text-gray-600">Wallet Balance</h3>
                  <i class="fas fa-eye-slash text-gray-400"></i>
                </div>
                <div class="text-lg font-bold text-gray-900 mb-3">************</div>
                <div class="text-xs text-gray-500 mb-4">
                  Asset Value (Expected Income) <i class="fas fa-info-circle text-gray-300"></i><br>
                  <span class="font-medium">₦825,488.00</span>
                </div>
                <div class="flex gap-2">
                  <button class="bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-blue-700">
                    Generate voucher
                  </button>
                  <button class="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200">
                    Withdraw
                  </button>
                  <button class="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200">
                    Convert
                  </button>
                </div>
              </div>

              <!-- Points Card -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-sm font-medium text-gray-600">Main point</h3>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Auto save</span>
                    <div class="relative">
                      <input type="checkbox" v-model="autoSave" class="sr-only">
                      <div @click="toggleAutoSave" :class="autoSave ? 'bg-green-600' : 'bg-gray-300'" class="w-10 h-5 rounded-full cursor-pointer transition-colors relative">
                        <div :class="autoSave ? 'translate-x-5' : 'translate-x-0'" class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="">
                  <div class="text-3xl font-bold text-gray-900 mb-6">9.00 Points</div>
                  <div class="flex justify-between text-center mb-6">
                    <div>
                      <div class="text-xs text-gray-500 mb-1">
                        Promo points <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="font-medium">0 points</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 mb-1">
                        Bonus points <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="font-medium">0 points</div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button class="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200">
                      Convert
                    </button>
                    <button class="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200">
                      Transfer
                    </button>
                    <button class="bg-gray-100 text-gray-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-200">
                      Lock
                    </button>
                  </div>
                </div>
              </div>

            <div class="bg-white rounded-lg p-4 shadow-md flex flex-col items-start">
                <div class="text-blue-900 text-sm mb-2">Total Earnings</div>
                <div class="text-blue-900 text-2xl font-semibold mb-4">₦7,128,357.74</div>
                <button class="bg-transparent border-none text-gray-600 text-sm underline cursor-pointer hover:text-blue-900">Revenue Details</button>
              </div>
              <!-- Properties Card -->
              <div class="bg-white rounded-lg shadow-sm border flex flex-col border-gray-200 p-6">
                <h3 class="text-sm font-medium text-gray-600 ">Properties Managed</h3>
                <div class="text-left">
                  <div class="text-3xl font-bold text-gray-900 mb-2">0</div>
                  <div class="flex justify-between">
                    <div>
                      <div class="text-xs text-gray-500 mb-1">
                        Landlord managed <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="font-medium">0</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 mb-1">
                        FM managed <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="font-medium">1</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <!-- Earnings Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Earnings</h3>
                  <div class="text-3xl font-bold text-gray-900 mb-4">₦7,128,357.74</div>
                  <button class="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                    Revenue Details
                  </button>
                </div>
                <select class="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div class="chart-container" style="height: 300px;">
                <canvas ref="earningsChart"></canvas>
              </div>
            </div>

            <!-- Requests Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Requests</h3>
                <button class="text-blue-600 text-sm hover:text-blue-700">Show more</button>
              </div>
              <div class="text-xs text-gray-500 mb-4">
                Requests are considered rejected after 24hrs without acceptance
              </div>
              
              <div class="mb-4">
                <h4 class="font-medium text-gray-900">Inspection (1)</h4>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <i class="fas fa-calendar-alt text-gray-400"></i>
                      <span class="font-medium text-gray-900">Property Inspection Request</span>
                    </div>
                    <div class="text-sm text-gray-600 mb-2">60 Ait Amuniyan Mall Variety Estate, Asokoro</div>
                    <div class="text-xs text-red-500">0 : 0 : 0 Time left</div>
                  </div>
                  <div class="flex gap-2">
                    <button class="border border-gray-100 text-gray-400 px-3 py-2 rounded-md text-xs font-medium hover:b-gray-200">
                      View
                    </button>
                    <button class="border border-blue-600 text-gray-400 px-3 py-2 rounded-md text-xs font-medium hover:b-blue-700">
                      Accept
                    </button>
                    <button class="border border-red-500 text-gray-400 px-3 py-2 rounded-md text-xs font-medium hover:b-red-600">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column (1/3 width) - Available Properties -->
          <div class="w-full lg:w-1/3">
            <!-- notifications-component -->
  <div class="bg-white mb-6 rounded-lg p-4 shadow-md">
    <div class="font-semibold text-lg mb-4">Notifications (0)</div>
    <div class="flex items-center justify-center flex-col text-center text-gray-600">
      <div class="relative">
        <img :src='require(`/public/empty-state-notification.svg`)' alt="" srcset="">
      </div>
      <div class="mt-4">
        <div class="text-base font-medium">No record found</div>
        <div class="text-sm text-gray-500">No record will be displayed when updated or available</div>
      </div>
    </div>
  </div>
              
              <AvailableProperties />
              
        </div>
        </div>
        <!--  -->
                    <!-- Activity Tracking -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Activity Tracking</h3>
              
              <!-- Tabs -->
              <div class="border-b border-gray-200 mb-6">
                <nav class="flex space-x-8">
                  <button class="border-b-2 border-blue-500 text-blue-600 py-2 px-1 text-sm font-medium">
                    Assigned FM
                  </button>
                  <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Due rents
                  </button>
                  <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Complaints
                  </button>
                  <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Inspections
                  </button>
                  <button class="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                    Maintenance
                  </button>
                </nav>
              </div>
              
              <!-- Table -->
              <div class="overflow-x-auto mt-4">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-gray-50">
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full name</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone number</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr>
                      <td class="px-4 py-3 text-sm text-gray-900">1</td>
                      <td class="px-4 py-3 text-sm text-gray-900">Austin Igwe</td>
                      <td class="px-4 py-3 text-sm text-gray-900">igweaustin@gmail.com</td>
                      <td class="px-4 py-3 text-sm text-gray-900">08032700005</td>
                      <td class="px-4 py-3 text-sm text-gray-900">Amurfe Omaana</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
      </main>
</template>


<script>
import Chart from 'chart.js/auto';

export default {
    name: 'DashboardContent',
    components: {
        AvailableProperties: () => import('@/components/dashboard-components/AvailableProperties.vue'),
    },
    data() {
        return {
            autoSave: false 
        }
    },
    mounted() {
        this.initChart();
    },
    methods: {
        toggleAutoSave() {
            this.autoSave = !this.autoSave;
        },
        initChart() {
            if (this.$refs.earningsChart) {
                const ctx = this.$refs.earningsChart.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Smart FMO Commission',
                                data: [0.2, 0.4, 0.3, 0.5, 0.8, 1.2, 1.5, 1.8, 2.1, 1.9, 1.7, 2.0],
                                borderColor: '#3b82f6',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                tension: 0.4,
                                fill: true
                            },
                            // ... rest of your chart datasets
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    usePointStyle: true,
                                    padding: 20,
                                    font: {
                                        size: 11
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}
</script>