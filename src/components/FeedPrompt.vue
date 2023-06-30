<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import type { CompletionSource } from '@codemirror/autocomplete';

const prompt = ref('')

const emit = defineEmits<{
  (e: 'submit', prompt: string): void
}>()

const show = ref(0)
const toggleShow = async (s: number) => {
  show.value = (show.value == s) ? 0 : s
}

const submitComment = (e: Event) => {
  e.preventDefault()
  emit('submit', prompt.value)
  prompt.value = ''
}

const editorRef = ref();
const toolbar = ref([
  'bold','underline','italic',
  '-',
  'unorderedList','orderedList','task',
  '-',
  'code',
  '-',
  'table',
  '=',  
  'pageFullscreen','preview',
] as ToolbarNames[])

const completions = ref<Array<CompletionSource>>([
  (context) => {
    const bots = ['@george', '@jeeves', '@dalle', '@mary', '@tessla', '@shuri']
    const word = context.matchBefore(/@\w*/)
    if (word === null || (word.from == word.to && context.explicit)) return null
    return {
      from: word.from,
      options: bots.map(b => ({ label: b }))
    }
  }
])
</script>

<template>
  <div class="py-3 file:flex gap-x-3">
    <div class="relative flex-auto">
      <div class="overflow-hidden rounded-lg  shadow-sm ring-1 ring-inset ring-gray-300 ">
        <div class="h-48">
          <MdEditor ref="editorRef" v-model="prompt" :toolbars="toolbar" :completions="completions" :maxLength="1000" :preview="false" :footers="[]" noUploadImg noKatex language="en-US" >
          </MdEditor>
        </div>
        <div class="p-1 flex justify-between">
          <div class="space-x-2 text-gray-500 text-sm">
            <button @click="toggleShow(1)" class="p-1">
              <font-awesome-icon icon="microphone"/>
            </button>
            <button @click="toggleShow(2)" class="p-1">
              <font-awesome-icon icon="paperclip"  />
            </button>
            <button @click="toggleShow(3)" class="p-1">
              <font-awesome-icon icon="image"  />
            </button>
            <button @click="toggleShow(4)" class="p-1">
              <font-awesome-icon icon="link"  />
            </button>
          </div>
          <div class="pr-2 text-gray-500 text-sm">
            <button @click="submitComment" class="p-1">
              <font-awesome-icon icon="paper-plane"  />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="show==0" class="py-3 h-28">
  </div>
  <div v-if="show==1" class="py-3 h-28">
    <div class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100">
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon icon="microphone" />
      </div>
      <div>
        <div>
          <span>Click here to use your voice instead</span>
        </div>
        <div class="text-gray-300 ">
          <span>Limit 1 minute</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show==2" class="py-3 h-28">
    <div class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100">
      <div class="text-gray-400 text-4xl pr-5 md:pt-2">
        <font-awesome-icon icon="paperclip" />
      </div>
      <div>
        <div>
          <span>Drag and Drop a file here</span>
        </div>
        <div class="text-gray-300 hidden md:block">
          <span>Text - Markdown - Document - CSV - Sheet - PDF</span>
        </div>
        <div class="text-gray-300 ">
          <span>Limit 200MB</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show==3" class="py-3 h-28">
    <div class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100">
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon icon="image" />
      </div>
      <div class="w-full flex space-x-2 px-2">
        <div class="w-full">
          <label for="url-image" class="sr-only">Url</label>
          <input type="input" name="url-image" id="url-image" class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="url" />
        </div>
        <div class="w-full">
          <label for="description-image" class="sr-only">Description</label>
          <input type="input" name="description-image" id="escription-image" class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="description (optional)" />
        </div>
      </div>
      <div class="flex-grow flex justify-end">
        <button type="button" class="rounded bg-indigo-400 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <font-awesome-icon icon="add" />
        </button>
      </div>
    </div>
  </div>
  <div v-if="show==4" class="py-3 h-28">
    <div class="p-3 flex rounded-md text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 bg-gray-100">
      <div class="text-gray-400 text-4xl pl-2 pr-6">
        <font-awesome-icon icon="link" />
      </div>
      <div class="w-full flex space-x-2 px-2">
        <div class="w-full">
          <label for="url-image" class="sr-only">Url</label>
          <input type="input" name="url-image" id="url-image" class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="url" />
        </div>
        <div class="w-full">
          <label for="description-image" class="sr-only">Description</label>
          <input type="input" name="description-image" id="escription-image" class="block w-full rounded-md border-0 px-1 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="description (optional)" />
        </div>
      </div>
      <div class="flex-grow flex justify-end">
        <button type="button" class="rounded bg-indigo-400 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <font-awesome-icon icon="add" />
        </button>
      </div>
    </div>
  </div>
</template>