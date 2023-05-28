<script setup lang="ts">
import type { AnswerMessage } from "@/types/thread";
import { MdPreview  } from "md-editor-v3"

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
      <MdPreview v-model="props.message" :autoDetectCode="true" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <div class="px-5">
      <span class="font-medium text-gray-900">Citations</span>
      <div>
        <template v-for="(item) in props.citations">
          <div class="py-2">
            <span class="p-2 bg-sky-200 rounded-md">
              {{ item }}
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class="px-5">
      <span class="font-medium text-gray-900">Follow-up Questions</span>
      <div>
        <template v-for="(item) in props.followup">
          <div class="py-2">
            <span class="p-2 bg-lime-200 rounded-md">
              {{ item }}
            </span>
          </div>
        </template>
      </div>
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600">{{ ts }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div class="h-10 w-10 bg-white rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-lime-500 " />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white rounded-md border-2 border-regal-green">
        <button title="Remove from thread">
          <font-awesome-icon class="p-1 text-gray-500" icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
  