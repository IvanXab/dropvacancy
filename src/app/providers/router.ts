import { createRouter, createWebHistory } from 'vue-router';
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      component: () => import('@/app/layout/Layout.vue'),
      name: 'Layout',
      redirect: {
        name: 'VacanciesView',
      },
      children: [
        {
          path: '/home',
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
      path: '/auth',
      name: 'AuthView',
      component: () => import('@/pages/AuthView.vue'),
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
      component: () => import('@/pages/404.vue'),
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'AuthView' && !Cookies.get('ACCESS_TOKEN_KEY')) {
    next({ name: 'AuthView' })
  }
  else next();
});

export default router;
