import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import teacherTable from '@/components/teacherTable.vue'
import studentTable from '@/components/studentTable.vue'
import searchBar from '@/components/searchBar.vue'
import directiveFile from '@/components/directiveFIle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/directiveFile',
    name: 'directiveFile',
    component: directiveFile
  },
  {
    path: '/searchBar',
    name: 'searchBar',
    component: searchBar
  },
  {
    path: '/studentTable',
    name: 'studentTable',
    component: studentTable
  },
  {
    path: '/teacherTable',
    name: 'teacherTable',
    component: teacherTable
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
