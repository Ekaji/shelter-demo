<template>
  <footer class="bg-gray-50 text-white pt-16 pb-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Company Description -->
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold mb-4">Shelta</h3>
          <p class="text-gray-300 mb-6 max-w-lg">
            Shelta is a PropTech Startup that provides guaranteed rent for Landlords & flexible 
            (monthly, biannual, quarterly) rent payment for tenants. Shelta takes away the friction 
            between Landlord-Tenant relationships through our rent financing solution.
          </p>
          <!-- Social Media Icons would go here -->
        </div>

        <!-- Company Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 uppercase tracking-wider">Company</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-white transition">About</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Safe</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Rent Payer</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Smart</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Support</a></li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 uppercase tracking-wider">Resources</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-white transition">FAQs</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Contact us</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Register</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Resources/Blog</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition">Offices</a></li>
          </ul>
        </div>
      </div>

      <!-- Offices Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h4 class="text-lg font-semibold mb-4 uppercase tracking-wider">Abuja Office</h4>
          <address class="text-gray-300 not-italic">
            4. Amurie Omanze, Off Samuel Ladoke Akintola Boulevard,<br>
            Garki 2 900001, Abuja,<br>
            Federal Capital Territory.
          </address>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4 uppercase tracking-wider">Calabar Office</h4>
          <address class="text-gray-300 not-italic">
            3. Abang Odok Close By AB Army Hotel,<br>
            Mekenge Layout, Calabar.
          </address>
          <p class="text-gray-300 mt-2">
            Opening hours: 9am - 5pm | Mon - Fri
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} Shelta. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* Custom styles can be added here if needed */
.container {
  max-width: 1280px;
}

/* Smooth hover transitions */
a {
  transition: color 0.2s ease;
}
</style>
