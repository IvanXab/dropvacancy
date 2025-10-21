import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/app/layout/BaseLayout.vue'),
    redirect: {
      name: 'VacanciesView',
    },
    children: [
      {
        path: '/analytics',
        name: 'HomeView',
        component: () => import('@/pages/HomeView.vue'),
      },
      {
        path: '/vacancies',
        name: 'VacanciesView',
        component: () => import('@/pages/VacanciesView.vue'),
      },
      {
        path: '/favourites',
        name: 'FavouritesView',
        component: () => import('@/pages/FavouritesView.vue'),
      },
      {
        path: '/map',
        name: 'MapView',
        component: () => import('@/pages/VacanciesMap.vue'),
      },
      {
        path: '/vacancy/:id',
        name: 'AboutVacancy',
        component: () => import('@/pages/VacancyAbout.vue'),
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: {
      name: '404'
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;