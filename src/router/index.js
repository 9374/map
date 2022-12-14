import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
//createWebHistory
import Index from '../views/index.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  // mode: 'history',
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
