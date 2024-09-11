import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Publish from '@/views/Publish/index.vue'
import Detail from '@/views/Detail/index.vue'
import User from '@/views/User/index.vue'
import Creation from '@/views/Creation/index.vue'
import SecRetPolicy from '@/views/Policy/secret-policy/index.vue'
import ServiceItem from '@/views/Policy/service-item/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 一级路由 / 
  // 二级路由 /home 和 /publish-article
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'publish-article',
          component: Publish
        },
        {
          path: 'secret-policy',
          component: SecRetPolicy
        },
        {
          path: 'service-item',
          component: ServiceItem
        },
        {
          path: 'article/detail/:aid',
          component: Detail,
          props: true
        },
        {
          path: 'user-center',
          children: [
            {
              path: '',
              component: User
            },
          ]
        },
        {
          path: 'creation-center/:index?',
          children: [
            {
              path: '',
              component: Creation,
              props: true
            },
          ]
        },
      ]
    },
  ]
})

export default router
