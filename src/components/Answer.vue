<script setup lang="ts">
import type { AnswerMessage } from "@/types/thread";
import { useDark } from '@vueuse/core'
import { MdPreview  } from "md-editor-v3"

const isDark = useDark()

const props = defineProps<AnswerMessage>()

const tabs = [
  { name: 'Answer', href: '#', icon: 'fa-star', current: true },
  { name: 'Citations', href: '#', icon: 'book-bookmark', current: false },
  { name: 'Sources', href: '#', icon: 'fa-circle-nodes', current: false },
  { name: 'Probes', href: '#', icon: 'fa-question', current: false },
]
</script>

<template>
  <div class="relative">
    <!--
    <div>
      <div class="pl-10 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
            <font-awesome-icon :icon="tab.icon" :class="[tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div>
    -->
    <div>
      <MdPreview v-model="props.message" :autoDetectCode="true"  :theme="isDark ? 'dark' : 'light'" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <hr />
    <div class="px-5 py-1">
      <div class="flex flex-col md:flex-row">
        <div class="">
          <font-awesome-icon title="Learn More" icon="info-circle" class="text-gray-400" />
        </div>
        <template v-for="(item) in props.citations">
          <div class="px-1">
            <button type="button" class="rounded bg-indigo-100 b px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200">
              {{ item.number }}. {{ item.document }}
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="px-5 py-1">
      <div class="flex flex-col md:flex-row">
        <div class="">
          <font-awesome-icon title="Follow-up Questions" icon="circle-question" class="text-gray-400" />
        </div>
        <template v-for="(item) in props.followup">
         <div class="px-1">
            <button type="button" class="rounded bg-slate-100 dark:bg-slate-500 px-2 py-1 text-xs font-semibold dark:text-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-slate-200 dark:hover:bg-slate-400">
              {{ item }}
            </button>
         </div>
        </template>
      </div>
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600 dark:text-indigo-400">{{ ts }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div class="h-10 w-10 bg-white dark:bg-slate-600 rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-lime-500 " />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white dark:bg-slate-600 text-gray-500 dark:text-gray-200 rounded-md border-2 border-regal-green">
        <button title="Remove from thread">
          <font-awesome-icon class="py-1 px-2" icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
  