import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'bg-gray-200',
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/view-layout.vue'),
      meta: {
        requiresAuth: true
      },
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
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.getAuthData()
  const userAuth = authStore.authData?.userAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userAuth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else if (to.path === '/login' && userAuth) {
    next({ name: 'home'})
  } else {
    next()
  }
})

export default router
