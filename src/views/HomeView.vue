<script setup lang="ts">
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/20/solid'
import { Combobox, ComboboxInput } from '@headlessui/vue'

const tabs = [
  { name: 'Chat', href: '#', current: true },
  { name: 'Ask', href: '#', current: false },
  { name: 'Plan', href: '#', current: false },
]
</script>

<template>
  <div class="main">
    <div class="pb-10">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-lime-500 focus:ring-lime-500">
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          <a v-for="(tab, tabIdx) in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10']" :aria-current="tab.current ? 'page' : undefined">
            <span>{{ tab.name }}</span>
            <span aria-hidden="true" :class="[tab.current ? 'bg-lime-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
          </a>
        </nav>
      </div>
    </div>
    <div class="transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
      <Combobox>
        <div class="relative">
          <ChatBubbleBottomCenterIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Chat..." />
        </div>
      </Combobox>
    </div>
    
  </div>
</template>

<style>
</style>