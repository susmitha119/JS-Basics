import Vue from 'vue'
import VueRouter from 'vue-router'
import FormPage from"../components/FormPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"FormPage",
    component:FormPage
  }


]

const router = new VueRouter({
  routes
})

export default router
