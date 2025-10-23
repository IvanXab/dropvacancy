import { createRouter, createWebHistory } from "vue-router";
import { ERoutesName } from "@/shared/enums/ERoutesName";

const routes = [
  {
    name: ERoutesName.BaseLayout,
    path: '/',
    component: () => import("@/app/layout/BaseLayout.vue"),
    redirect: {
      name: ERoutesName.VacanciesPage,
    },
    children: [
      {
        name: ERoutesName.VacanciesPage,
        path: '/vacancies',
        component: () => import("@/pages/VacanciesPage.vue"),
      },
      {
        name: ERoutesName.FavouritesPage,
        path: '/favourites',
        component: () => import("@/pages/VacanciesFavouritesPage.vue.vue"),
      },
      {
        name: ERoutesName.VacanciesMapPage,
        path: '/map',
        component: () => import("@/pages/VacanciesMapPage.vue"),
      },
      {
        name: ERoutesName.VacancyDetailPage,
        path: '/vacancy/:id',
        component: () => import("@/pages/VacancyDetailPage.vue"),
      },
      {
        name: ERoutesName.AnalyticsPage,
        path: '/analytics',
        component: () => import("@/pages/VacanciesAnalyticsPage.vue"),
      },
      {
        name: ERoutesName.AuthPage,
        path: '/auth',
        component: () => import("@/pages/AuthPage.vue"),
      }
    ],
  },
  {
    name: ERoutesName.AnyPath,
    path: '/:pathMatch(.*)*',
    redirect: {
      name: ERoutesName.NotFoundPage
    },
  },
  {
    name: ERoutesName.NotFoundPage,
    path: '/404',
    component: () => import("@/pages/NotFoundPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;