<script setup lang="ts">
import { MdPreview, MdEditor, type ToolbarNames } from 'md-editor-v3'
import { useAuth0 } from '@auth0/auth0-vue'
import { useToggle, useDropZone, useFileDialog } from '@vueuse/core'
import { useThreadStore } from '@/stores/thread'
import { useWhisperStore } from '@/stores/whisper'
import { onMounted, ref, watch } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useRoute } from 'vue-router'

const { whisper, start, stop } = useWhisperStore()
const { thread, initialize, createGoal, uploadFiles } = useThreadStore()
const { isAuthenticated, loginWithRedirect } = useAuth0()
const route = useRoute()

const loading = ref(false)
const busy = ref(false)
const prompt = ref("")
const result = ref("")
const showMarkdown = ref(false)
const toggleMarkdown = useToggle(showMarkdown)
const showFiles = ref(false)
const toggleUploadControl = useToggle(showFiles)

const showWork = ref(false)

watch(() => whisper.transcription, (value) => {
  prompt.value += ' ' + value
})

const reset = () => {
  document.getElementById('sandbox')?.replaceChildren()
  prompt.value = ""
  result.value = ""
  thread.logs = []
  busy.value = false
}
const login = async () => await loginWithRedirect()
const submit = async () => {
  if(busy.value) return
  try {
    busy.value = true
    loading.value = true
    result.value = await createGoal(prompt.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const isDarkMode = ref(prefersDarkMode)
window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  isDarkMode.value = e.matches
});

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
  var documents = await uploadFiles(files)
  for (const file of documents) {
    prompt.value += ' ' + file.url
  }
  showFiles.value = false
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

onMounted(async () => {
  await initialize()
  const g = route.query.g?.slice(0).toString()
  const w = route.query.w
  if(g) {
    prompt.value = g
    showWork.value = w ? true : false 
    await submit()
  }
})

const tools = [
  'bold','underline','italic',
  '-',
  'title','sub','sup',
  '-',
  'unorderedList','orderedList','task','table',
  '-',
  'link',
  '-',
  'code','mermaid','katex',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
] as ToolbarNames[];
</script>

<template>
  <div class="absolute h-screen w-full flex items-center justify-center bg-[url('https://i.imgur.com/MpXedd3.png')] bg-no-repeat bg-center dark:opacity-30">
    <!--background -->
  </div>
  <div class="absolute min-h-screen w-full flex items-center justify-center bg-white/95 dark:bg-stone-950/95 py-5">
    <div class="w-2/3 flex flex-col gap-10">
      <div class="text-center">
        <span v-if="busy" class="font-logo font-bold text-5xl text-lime-500 dark:text-lime-700">Volcano Lime</span>
        <span v-else class="font-logo font-bold text-7xl text-lime-500 dark:text-lime-700">Volcano Lime</span>
      </div>  
      <div v-if="isAuthenticated" class="flex flex-col gap-3">
        <div v-if="showMarkdown">
          <div class="relative flex flex-grow items-stretch focus-within:z-10 h-64">
            <MdEditor v-model="prompt" class="rounded-lg pr-10 pl-2" previewTheme="github" theme="dark" language="en-US" :toolbars="tools" :preview="false"></MdEditor>
            <div @click="submit()" class="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2">
              <font-awesome-icon :icon="['fas', 'play']" class="h-5 w-5 text-lime-500" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div v-else class="flex rounded-xl shadow-lg">
          <div class="relative flex flex-grow items-stretch focus-within:z-10">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome-icon :icon="['fas', 'lemon']" class="h-5 w-5 text-lime-300" aria-hidden="true" :spin="loading" />
            </div>

            <input @keydown.enter.exact.prevent="submit()" @keydown.enter.shift.exact.prevent="toggleMarkdown()" v-model="prompt" type="text" class="input-chat pl-10 pr-20" placeholder="Give me a goal!" />
            
            <div class="flex gap-3 pr-3 absolute inset-y-0 right-0 items-center">
              <div v-if="busy" @click="reset()" class="cursor-pointer">
                <font-awesome-icon :icon="['fas', 'xmark']" class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <div v-if="!busy && !showMarkdown&& !whisper.isRecording" @click="toggleUploadControl()"  class="cursor-pointer">
                <font-awesome-icon :icon="['fas', 'upload']" class="h-5 w-5 fill-gradient-radial" aria-hidden="true" />
              </div>
              <div v-if="!busy && !showMarkdown && !whisper.isRecording" @click="start()" class="cursor-pointer">
                <font-awesome-icon :icon="['fas', 'microphone']" class="h-5 w-5 fill-gradient-linear" aria-hidden="true" />
              </div>
              <div v-if="whisper.isRecording" @click="stop()" class="cursor-pointer">
                <font-awesome-icon :icon="['fas', 'circle']" class="h-5 w-5 text-red-600" aria-hidden="true" beat />
              </div>
              
            </div>
           
          </div>
        </div>

        <div v-if="showFiles" class="py-3 h-28 rounded-lg bg-[#ecf1f3] dark:bg-[#1c1e1f]  text-black dark:text-neutral-400 p-1 min-h-[64px]">
          <div ref="dropZoneRef" class="p-3 flex ">
            <div class="text-gray-400 text-4xl pr-5 md:pt-2">
              <font-awesome-icon icon="paperclip" :class="isOverDropZone ? 'text-lime-500' : ''" />
            </div>
            <div>
              <div>
                <span>Drag and Drop a file here</span>
              </div>
              <div class="">
                <span>Limit 200MB</span>
              </div>
            </div>
            <div class="flex-grow flex justify-end py-4">
              <button @click="choiceFile" type="button" class="rounded bg-indigo-400 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Choose file
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-[#ecf1f3] dark:bg-[#1c1e1f] p-3 min-h-[64px]">
          <MdPreview v-model="result" previewTheme="github" theme="dark" language="en-US"></MdPreview>
          <div id="sandbox" class="min-h-[400px]"></div>
        </div>

        <div class="text-black dark:text-neutral-400">
          <SwitchGroup as="div" class="flex items-center">
            <Switch v-model="showWork" :class="[showWork ? 'bg-indigo-600 dark:bg-indigo-800' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
              <span aria-hidden="true" :class="[showWork ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
            </Switch>
            <SwitchLabel as="span" class="ml-3 text-sm">
              <span class="font-medium">Show Work</span>
            </SwitchLabel>
          </SwitchGroup>
        </div>

        <div v-if="showWork" class="rounded-lg bg-[#ecf1f3] dark:bg-[#1c1e1f] text-black dark:text-neutral-400 p-3 min-h-[64px]">
          <p v-for="log in thread.logs" class="break-all">{{log}}</p>
        </div>
        <div v-else class="min-h-[64px]"></div>
      </div>
      <div v-else class="text-center">
        <button @click="login" class="button-login">
          <span class="font-semibold">Login</span>
        </button>
      </div>
    </div>
  </div>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg-settings">
    <defs>
      <linearGradient id="linear">
        <stop class="linear-stop1" offset="0%"></stop>
        <stop class="linear-stop2" offset="100%"></stop>
      </linearGradient>
      <radialGradient id="radial">
          <stop class="radial-stop1" offset="0%"></stop>
          <stop class="radial-stop2" offset="100%"></stop>
        </radialGradient>
    </defs>
  </svg>
</template>

<style>
.button-login {
  @apply rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600
}
.input-chat {
  @apply block w-full rounded-xl dark:bg-stone-900 dark:text-neutral-100 border-0 py-3  text-stone-900 ring-1 ring-inset ring-lime-300 placeholder:text-gray-400 focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6
}
.svg-settings {
  /* Hiding this content since it's just settings. See - https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}
.fill-gradient-linear path {
  fill: url(#linear);
}
/* setting colors for linear gradient */
.linear-stop1 {
  stop-color: #ffa94d;
}
.linear-stop2 {
  stop-color: #e8590c;
}
/* radial gradient */
.fill-gradient-radial path {
  fill: url(#radial);
}
/* setting colors for radial gradient */
.radial-stop1 {
  stop-color: #879cf2 ;
}
.radial-stop2 {
  stop-color: #4263eb;
}
</style>
