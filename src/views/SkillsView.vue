<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import { Switch } from '@headlessui/vue'
import { reactive } from 'vue';

const skills = reactive([
  { id: 1, name: 'Writer',  functions: 5, enabled: true },
  { id: 2, name: 'Weather', functions: 4, enabled: true },
  { id: 3, name: 'Coding',  functions: 2, enabled: false },
])
const templates = reactive([
  {
    title: 'Chat',
    functions: 3,
    description: 'Cursus metus aliquam eleifend mi in nulla posuere. ',
    icon: 'comment',
  },
  {
    title: 'Calendar',
    functions: 1,
    description: 'Donec pretium vulputate sapien nec sagittis aliquam malesuada. ',
    icon: 'calendar',
  },
  {
    title: 'Childrens Book',
    functions: 2,
    description: 'Non pulvinar neque laoreet suspendisse interdum consectetur libero. ',
    icon: 'book',
  },
  {
    title: 'Classification',
    functions: 2,
    description: 'Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim. ',
    icon: 'tag',
  },
  {
    title: 'Coding',
    functions: 6,
    description: 'Quis imperdiet massa tincidunt nunc.',
    icon: 'code',
  },
  {
    title: 'Fun',
    functions: 3,
    description: ' Vulputate odio ut enim blandit volutpat maecenas volutpat. ',
    icon: 'face-grin-tongue-wink',
  },
])
</script>

<template>
  <div class="h-screen">
    <Logo></Logo>
    <div class="pt-10 transition-all duration-500 ease-in-out">
      <div class="px-4 sm:px-6 lg:px-8">
        <h1 class="font-semibold leading-6 text-gray-100 text-2xl">Semantic Skills</h1>
        <ul role="list" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <li v-for="skill in skills" :key="skill.id" class="col-span-1 flex rounded-md shadow-sm">
            <div :class="[skill.enabled ? 'bg-lime-500 dark:bg-lime-600' : 'bg-red-500 dark:bg-red-600', ' flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">
              <font-awesome-icon icon="screwdriver-wrench" class="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t text-gray-500 dark:text-gray-200 border-gray-200 bg-white dark:bg-slate-600 dark:border-slate-700">
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <RouterLink :to="'/skills/' + skill.id" class="font-medium">{{ skill.name }}</RouterLink>
                <p class="dark:text-gray-400">{{ skill.functions }} Functions</p>
              </div>
              <div class="flex-shrink-0 pr-2">
                <Switch v-model="skill.enabled" :class="[skill.enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                  <span class="sr-only">Enabled</span>
                  <span aria-hidden="true" :class="[skill.enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                </Switch>
              </div>
            </div>
          </li>
        </ul>
        
        <div class="py-10 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg shadow  text-gray-500 dark:text-gray-200 border-gray-200 bg-neutral-100 dark:bg-slate-600">
            <div class="px-2 py-2">
              <div class="pb-2 text-center">
                <p>Want to make a new skill?</p>
                <p class="text-sm">It is as simple as creating a text prompt. Get started by selecting a template or start from an empty skill.</p>
              </div>
              <div>
                <div class="relative">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center">
                    <span class="bg-neutral-100 dark:bg-slate-600 px-2 text-sm rounded-md">TEMPLATES</span>
                  </div>
                </div>
              </div>
              <ul role="list" class="grid grid-cols-1 gap-6  py-6 sm:grid-cols-2">
                <li v-for="(item, itemIdx) in templates" :key="itemIdx" class="flow-root">
                  <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-500">
                    <div :class="['bg-slate-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg']">
                      <font-awesome-icon :icon="['fas', item.icon]" class="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 class="text-sm font-medium ">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true" />
                          <span>{{ item.title }}</span>
                        </a>
                      </h3>
                      <p class="mt-1 text-sm dark:text-gray-400">{{ item.description }}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <div class="relative">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center">
                    <span class="bg-neutral-100 dark:bg-slate-600 px-2 text-sm rounded-md">OR</span>
                  </div>
                </div>
              </div>
              <div class="mt-2 flex justify-center">
                <button type="button" class="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  text-neutral-100  bg-indigo-500 hover:bg-indigo-400  focus-visible:outline-indigo-500">
                  <span>Start from an empty skill</span>
                </button>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>