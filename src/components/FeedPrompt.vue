<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import { useWhisperStore } from '@/stores/whisper'
import { useThreadStore } from '@/stores/thread'
import type { CompletionSource } from '@codemirror/autocomplete'
import { storeToRefs } from 'pinia'

export interface FeedPromptProps {
  id: string
}

const props = defineProps<FeedPromptProps>()

const whisper = useWhisperStore()
const { isRecording, transcription } = storeToRefs(whisper)
const { start, stop } = whisper

const { uploadFiles } = useThreadStore()

const show = ref(0)
const prompt = ref('')
const editorRef = ref<typeof MdEditor>()
const toolbar = ref([
  'bold',
  'underline',
  'italic',
  '-',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'code',
  '-',
  'table',
  '=',
  'pageFullscreen',
  'preview'
] as ToolbarNames[])

const completions = ref<Array<CompletionSource>>([
  (context) => {
    const bots = ['@george', '@jeeves', '@charles', '@dalle', '@alex', '@tesla', '@shuri']
    const word = context.matchBefore(/@\w*/)
    if (word === null || (word.from == word.to && context.explicit)) return null
    return {
      from: word.from,
      options: bots.map((b) => ({ label: b }))
    }
  }
])

watch(transcription, (t) => {
  prompt.value += ' ' + t
})

const emit = defineEmits<{
  (e: 'submit', prompt: string): void
}>()

const toggleShow = async (s: number) => {
  show.value = show.value == s ? 0 : s
}

const submitComment = (e: Event) => {
  e.preventDefault()
  emit('submit', prompt.value)
  prompt.value = ''
}

const recording = () => {
  if (isRecording.value == true) {
    stop()
  } else {
    start()
  }
}

