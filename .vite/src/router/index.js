import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/',
          component: () => import('@/views/home/index.vue'),
          name: 'Index',
          meta: { title: '首页', affix: true }
        },
        {
          path: '/test',
          name: 'index',
          component: () => import('@/views/test/index.vue'),
          meta: { title: 'MBTI测试', describe: '首页结果页' }
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/error/index.vue')
        }
      ]
    }
  ]
})

export default router
