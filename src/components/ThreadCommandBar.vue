<script setup lang="ts">
import type { Thread } from '@/types/thread';
const props = defineProps<Thread>()
</script>

<template>
  <div class="relative p-6">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-center">
      <div class="bg-regal-green px-3 text-base font-semibold leading-6 text-white">
        <span class="pr-2 text-2xl ">{{ props.name }}</span>
        <button title="Edit Thread" type="button"
          class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
          <span class="sr-only">Edit Thread</span>
          <font-awesome-icon icon="pen" class="h-4 w-4" aria-hidden="true" />
        </button>
        <button title="Delete Thread" type="button"
          class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
          <span class="sr-only">Delete Thread</span>
          <font-awesome-icon icon="trash" class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
  
</template>

<style scoped></style>