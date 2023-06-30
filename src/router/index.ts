import { createRouter as createVueRouter, createWebHistory, type Router } from 'vue-router'
import { createAuthGuard } from "@auth0/auth0-vue";
import HomeView from '../views/HomeView.vue'
import WelcomeView from '@/views/WelcomeView.vue';
import LoginView from '../views/LoginView.vue'
import LogoffView from '../views/LogoffView.vue'
import type { App } from 'vue';


export function createRouter(app: App): Router {
  return createVueRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/login",
        name: "login",
        component: LoginView
      },
      {
        path: "/logoff",
        name: "logoff",
        component: LogoffView
      },
      {
        path: "/",
        name: "home",
        component: HomeView,
        // beforeEnter: createAuthGuard(app)
      },
      {
        path: "/about",
        name: "about",
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import('../views/ProfileView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/welcome",
        name: "welcome",
        component: () => import('../views/WelcomeView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/feed/:id',
        name: 'feed',
        component: () => import('../views/FeedView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      
    ]
  })
}
