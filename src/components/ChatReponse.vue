<script setup lang="ts">
import { MdPreview  } from "md-editor-v3"

const props = defineProps<{
  role: string
  message: string
}>()
</script>

<template>
  <div class="relative">
    <div>
      <MdPreview v-model="props.message" :autoDetectCode="true" language="en-US" codeTheme="github" previewTheme="github"  />
    </div>
    <div class="absolute -top-6 -left-6">
      <img v-if="props.role === 'assistant'"  class="h-10 w-10 bg-white rounded-md border-2 border-regal-green" src="https://via.placeholder.com/40x40/ffffff/000000?text=Ai" alt="Ai" />
      <img v-if="props.role === 'user'"  class="h-10 w-10 rounded-md border-2 border-regal-green" src="https://via.placeholder.com/100x100/ffffff/000000?text=Me" alt="Me" />
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white rounded-md border-2 border-regal-green">
        <button>
          <font-awesome-icon class="p-1 text-sky-600" icon="fa-pen-to-square" />
        </button>
        <button>
          <font-awesome-icon class="p-1 text-red-600" icon="fa-square-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
  