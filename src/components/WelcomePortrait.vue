<script setup lang="ts">
import { LinkIcon, BookOpenIcon, SparklesIcon, MagnifyingGlassIcon, ChatBubbleBottomCenterIcon, ListBulletIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router';

const resources = [
  { name: 'Skills', description: 'User created semantic skills', href: '/skills', icon: SparklesIcon, color: 'text-indigo-500' },
  { name: 'Integrations', description: 'Connect external providers for memories and skills', href: '/connectors', icon: LinkIcon, color: 'text-teal-500' },
  { name: 'Memory', description: 'Store memories for congitive search', href: '/history', icon: BookOpenIcon, color: 'text-red-500' },
]
const recentPosts = [
  { id: 1, title: 'Chat 1 - Test', href: '/chat/1', date: 'Mar 5, 2023', datetime: '2023-03-05' },
  { id: 2, title: 'Chat 2 - with a really long title that needs to get truncated', href: '/chat/2', date: 'Feb 28, 2023', datetime: '2023-02-28' },
  { id: 3, title: 'Chat 3 - Testing', href: '/chat/3',  date: 'Feb 25, 2023', datetime: '2023-02-25' },
  { id: 4, title: 'Chat 4 - History', href: '/chat/4', date: 'Feb 21, 2023', datetime: '2023-02-21' },
  { id: 5, title: 'Chat 5 - Archived', href: '/chat/5', date: 'Jan 14, 2023', datetime: '2023-01-14' },
]
const tabs = [
  { name: 'Chat', description: 'Chat with your Ai assiant', href: '/chat', icon: ChatBubbleBottomCenterIcon, color: 'text-sky-500'  },
  { name: 'Search', description: 'Search memories to recall the past', href: '/ask', icon: MagnifyingGlassIcon, color: 'text-green-500'  },
  { name: 'Plan', description: 'Plan a goal using skills', href: '/plan', icon: ListBulletIcon, color: 'text-amber-500'  },
]
</script>

<template>
  <div class="absolute left-1/2 -translate-x-1/2 w-screen max-w-max">
    <div class="flex justify-center items-center">
      <img class="h-32 w-32" src="https://i.imgur.com/39VOU8x.png" alt="Volcano Lime" />
    </div>
    <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
      <div class="p-4">
        <div v-for="item in tabs" :key="item.name" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <component :is="item.icon" :class="[item.color, 'h-6 w-6']" aria-hidden="true" />
          </div>
          <div>
            <a :href="item.href" class="font-semibold text-gray-900">
              {{ item.name }}
              <span class="absolute inset-0" />
            </a>
            <p class="mt-1 text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="grid grid-cols-3 divide-x divide-gray-900/5 bg-gray-50">
        <a v-for="item in resources" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
          <component :is="item.icon" :class="[item.color, 'h-5 w-5']" aria-hidden="true" />
          {{ item.name }}
        </a>
      </div>
      <hr />
      <div class="bg-gray-50 p-8">
        <div class="flex justify-between">
          <h3 class="text-sm font-semibold leading-6 text-gray-500">Recent History</h3>
          <RouterLink to="/history" class="text-sm font-semibold leading-6 text-indigo-600">See all <span aria-hidden="true">&rarr;</span></RouterLink>
        </div>
        <ul role="list" class="mt-2 space-y-2">
          <li v-for="post in recentPosts" :key="post.id" class="relative">
            <time :datetime="post.datetime" class="block text-xs leading-6 text-gray-600">{{ post.date }}</time>
            <a :href="post.href" class="block truncate text-sm font-semibold leading-6 text-gray-900">
              {{ post.title }}
              <span class="absolute inset-0" />
            </a>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<style>
</style>