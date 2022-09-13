import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.filter('trim',function(value) {
  if(value.length>10){
    return value.charAt(0).toUpperCase()+value.slice(1,10)+"..."
  }
  else{
    return value.charAt(0).toUpperCase()+value.slice(1,value.length)
  }
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
