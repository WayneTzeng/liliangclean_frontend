import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/pages/service/index.vue')
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/pages/notice/index.vue')
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('@/pages/member/index.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('@/pages/join/index.vue')
  }
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
