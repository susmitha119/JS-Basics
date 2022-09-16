import Vue from 'vue'
import VueRouter from 'vue-router'
import employeeData from '@/components/employeeData.vue'
import searchBar from '@/components/searcBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/employeeData',
    name: 'employeeData',
    component: employeeData
  },
  {
    path: '/searchBar',
    name: 'searchBar',
    component: searchBar
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
