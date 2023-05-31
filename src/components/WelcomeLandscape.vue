<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
const { getAccessTokenSilently } = useAuth0();

const getData = async () => {
  const token = await getAccessTokenSilently()
  const response = await fetch('https://electric-raspberry.ngrok.app/WeatherForecast', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  const data = await response.json();
  console.log("API", data)
}

const { user } = useAuth0()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const engagement = [
  { name: 'Chat', description: 'Talk with your Ai assistant', icon: 'comment', color: 'text-sky-500' },
  { name: 'Ask', description: 'Search memories to recall the past', icon: 'magnifying-glass', color: 'text-green-500' },
  { name: 'Plan', description: 'Use skills to complete a goal', icon: 'list-check', color: 'text-amber-500' },
  { name: 'Draw', description: 'Dream up new images', icon: 'paintbrush', color: 'text-purple-500' },
]
const resources = [
  { name: 'Skills', description: 'User created semantic skills', href: '/skills', icon: 'screwdriver-wrench', color: 'text-indigo-500' },
  { name: 'Memory', description: 'Store memories for congitive search', href: '/memory', icon: 'fa-brain', color: 'text-red-500' },
  { name: 'Integrations', description: 'Connect external providers', href: '/integrations', icon: 'fa-circle-nodes', color: 'text-teal-500' },
]
const recentPosts = [
  { id: 1, title: 'Chat 1 - Test', href: '/thread/1', ts: new Date().toLocaleString() },
  { id: 2, title: 'Chat 2 - with a really long title that needs to get truncated', href: '/thread/2',  ts: new Date().toLocaleString() },
  { id: 3, title: 'Chat 3 - Testing', href: '/thread/3',  ts: new Date().toLocaleString() },
  { id: 4, title: 'Chat 4 - Testing', href: '/thread/4',  ts: new Date().toLocaleString() },
  { id: 5, title: 'Chat 5 - Testing', href: '/thread/5',  ts: new Date().toLocaleString() },
]
</script>
<template>
  <div class="h-screen px-2">
    <div class="flex justify-center items-center">
      <RouterLink to="/">
        <img class="h-32 w-32" src="https://i.imgur.com/39VOU8x.png" alt="Volcano Lime" />
      </RouterLink>
    </div>
    <div class="flex justify-center pb-3">
      <img class="w-96" src="https://i.imgur.com/hoGx2Ce.png" />
    </div>
    <div class="flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 bg-white dark:bg-slate-600 dark:text-gray-200">
      <div class="p-4">
        <div class="grid grid-cols-1 gap-x-4 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
          <div class="grid grid-cols-2 gap-x-6 sm:gap-x-8">
            <div>
              <h3 class="text-sm font-medium leading-6">Engagement</h3>
              <div class="mt-6 flow-root">
                <div class="-my-2">
                  <template v-for="item in engagement" :key="item.name">
                    <a href="/thread" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                      <font-awesome-icon :icon="item.icon" :class="item.color" class="h-6 w-6 flex-none" aria-hidden="true" />
                      <span>{{ item.name }}</span>
                    </a>
                    <span >{{ item.description }}</span>
                  </template>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium leading-6">Resources</h3>
              <div class="mt-6 flow-root">
                <div class="-my-2">
                  <template v-for="item in resources" :key="item.name">
                    <a :href="item.href"
                      class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                      <font-awesome-icon :icon="item.icon" :class="item.color" class="h-6 w-6 flex-none" aria-hidden="true" />
                      <span>{{ item.name }}</span>
                    </a>
                    <span class="">{{ item.description }}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
            <div>
              <div class="pb-4">
                <span class="text-sm font-semibold leading-6 ">Recent History</span>
              </div>
              <div class="py-1">
                <RouterLink to="/history" class="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">
                  See all <span aria-hidden="true">&rarr;</span>
                </RouterLink>
              </div>
              <article v-for="post in recentPosts" :key="post.id" class="relative isolate flex max-w-2xl flex-col items-stretch py-1">
                <a :href="post.href" class="truncate font-bold">{{ post.title }}</a>
                <time :datetime="post.ts" class="text-sm">{{ post.ts }}</time>
              </article>
            </div>
            <div class="relative flex flex-col w-full">
              <div class="pb-4">
                <span class="text-sm font-semibold leading-6 ">Account</span>
              </div>
              <div class="py-3">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block h-9 w-9 rounded-full" :src="user.picture" alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium">{{ user.name }}</p>
                    <p class="text-xs font-medium">{{ user.email }}</p>
                  </div>
                </div>
              </div>
              <div class="py-1">
                <font-awesome-icon icon="user" class="h-5 w-5" />
                <RouterLink to="/profile" class="pl-2 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">Your profile</RouterLink>
              </div>
              <div class="py-1">
                <font-awesome-icon icon="right-from-bracket" class="h-5 w-5" />
                <RouterLink to="/logoff" class="pl-2 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">Log out</RouterLink>
              </div>
              <div class="absolute bottom-0 right-0">
                <a href="#" v-if="isDark" @click="toggleDark()" class="py-1">
                  <font-awesome-icon icon="sun" class="h-4 w-4 text-amber-300" /> 
                  <span class="pl-2 text-sm font-semibold leading-6">Lumos!</span>
                </a>
                <a href="#" v-else @click="toggleDark()" class="py-1">
                  <font-awesome-icon icon="moon" class="h-4 w-4 text-sky-300" />
                  <span class="pl-2 text-sm font-semibold leading-6 text-gray-600">Nox!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>