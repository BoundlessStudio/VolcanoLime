<script setup lang="ts">
import { MdPreview  } from "md-editor-v3"

const props = defineProps<{
  role: string,
  message: string,
  ts: Date,
}>()
</script>

<template>
  <div class="relative">
    <div>
      <MdPreview v-model="props.message" :autoDetectCode="true" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600">{{ ts.toLocaleString() }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div v-if="props.role === 'assistant'" class="h-10 w-10 bg-white rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-lime-500 " />
      </div>
      <div v-if="props.role === 'user'"  class="h-10 w-10 bg-white rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-user" class="h-6 w-6 pt-1 text-sky-600" />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white rounded-md border-2 border-regal-green">
        <button title="Edit Comment">
          <font-awesome-icon class="p-1 text-gray-500" icon="fa-pen-to-square" />
        </button>
        <button title="Memorize Comment">
          <font-awesome-icon class="p-1 text-gray-500" icon="fa-brain" />
        </button>
        <button title="Remove Comment">
          <font-awesome-icon class="p-1 text-gray-500" icon="fa-square-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
  