import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import UsersPage from '../pages/UsersPage.vue'
import FilmsPage from '../pages/FilmsPage.vue'
import TicketsPage from '../pages/TicketsPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: async () => await LoginPage,
    },
    {
      path: '/users',
      name: 'users-page',
      component: async () => await UsersPage,
    },

    {
      path: '/films',
      name: 'films-page',
      component: async () => await FilmsPage,
    },

    {
      path: '/tickets',
      name: 'tickets-page',
      component: async () => await TicketsPage,
    },

    { path: '/:pathMatch(.*)*', component: async () => await NotFoundPage },
  ],
})

export default router