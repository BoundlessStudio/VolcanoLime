<script setup lang="ts">
import {
  BookOpenIcon, LinkIcon, SparklesIcon, MagnifyingGlassIcon, ChatBubbleBottomCenterIcon, ListBulletIcon, ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/vue/24/outline'

const engagement = [
  { name: 'Chat', description:"", href: '/chat', icon: ChatBubbleBottomCenterIcon },
  { name: 'Search', description:"", href: '/ask', icon: MagnifyingGlassIcon },
  { name: 'Plan',  description:"", href: '/plan', icon: ListBulletIcon },
]
const resources = [
  { name: 'Skills', description: 'Learn how to maximize our platform', href: '/skills', icon: SparklesIcon },
  { name: 'Connectors', description: 'Learn how to maximize our platform', href: '/connectors', icon: LinkIcon },
  { name: 'Memory', description: 'See meet-ups and other events near you', href: '/history', icon: BookOpenIcon },
]
const recentPosts = [
  { id: 1, title: 'Chat 1 - Test', href: '/chat/1', date: 'Mar 5, 2023', datetime: '2023-03-05' },
  {
    id: 2,
    title: 'Chat 2 - with a really long title that needs to get truncated',
    href: '/chat/2',
    date: 'Feb 25, 2023',
    datetime: '2023-02-25',
  },
  { id: 3, title: 'Chat 3 - Test', href: '/chat/3', date: 'Feb 21, 2023', datetime: '2023-02-21' },
  { id: 4, title: 'Chat 4 - Test', href: '/chat/3', date: 'Feb 28, 2023', datetime: '2023-02-28' },
  { id: 5, title: 'Chat 5 - Test', href: '/chat/3', date: 'Jan 14, 2023', datetime: '2023-01-14' },
]
</script>

<template>
   <div class="absolute left-1/2 -translate-x-1/2 w-screen max-w-max">
    <div class="flex justify-center items-center">
      <img class="h-32 w-32" src="https://i.imgur.com/39VOU8x.png" alt="Volcano Lime" />
    </div>
    <div class="flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
      <div class="p-4">
        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
          <div class="grid grid-cols-2 gap-x-6 sm:gap-x-8 lg:grid-cols-3">
            <div>
              <h3 class="text-sm font-medium leading-6 text-gray-500">Engagement</h3>
              <div class="mt-6 flow-root">
                <div class="-my-2">
                  <a v-for="item in engagement" :key="item.name" :href="item.href" :title="item.description" class="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900">
                    <component :is="item.icon" class="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium leading-6 text-gray-500">Resources</h3>
              <div class="mt-6 flow-root">
                <div class="-my-2">
                  <a v-for="item in resources" :key="item.name" :href="item.href" :title="item.description"  class="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900">
                    <component :is="item.icon" class="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
            <div>
              <div class="flex justify-between">
                <h3 class="text-sm font-semibold leading-6 text-gray-500">Recent chats</h3>
                <RouterLink to="/history" class="flex col-2 text-sm font-semibold leading-6 text-indigo-600">History</RouterLink>
              </div>
              <div>
                <ul role="list" class="mt-4 space-y-4">
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
        </div>
      </div>
    </div>
  </div>


  
</template>

<style>
</style>