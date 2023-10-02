import { createRouter as createVueRouter, createWebHistory, type Router } from 'vue-router'
import { createAuthGuard } from '@auth0/auth0-vue'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue'
import type { App } from 'vue'

export function createRouter(app: App): Router {
  const guard = createAuthGuard(app)
  return createVueRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
        beforeEnter: (to) => guard(to)
      },
      {
        path: '/:catchAll(.*)',
        component: NotFound
      },
    ]
  })
}
