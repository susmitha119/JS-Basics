import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import searchBar from './components/searchBar.vue'
//import globalSearch from '@/components/searchBar.vue'

Vue.config.productionTip = false
Vue.component('searchBar',searchBar)
Vue.filter('trim',function(value) {
  if(value.length>10){
    return value.charAt(0).toUpperCase()+value.slice(1,10)+"..."
  }
  else{
    return value.charAt(0).toUpperCase()+value.slice(1,value.length)
  }
})
,
Vue.directive('amount',{
  bind(el,binding){
    if(binding.value>='5000'){
      return el
    }
  }
})






new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
