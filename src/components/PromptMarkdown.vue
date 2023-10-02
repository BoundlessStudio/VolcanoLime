<script setup lang="ts">
import { ref, watch } from 'vue';
import { MdEditor, NormalToolbar, type ToolbarNames } from 'md-editor-v3'
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
  const space = prompt.value ? " " : ""
  prompt.value += space + value
})

watch(() => upload.files, (files) => {
  if(prompt.value) {
    prompt.value += "\n"
  }
  for (const file of files) {
    prompt.value += `[${file.name}](${file.url})\n`
  }
})

const toggleRecording = () => {
  whisper.isRecording ? stop() : start()
}

const clear = () => {
  prompt.value = ''
}

const link = () => {
  const url = window.prompt('Enter Url')
  if(url) {
    var uri = new URL(url)
    const leaf = uri.pathname.split('/').pop()
    const host = uri.hostname
    const name = (leaf) ? leaf : host
    prompt.value += `[${name}](${url})`
  }
}

const submit = () => {
  const goal =  prompt.value
  emit('submit', goal)
  prompt.value = ''
}

const tools = ref<ToolbarNames[]>([
  0, 1, 2, 3,
  '=', 
  'pageFullscreen', 'preview', 4
]);
</script>

<template>
  <MdEditor v-model="prompt" @keydown.enter.exact.prevent="submit()" language="en-US" theme="dark" :toolbars="tools" :preview="false">
    <template #defToolbars>
      <NormalToolbar title="link" @onClick="link">
        <template #trigger>
          <font-awesome-icon :icon="['fas', 'link']" class="text-violet-500 px-1" aria-hidden="true" />
        </template>
      </NormalToolbar>
      <NormalToolbar title="upload" @onClick="open">
        <template #trigger>
          <font-awesome-icon :icon="['fas', 'upload']" class="text-amber-500 px-1" aria-hidden="true" />
        </template>
      </NormalToolbar>
      <NormalToolbar title="whisper" @onClick="toggleRecording()">
        <template #trigger>
          <font-awesome-icon v-if="whisper.isRecording" :icon="['fas', 'circle']" pluse class="text-red-500 px-1"  aria-hidden="true" />
          <font-awesome-icon v-else :icon="['fas', 'microphone']" class="text-sky-500 px-1"  aria-hidden="true" />
        </template>
      </NormalToolbar>
      <NormalToolbar title="go" @onClick="submit()">
        <template #trigger>
          <font-awesome-icon :icon="['fas', 'paper-plane']" class="text-lime-500 px-1" aria-hidden="true" />
        </template>
      </NormalToolbar>
      <NormalToolbar title="clear" @onClick="clear()">
        <template #trigger>
          <font-awesome-icon :icon="['fas', 'xmark']" class=" px-1" aria-hidden="true" />
        </template>
      </NormalToolbar>
    </template>
  </MdEditor>
</template>

<style>
</style>
