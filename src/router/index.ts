import { createRouter as createVueRouter, createWebHistory, type Router } from 'vue-router'
import { createAuthGuard } from "@auth0/auth0-vue";
import HomeView from '../views/HomeView.vue'
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
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import('../views/ProfileView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/ChatView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/ask',
        name: 'ask',
        component: () => import('../views/AskView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import('../views/PlanView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/integrations',
        name: 'integrations',
        component: () => import('../views/IntegrationsView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('../views/HistoryView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/skills',
        name: 'skills',
        component: () => import('../views/SkillsView.vue'),
        beforeEnter: createAuthGuard(app)
      },
      {
        path: '/memory',
        name: 'memory',
        component: () => import('../views/MemoryView.vue'),
        beforeEnter: createAuthGuard(app)
      }
    ]
  })
}
