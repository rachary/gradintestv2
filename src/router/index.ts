import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'bg-gray-200',
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/view-layout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/dashboard/home/view-home.vue')
        },
        {
          path: '/chat/:id',
          name: 'chat',
          component: () => import('@/views/dashboard/chat/view-chat.vue'),
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/view-login.vue')
    }

  ]
})

export default router
