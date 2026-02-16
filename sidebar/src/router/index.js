import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/home.vue'
import About from '../view/about.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
  ],
})

export default router
