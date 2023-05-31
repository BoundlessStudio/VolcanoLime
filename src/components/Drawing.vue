<script setup lang="ts">
import type { ChatMessage } from "@/types/thread";
import { useDark } from '@vueuse/core'
import { MdPreview  } from "md-editor-v3"

const isDark = useDark()

const props = defineProps<ChatMessage>()
</script>

<template>
  <div class="relative">
    <div>
      <MdPreview v-model="props.message" :autoDetectCode="true"  :theme="isDark ? 'dark' : 'light'" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600 dark:text-indigo-400">{{ ts }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div class="h-10 w-10 bg-white dark:bg-slate-600 rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-purple-500 " />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white dark:bg-slate-600 text-gray-500 dark:text-gray-200 rounded-md border-2 border-regal-green">
        <button title="Share Image">
          <font-awesome-icon class="p-1" icon="share" />
        </button>
        <button title="Upscale Image">
          <font-awesome-icon class="p-1" icon="fa-up-right-and-down-left-from-center" />
        </button>
        <button title="Edit Comment">
          <font-awesome-icon class="p-1" icon="pen" />
        </button>
        <button title="Remove from thread">
          <font-awesome-icon class="p-1" icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
  