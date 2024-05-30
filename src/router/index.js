import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/index.vue'),
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
  ],
})


export default router
