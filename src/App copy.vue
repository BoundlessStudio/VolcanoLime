<template>
  <div class="">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-lime-600 px-6 pb-2">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="inline-block h-14 w-14 rounded-md border-solid border-2 border-lime-400" src="https://i.imgur.com/WcCwop3.png" alt="Your Company" />
                  <span class="pl-3 text-white">Volcano Lime</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <RouterLink :to="item.href"  :class="[item.current ? 'bg-lime-700 text-white' : 'text-lime-200 hover:text-white hover:bg-lime-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-lime-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                            {{ item.name }}
                          </RouterLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-lime-600 px-6">
        <div class="flex h-16 shrink-0 items-center">
          <img class="inline-block h-14 w-14 rounded-md border-solid border-2 border-lime-400" src="https://i.imgur.com/WcCwop3.png" alt="Your Company" />
          <span class="pl-3 text-white">Volcano Lime</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <RouterLink :to="item.href"  :class="[item.current ? 'bg-lime-700 text-white' : 'text-lime-200 hover:text-white hover:bg-lime-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-lime-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li>
              <div class="text-xs font-semibold leading-6 text-lime-200">Recent Chats</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="item in chats" :key="item.name">
                  <RouterLink :to="item.href"  :class="['text-lime-200 hover:text-white hover:bg-lime-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <ChatBubbleBottomCenterIcon :class="['text-lime-200 group-hover:text-white h-6 w-6 shrink-0']" aria-hidden="true"></ChatBubbleBottomCenterIcon>
                    <span class="truncate">{{ item.name }}</span>
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <RouterLink to="/user" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-lime-700">
                <span class="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">User</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-lime-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-lime-200 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
      <a href="#">
        <span class="sr-only">Your profile</span>
        <span class="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </a>
    </div>

    <main class="container mx-auto py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  HomeIcon,
  ChatBubbleBottomCenterIcon,
  SparklesIcon,
  BookOpenIcon,
  LinkIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Skills', href: '/skills', icon: SparklesIcon, current: false },
  { name: 'Connectors', href: '/connectors', icon: LinkIcon, current: false },
  { name: 'Memory', href: '/history', icon: BookOpenIcon, current: false },
]
const chats = [
  { id: 1, name: 'Chat 1', href: '/chat/1', },
  { id: 2, name: 'Chat 2', href: '/chat/2', },
  { id: 3, name: 'Chat 3', href: '/chat/3', },
  { id: 4, name: 'Chat 4', href: '/chat/4', },
  { id: 5, name: 'Chat 5', href: '/chat/5', },
]
const sidebarOpen = ref(false)
</script>