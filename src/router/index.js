import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/service.vue'),
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('../views/notice.vue'),
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('../views/member.vue'),
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('../views/join.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
export { routes }
