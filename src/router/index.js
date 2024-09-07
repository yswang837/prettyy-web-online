import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Publish from '@/views/Publish/index.vue'
import Preview from '@/views/Preview/index.vue'

// import Detail from '@/views/Detail/index.vue'
// import User from '@/views/User/index.vue'
// import Creation from '@/views/Creation/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/publish-article',
      component: Publish,
    },
    {
      path: '/preview',
      component: Preview,
    },
    {
      path: '/',
      component: Home,
    },
  ]
})

export default router
