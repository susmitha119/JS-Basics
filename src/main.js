import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
//import globalSearch from '@/components/searchBar.vue'
import searchBar from '@/components/searcBar.vue'



Vue.config.productionTip = false

Vue.component('searchBar',searchBar)
Vue.filter('trim',function(value) {
  if(value.length>10){
    return value.charAt(0).toUpperCase()+value.slice(1,10)+"..."
  }
  else{
    return value.charAt(0).toUpperCase()+value.slice(1,value.length)
  }
}),
Vue.directive('direct', {
  componentUpdated(el, binding, vnode) {
    console.log(binding.value)
    binding.value = binding.value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // console.log(binding.value)
    vnode.context.element.salary = binding.value
  }
}),






new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
