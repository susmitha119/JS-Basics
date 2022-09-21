import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import searchBar from './components/searchBar.vue'

Vue.config.productionTip = false
Vue.component('searchBar',searchBar)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
