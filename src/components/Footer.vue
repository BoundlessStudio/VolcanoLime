<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { isAuthenticated } = useAuth0()
const navigation = {
  tools: [
    { name: 'Google Search', href: '/about#tools' },
    { name: 'Tool #1', href: '/about#tools' },
    { name: 'Tool #1', href: '/about#tools' },
    { name: 'Tool #1', href: '/about#tools' },
    { name: 'Tool #1', href: '/about#tools' },
  ],
  system: [
    { name: 'Chat', href: '/chat' },
    { name: 'About', href: '/about' },
  ],
  support: [
    { name: 'About', href: '/about' },
    { name: 'Discord', href: 'https://discord.gg/8RKKsyT4Dk' },
  ],
  social: [
    {
      name: 'volcano-lime: the boring stuff',
      href: 'https://github.com/RGBKnights/volcano-lime',
      icon: 'fa-brands fa-github'
    },
    {
      name: 'electric-raspberry: the interesting stuff',
      href: 'https://github.com/RGBKnights/electric-raspberry',
      icon: 'fa-brands fa-github'
    }
  ]
}
</script>

<template>
  <footer class="bg-slate-600 dark:bg-slate-700 text-gray-200 dark:text-gray-400" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-4">
          <div>
            <img src="https://i.imgur.com/lPkdSu2.png" class="w-6 h-6 inline" />
            <img src="https://i.imgur.com/mYwoufP.png" class="w-8 h-8 inline" />
          </div>
          <blockquote>
            <p class="text-xs italic ">
              While we are still in the early stages of development, we are excited to share our
              progress with you and hope you enjoy our work.
            </p>
          </blockquote>
          <div class="flex space-x-6">
            <ul>
              <li v-for="item in navigation.social" :key="item.name">
                <a :href="item.href" :title="item.name" target="_blank" class="">
                  <font-awesome-icon :icon="item.icon" class="h-6 w-6" aria-hidden="true" />
                  <span class="pl-2">{{ item.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6">Tools</h3>
              <ul role="list" class="mt-6 space-y-4 list-disc transition-all duration-200">
                <li v-for="item in navigation.tools" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6">Support</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6">System</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.system" :key="item.name">
                  <a :href="item.href" class="text-sm leading-">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6">Account</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-if="isDark">
                  <a @click="toggleDark()"
                    class="cursor-pointer text-sm leading-6">Theme 🌙</a>
                </li>
                <li v-else>
                  <a @click="toggleDark()"
                    class="cursor-pointer text-sm leading-6">Theme 🔆</a>
                </li>
                <li v-if="isAuthenticated">
                  <a href="/logoff" class="text-sm leading-6">Logoff</a>
                </li>
                <li v-else>
                  <a href="/login" class="text-sm leading-6">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-900/10 pt-8">
        <p class="text-xs leading-5 ">
          &copy; 2023 Venatio Studios. Working with AI before it was cool.
        </p>
      </div>
    </div>
  </footer>
</template>
