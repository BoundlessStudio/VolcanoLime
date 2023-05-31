<script setup lang="ts">
import type { AnswerMessage } from "@/types/thread";
import { useDark } from '@vueuse/core'
import { MdPreview  } from "md-editor-v3"

const isDark = useDark()
const props = defineProps<AnswerMessage>()
</script>

<template>
  <div class="relative">
    <div>
      <MdPreview v-model="props.message" :autoDetectCode="true"  :theme="isDark ? 'dark' : 'light'" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <hr class="mx-4  dark:border-slate-400" />
    <div class="px-5 py-1">
      <div class="flex flex-col md:flex-row">
        <div class="">
          <span class="text-xs font-bold pr-2">Follow-up</span>
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
    <div class="px-5 py-1">
      <div class="flex flex-col">
        <div class="">
          <span class="text-xs font-bold pr-2">Citations</span>
        </div>
        <template v-for="(item) in props.citations">
          <div class="flex">
            <div class="flex-none">
              <font-awesome-icon :icon="['fa-brands', item.provider]" class="w-12 h-12 pt-2 pr-3 text-gray-500 dark:text-gray-400" />
            </div>
            <div class="flex-grow flex flex-col text-xs text-gray-50 py-1">
              <div class="-ml-1">
                <sup>{{item.number}}</sup>
                <span class="pl-1 text-sm font-semibold leading-6 text-indigo-500 dark:text-indigo-200">{{item.document}}</span>
              </div>
              <div class="flex">
                <div class="text-gray-500 dark:text-gray-100 ">
                  <font-awesome-icon :icon="item.origin" class="w-3 h-3 pr-1" />
                </div>
                <div class="px-1 text-gray-500 dark:text-gray-100 ">
                  <span>{{item.source}}</span>
                </div>
                <div class="text-gray-400">
                  <span>{{item.author}} - {{item.timestamp}}</span>
                </div>
              </div>
              <div>
                <span class="text-sm text-lime-600 dark:text-lime-100">{{item.text}}</span>
              </div>
            </div>
            <div class="flex-none pt-2 pl-2">
              <span class="inline-flex items-center rounded-md bg-lime-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{(item.confidence * 100).toFixed(2)}}%</span>
            </div>
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
  