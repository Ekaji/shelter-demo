import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'


Vue.config.productionTip = false

// Handle Vue Router navigation errors globally
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')