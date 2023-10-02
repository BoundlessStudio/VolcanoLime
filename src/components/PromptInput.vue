<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWhisperStore } from '@/stores/whisper'
import { useUploadStore } from '@/stores/upload'

const { whisper, start, stop } = useWhisperStore()
const { upload, open } = useUploadStore()
const prompt = ref('')

const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

watch(() => whisper.transcription, (value) => {
  prompt.value += ' ' + value
})

watch(() => upload.files, (files) => {
  for (const file of files) {
    prompt.value += ' ' + file
  }
})

const clear = () => {
  prompt.value = ''
}

const submit = () => {
  const goal =  prompt.value
  emit('submit', goal)
  prompt.value = ''
}
</script>

<template>
  <div class="flex">
    <div class="py-2 px-2 rounded-l-lg bg-neutral-600 hover:bg-neutral-500 text-neutral-300 font-bold">
      <button v-if="whisper.isRecording" @click="stop()" class="h-full w-full">
        <font-awesome-icon :icon="['fas', 'circle']" class="h-5 w-5 text-red-600" aria-hidden="true" beat />
      </button>
      <button v-else @click="start()" class="h-full w-full">
        <font-awesome-icon :icon="['fas', 'microphone']" class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div class=" bg-neutral-600 hover:bg-neutral-500 text-neutral-300 font-bold py-2 px-2">
      <button @click="open()" class="h-full w-full">
        <font-awesome-icon :icon="['fas', 'upload']" class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div class="w-full">
      <button v-if="prompt" @click="clear()" class="absolute right-16 bottom-4 text-neutral-400">
        <font-awesome-icon :icon="['fas', 'xmark']" class="h-5 w-5" aria-hidden="true" />
      </button>
      <input @keydown.enter.exact.prevent="submit()" v-model="prompt" placeholder="Give me a goal!" type="text" class="text-sm leading-6 w-full h-12 pr-6 dark:bg-stone-900 dark:text-neutral-200 border-0 text-stone-900 placeholder:text-gray-400 ring-1 ring-inset ring-neutral-600 focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-600 "  />
    </div>
    <div class="">
      <button v-if="props.loading" class="h-full bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded-r-lg ">
        <font-awesome-icon :icon="['fas', 'lemon']" spin class="h-5 w-5" aria-hidden="true" />
      </button>
      <button v-else-if="prompt" @click="submit()" class="h-full bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded-r-lg ">
        <font-awesome-icon :icon="['fas', 'volcano']" class="h-5 w-5" aria-hidden="true" />
      </button>
      <button v-else class="h-full bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded-r-lg">
        <font-awesome-icon :icon="['fas', 'lemon']" class="h-5 w-5 " aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style>
</style>
@/stores/upload