const imageUrl = ref('')
const imageDescription = ref('')
const submitImage = () => {
  if (!imageUrl.value) return

  editorRef.value?.insert((selection: string) => {
    const desc = imageDescription.value ? imageDescription.value : selection
    const url = imageUrl.value
    imageUrl.value = ''
    imageDescription.value = ''
    return {
      targetValue: `![${desc}](${url})`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
}

const linkUrl = ref('')
const linkDescription = ref('')
const submitLink = () => {
  if (!linkUrl.value) return

  editorRef.value?.insert((selection: string) => {
    const desc = linkDescription.value ? linkDescription.value : selection
    const url = linkUrl.value
    linkUrl.value = ''
    linkDescription.value = ''
    return {
      targetValue: `[${desc}](${url})`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
}

const { open, onChange } = useFileDialog()
const choiceFile = () => open()
onChange(async (list: FileList | null) => {
  var files = Array.from(list ?? [])
  await handleFiles(files)
})
const dropZoneRef = ref<HTMLDivElement>()
async function onDrop(files: File[] | null) {
  await handleFiles(files ?? [])
}
async function handleFiles(files: File[]) {
  // handle 'text/csv' by converting to markdown table
  // handle 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' by converting to markdown tables
  // handle 'text/xml', and 'application/json' by converting to markdown code blocks.

  var documents = await uploadFiles(props.id, files)
  for (const file of documents) {
    editorRef.value?.insert((selection: string) => {
      var prefix = file.type.startsWith('image/') ? '!' : ''
      return {
        targetValue: `${prefix}[${file.name}](${file.url})`,
        select: true,
        deviationStart: 0,
        deviationEnd: 0
      }
    })
  }
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div class="py-3 file:flex gap-x-3">
    <div class="relative flex-auto">
      <div class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
        <div class="h-48">
          <MdEditor
            @keydown.enter.shift.exact.prevent="submitComment"
            ref="editorRef"
            v-model="prompt"
            :toolbars="toolbar"
            :completions="completions"
            :maxLength="1000"
            :preview="false"
            :footers="[]"
            noUploadImg
            noKatex
            language="en-US"
          >
          </MdEditor>
        </div>
        <div class="p-1 flex justify-between">
          <div class="space-x-2 text-gray-500 text-sm">
            <button @click="toggleShow(1)" class="p-1">
              <font-awesome-icon icon="microphone" />
            </button>
            <button @click="toggleShow(2)" class="p-1">
              <font-awesome-icon icon="paperclip" />
            </button>
            <button @click="toggleShow(3)" class="p-1">
              <font-awesome-icon icon="image" />
            </button>
            <button @click="toggleShow(4)" class="p-1">
              <font-awesome-icon icon="link" />
            </button>
          </div>
          <div class="pr-2 text-gray-500 text-sm">
            <button title="Shift+Enter" @click="submitComment" class="p-1">
              <font-awesome-icon icon="paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="show == 0" class="py-3 h-28"></div>
  <div v-if="show == 1" class="py-3 h-28">
    <div
      @click="recording"
      class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100 cursor-pointer"
    >
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon v-if="isRecording" icon="circle" class="text-red-500" beat />
        <font-awesome-icon v-else icon="microphone" />
      </div>
      <div>
        <div v-if="isRecording">
          <span>Click here to stop recording and have it transcribed</span>
        </div>
        <div v-else>
          <span>Click here to use your voice instead</span>
        </div>
        <div class="text-gray-300">
          <span>Limit 1 minute</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show == 2" class="py-3 h-28">
    <div
      ref="dropZoneRef"
      class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100"
    >
      <div class="text-gray-400 text-4xl pr-5 md:pt-2">
        <font-awesome-icon icon="paperclip" :class="isOverDropZone ? 'text-lime-500' : ''" />
      </div>
      <div>
        <div>
          <span>Drag and Drop a file here</span>
        </div>
        <div class="text-gray-300 hidden md:block">
          <span>Image - Text - Markdown - Document - Sheet - CSV - PDF</span>
        </div>
        <div class="text-gray-300">
          <span>Limit 200MB</span>
        </div>
      </div>
      <div class="flex-grow flex justify-end py-4">
        <button
          @click="choiceFile"
          type="button"
          class="rounded bg-indigo-400 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Choose file
        </button>
      </div>
    </div>
  </div>
  <div v-if="show == 3" class="py-3 h-28">
    <div
      class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100"
    >
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon icon="image" />
      </div>
      <div class="w-full flex space-x-2 px-2">
        <div class="w-full">
          <label for="url-image" class="sr-only">Url</label>
          <input
            v-model="imageUrl"
            type="input"
            name="url-image"
            id="url-image"
            class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="url"
          />
        </div>
        <div class="w-full">
          <label for="description-image" class="sr-only">Description</label>
          <input
            v-model="imageDescription"
            type="input"
            name="description-image"
            id="escription-image"
            class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="description (optional)"
          />
        </div>
      </div>
      <div class="flex-grow flex justify-end py-1">
        <button
          @click="submitImage"
          type="button"
          class="rounded bg-indigo-400 px-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <font-awesome-icon icon="add" />
        </button>
      </div>
    </div>
  </div>
  <div v-if="show == 4" class="py-3 h-28">
    <div
      class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100"
    >
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon icon="link" />
      </div>
      <div class="w-full flex space-x-2 px-2">
        <div class="w-full">
          <label for="url-image" class="sr-only">Url</label>
          <input
            v-model="linkUrl"
            type="input"
            name="url-image"
            id="url-image"
            class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="url"
          />
        </div>
        <div class="w-full">
          <label for="description-image" class="sr-only">Description</label>
          <input
            v-model="linkDescription"
            type="input"
            name="description-image"
            id="escription-image"
            class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="description (optional)"
          />
        </div>
      </div>
      <div class="flex-grow flex justify-end py-1">
        <button
          @click="submitLink"
          type="button"
          class="rounded bg-indigo-400 px-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <font-awesome-icon icon="add" />
        </button>
      </div>
    </div>
  </div>
</template>
