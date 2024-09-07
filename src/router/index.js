import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Publish from '@/views/Publish/index.vue'
// import Detail from '@/views/Detail/index.vue'
// import User from '@/views/User/index.vue'
// import Creation from '@/views/Creation/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 一级路由 / 
  // 二级路由 /home 和 /publish-article
  routes: [
    {
      path: '/publish-article',
      component: Publish,
    },
    {
      path: '/',
      component: Home,
    },
  ]
})

export default router
