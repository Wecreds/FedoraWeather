import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IntroduceView from '../views/IntroduceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroduceView
    },
    {
      path: '/home',
      name: 'intro',
      component: HomeView
    }
  ]
})

export default router
