<template>
  <div id="app">
    <ResponsiveNavbar />
    <router-view/>
     <AppFooter />
  </div>
</template>

<script>
import ResponsiveNavbar from './components/ResponsiveNavbar.vue'
import AppFooter from './components/AppFooter.vue'


export default {
  components: {
    ResponsiveNavbar,
    AppFooter
  }
}
</script>
