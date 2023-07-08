import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
  },
  // {
  //   path: '/service',
  //   name: 'Service',
  //   component: () => import('../views/service.vue'),
  // },
  // {
  //   path: '/notice',
  //   name: 'Notice',
  //   component: () => import('../views/notice.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export { routes };
