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

const recentChats = [
  { id: 1, title: 'gray-cattle', href: '/chat/1', ts: new Date().toLocaleString() },
  { id: 2, title: 'Custom title that is really long and will need to get truncated', href: '/chat/2',  ts: new Date().toLocaleString() },
  { id: 3, title: 'emerald-barracuda', href: '/chat/3',  ts: new Date().toLocaleString() },
  { id: 4, title: 'chocolate-mongoose', href: '/chat/4',  ts: new Date().toLocaleString() },
  { id: 5, title: 'plum-bird', href: '/chat/5',  ts: new Date().toLocaleString() },
]
const recentAsks = [
  { id: 1, title: 'blue-swallow', href: '/ask/1', ts: new Date().toLocaleString() },
  { id: 2, title: 'ivory-gal', href: '/ask/2',  ts: new Date().toLocaleString() },
  { id: 3, title: 'turquoise-horse', href: '/ask/3',  ts: new Date().toLocaleString() },
]
const recentPlans = [
  { id: 1, title: 'violet-koala', href: '/plan/1', ts: new Date().toLocaleString() },
  { id: 2, title: 'green-albatross', href: '/plan/2',  ts: new Date().toLocaleString() },
  { id: 3, title: 'scarlet-hippopotamus', href: '/plan/3',  ts: new Date().toLocaleString() },
  { id: 4, title: 'silver-guineafowl', href: '/plan/4',  ts: new Date().toLocaleString() },
]
const integrations = [
  { name: 'Micrsoft', icon: 'fa-brands fa-windows', enabled: true, activated: true },
  { name: 'Google', icon: 'fa-brands fa-google', enabled: true, activated: false  },
  { name: 'Github', icon: 'fa-brands fa-github', enabled: false, activated: false },
  { name: 'Notion', icon: 'fa-brands fa-notion', enabled: false, activated: false  },
  { name: 'Trello', icon: 'fa-brands fa-trello', enabled: false, activated: false  },
  { name: 'Slack', icon: 'fa-brands fa-slack', enabled: false, activated: false },
  { name: 'Discord', icon: 'fa-brands fa-discord', enabled: false, activated: false  },
  // { name: 'Twitter', icon: 'fa-brands fa-twitter', enabled: false, activated: false  },
  // { name: 'Facebook', icon: 'fa-brands fa-facebook', enabled: false, activated: false  },
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
    <div class="flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-600 dark:text-gray-200">
      <div class="p-4">
        <div class="grid grid-cols-1 gap-x-4 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
          <div class="grid grid-cols-2 gap-x-6 sm:gap-x-8">
            <div>
              <div class="flow-root">
                <div class="-my-2">
                  <div class="h-64">
                    <div>
                      <a href="/chat" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                        <font-awesome-icon icon="comment" class="text-sky-500 h-6 w-6 flex-none" aria-hidden="true" />
                        <span class=" hover:underline">Chat</span>
                      </a>
                      <span class="text-gray-400">Talk with your Ai assistant</span>
                    </div>
                    <div class="pt-3 pb-5">
                      <div class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                        <font-awesome-icon icon="fa-brands fa-markdown" class="text-gray-600 dark:text-gray-100 h-6 w-6 flex-none" aria-hidden="true" />
                        <span>Markdown</span>
                      </div>
                      <span class="text-gray-400">Enhanced with markdown to visualize charts, tables, diagrams, lists, and formating</span>
                    </div>
                  </div>
                  <div class="">
                    <div class="">
                      <span class="text-sm font-bold leading-6">Recent Chats</span>
                    </div>
                    <article v-for="post in recentChats" :key="post.id" class="relative isolate flex max-w-2xl flex-col items-stretch py-1">
                      <a :href="post.href" class="truncate font-bold">{{ post.title }}</a>
                      <time :datetime="post.ts" class="text-sm text-gray-400">{{ post.ts }}</time>
                    </article>
                    <div class="py-1">
                        <RouterLink to="/chats" class="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">
                          See all <span aria-hidden="true">&rarr;</span>
                        </RouterLink>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flow-root">
                <div class="-my-2">
                  <div class="h-64">
                    <div>
                      <a href="/ask" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                        <font-awesome-icon icon="magnifying-glass" class="text-green-500 h-6 w-6 flex-none" aria-hidden="true" />
                        <span class=" hover:underline">Ask</span>
                      </a>
                      <span class="text-gray-400">Search memories to recall the past</span>
                    </div>
                    <div class="pt-3 pb-5">
                      <a href="/memory" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                        <font-awesome-icon icon="fa-brain" class="text-pink-400 h-6 w-6 flex-none" aria-hidden="true" />
                        <span class=" hover:underline">Memory</span>
                      </a>
                      <span class="text-gray-400">Manage private memories and share collective memory used in congitive search</span>
                    </div>
                  </div>
                  <div class="">
                    <div class="">
                      <span class="text-sm font-bold leading-6">Recent Q/A</span>
                    </div>
                    <article v-for="post in recentAsks" :key="post.id" class="relative isolate flex max-w-2xl flex-col items-stretch py-1">
                      <a :href="post.href" class="truncate font-bold">{{ post.title }}</a>
                      <time :datetime="post.ts" class="text-sm text-gray-400">{{ post.ts }}</time>
                    </article>
                    <div class="py-1">
                        <RouterLink to="/questions" class="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">
                          See all <span aria-hidden="true">&rarr;</span>
                        </RouterLink>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
            <div class="flow-root">
              <div class="-my-2">
                <div class="h-64">
                  <div>
                    <a href="/plan" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                      <font-awesome-icon icon="list-check" class="text-amber-500 h-6 w-6 flex-none" aria-hidden="true" />
                      <span class=" hover:underline">Plan</span>
                    </a>
                    <span class="text-gray-400">Use skills to complete a goal</span>
                  </div>
                  <div class="pt-3">
                    <a href="/skills" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                      <font-awesome-icon icon="screwdriver-wrench" class="text-teal-400 h-6 w-6 flex-none" aria-hidden="true" />
                      <span class=" hover:underline">Skills</span>
                    </a>
                    <span class="text-gray-400">Craft custom semantic skills</span>
                  </div>
                  <div class="pt-3 pb-5">
                    <a href="/tasks" class="flex gap-x-4 py-2 text-sm font-semibold leading-6">
                      <font-awesome-icon icon="wand-magic-sparkles" class="text-purple-400 h-6 w-6 flex-none" aria-hidden="true" />
                      <span class=" hover:underline">Tasks</span>
                    </a>
                    <span class="text-gray-400">Combine plans with data to create automated tasks</span>
                  </div>
                </div>
                <div class="">
                  <div class="">
                    <span class="text-sm font-bold leading-6">Recent Goals</span>
                  </div>
                  <article v-for="post in recentPlans" :key="post.id" class="relative isolate flex max-w-2xl flex-col items-stretch py-1">
                    <a :href="post.href" class="truncate font-bold">{{ post.title }}</a>
                    <time :datetime="post.ts" class="text-sm text-gray-400">{{ post.ts }}</time>
                  </article>
                  <div class="py-1">
                      <RouterLink to="/plans" class="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-200">
                        See all <span aria-hidden="true">&rarr;</span>
                      </RouterLink>
                    </div>
                </div>
              </div>
            </div>
            <div class="relative flex flex-col w-full">
              <div class="pt-2 pb-2">
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
              <div class="pt-5 pb-2">
                <font-awesome-icon icon="user" class="h-5 w-5" />
                <RouterLink to="/profile" class=" hover:underline pl-2 text-sm font-semibold leading-6 text-gray-600 dark:text-gray-200">Profile</RouterLink>
                <div>Change your account details</div>
              </div>
              <div class="py-2">
                <font-awesome-icon icon="fa-circle-nodes" class="h-5 w-5" />
                <RouterLink to="/integrations" class="pl-2   hover:underline text-sm font-semibold leading-6 text-gray-600 dark:text-gray-200">Integrations</RouterLink>
                <div>Connect providers of skills and memories</div>
                <div class="flex text-gray-500 dark:text-gray-400">
                  <div v-for="(item) in integrations" v-bind:key="item.name" class="p-1">
                    <font-awesome-icon title="active" :icon="item.icon" :class="['h-5 w-5 p-1', item.enabled ? 'border-b-4 ' : '', item.activated ? 'border-lime-400' : '']" />
                  </div>
                </div>
              </div>
              <div class="pt-2 pb-5">
                <font-awesome-icon icon="right-from-bracket" class="h-5 w-5" />
                <RouterLink to="/logoff" class=" hover: hover:underline pl-2 text-sm font-semibold leading-6 text-gray-600 dark:text-gray-200">Log out</RouterLink>
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