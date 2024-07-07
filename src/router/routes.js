export const routes = [
  {
    name: 'Menu',
    path: '/SpaceTower/',
    component: () => import('@/views/TheMenu.vue'),
  },
  {
    name: 'Game',
    path: '/SpaceTower/game',
    component: () => import('@/views/TheGame.vue'),
  },
];
