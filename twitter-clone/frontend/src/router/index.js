import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tweet from '../views/Tweet.vue'

const routes = [
      {
        path: '',
        component: Home,
        name: 'home'
      },
      {
        path: '/tweet',
        component: Tweet,
        name: 'tweet'
      }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
