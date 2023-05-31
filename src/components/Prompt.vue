<script setup lang="ts">
import { ref, watch } from "vue";
import { useDark, useToggle } from '@vueuse/core'
import { MdEditor } from "md-editor-v3";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { v4 as uuidv4 } from 'uuid';

type ToolbarNames = number | '=' | '-' | 'bold' | 'underline' | 'italic' | 'title' | 'strikeThrough' | 'sub' | 'sup' | 'quote' | 'unorderedList' | 'orderedList' | 'task' | 'codeRow' | 'code' | 'link' | 'image' | 'table' | 'mermaid' | 'pageFullscreen' | 'preview'

const editorRef = ref<typeof MdEditor>()
const toolbars = ref<ToolbarNames[]>([
  'bold', 'underline', 'italic', 'title', 'strikeThrough', 'sub', 'sup', 'quote',
  '-',
  'unorderedList', 'orderedList', 'task',
  '-',
  'codeRow', 'code',
  '-',
  'table',
  '-',
  'mermaid',
  '=',
  'pageFullscreen', 'preview',
])

const isDark = useDark()

const placeholder = ref("") 
const message = ref('')

const markdownEnabled = ref(false)
const toggleMakrdown = useToggle(markdownEnabled)

const chatAiEnabled = ref(true)
const toggleChatAiEnabled = useToggle(chatAiEnabled)

const searchAiEnabled = ref(true)
const toggleSearchAiEnabled = useToggle(searchAiEnabled)

const planAiEnabled = ref(true)
const togglePlanAiEnabled = useToggle(planAiEnabled)

const drawingAiEnabled = ref(true)
const toggleDrawingAiEnabled = useToggle(drawingAiEnabled)

const submitEnabled = ref(true)

watch([chatAiEnabled, searchAiEnabled, planAiEnabled, drawingAiEnabled], (_) => {
  submitEnabled.value = chatAiEnabled.value || searchAiEnabled.value || planAiEnabled.value || drawingAiEnabled.value
  let ph = ["Let's"]
  if(chatAiEnabled.value) {
    ph.push("Chat")
  }
  if(searchAiEnabled.value) {
    ph.push("Search")
  }
  if(planAiEnabled.value) {
    ph.push("Plan")
  }
  if(drawingAiEnabled.value)  {
    ph.push("Draw")
  }
  placeholder.value = ph.join(', ')
}, { immediate: true })

const memoryEnabled = ref(false)
const toggleMemoryEnabled = useToggle(memoryEnabled)
const memories = [
  {
    id: uuidv4(),
    name: 'System',
    options: [
      { value: uuidv4(), label: 'Generic', checked: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'My',
    options: [
      { value: uuidv4(),  label: 'Comments', checked: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Microsoft',
    options: [
      { value: uuidv4(), label: 'Email', checked: true },
      { value: uuidv4(),  label: 'Contacts', checked: true },
      { value: uuidv4(),  label: 'Calendar', checked: true },
      { value: uuidv4(),  label: 'Files', checked: true },
      { value: uuidv4(),  label: 'Tasks', checked: true },
      { value: uuidv4(),  label: 'Notes', checked: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Google',
    options: [
      { value: uuidv4(), label: 'Contacts', checked: false },
      { value: uuidv4(),  label: 'Calendar', checked: false },
      { value: uuidv4(),  label: 'Gmail', checked: false },
      { value: uuidv4(),  label: 'Drive Files', checked: false },
      { value: uuidv4(),  label: 'Documents', checked: false },
      { value: uuidv4(),  label: 'Spreadsheets', checked: false },
      { value: uuidv4(),  label: 'YouTube', checked: false },
    ],
  },
  {
    id: uuidv4(),
    name: 'Slack',
    options: [
      { value: uuidv4(), label: 'Workspace [A]', checked: true },
      { value: uuidv4(),  label: 'Workspace [B]', checked: true },
      { value: uuidv4(),  label: 'Workspace [C]', checked: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Discord',
    options: [
      { value: uuidv4(), label: 'Server [X]', checked: false },
      { value: uuidv4(),  label: 'Server [Y]', checked: false },
      { value: uuidv4(),  label: 'Server [Z]', checked: false },
    ],
  },
  {
    id: uuidv4(),
    name: 'Github',
    options: [
      { value: uuidv4(), label: 'Repositories', checked: false },
      { value: uuidv4(),  label: 'Issues', checked: false },
      { value: uuidv4(),  label: 'Pull Requests', checked: false },
      { value: uuidv4(),  label: 'Files', checked: false },
      { value: uuidv4(),  label: 'Gist', checked: false },
    ],
  },
  {
    id: uuidv4(),
    name: 'Dropbox',
    options: [
      { value: uuidv4(),  label: 'Files', checked: false },
    ],
  }
]

const skillsEnabled = ref(false)
const toggleSkillsEnabled = useToggle(skillsEnabled)

//TODO: Change to list the skills and functions that are enabled for options (For example Writer)
const skills = [
  {
    id: uuidv4(),
    name: 'Writer',
    options: [
      { value: uuidv4(), label: 'Acronym', description: "",  checked: true },
      { value: uuidv4(), label: 'NovelChapter', description: "", checked: false },
      { value: uuidv4(), label: 'NovelOutline', description: "", checked: false },
      { value: uuidv4(), label: 'Rewrite', description: "", checked: false },
      { value: uuidv4(), label: 'ShortPoem', description: "", checked: false },
      { value: uuidv4(), label: 'ShortStory', description: "", checked: false },
      { value: uuidv4(), label: 'SloganMaker', description: "", checked: true },
      { value: uuidv4(), label: 'Translate', description: "", checked: false },
      { value: uuidv4(), label: 'Summary', description: "", checked: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Coded',
    options: [
      { value: 'TextMemorySkill',  label: 'Text Memory', checked: true },
      { value: 'MathSkill',  label: 'Math', checked: true },
      { value: 'TextSkill',  label: 'Text', checked: true },
      { value: 'TimeSkill',  label: 'Time', checked: true },
      { value: 'WaitSkill',  label: 'Wait', checked: true },
      { value: 'ConvertSkill',  label: 'Convert', checked: true },
      { value: 'FileIOSkill',  label: 'File IO', checked: true },
      { value: 'HttpSkill',  label: 'Http', checked: true },
      { value: 'SearchUrlSkill',  label: 'Search Url', checked: true },
      { value: 'WebFileDownloadSkill',  label: 'Web File Download', checked: true },
      { value: 'WebSearchEngineSkill',  label: 'Web Search Engine', checked: true },
    ],
  }
]
</script>

<template>
  <div class="container mx-auto fixed transition-all duration-500 ease-in-out -top-4 z-10">
    <div class="h-full rounded-lg bg-white dark:bg-slate-600 dark:text-gray-200 shadow">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-start space-x-4">
          <div class="min-w-0 flex-1">
            <form action="#">
              <div class="border-b border-gray-200 focus-within:border-lime-600">
                <label for="comment" class="sr-only">How can I assist you today?</label>
                <textarea v-model="message" :placeholder="placeholder" rows="4" name="comment" id="comment"
                  class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 dark:bg-slate-600 dark:text-gray-200 focus:border-lime-600 focus:ring-0 sm:text-sm sm:leading-6">
                </textarea>
              </div>
              <div class="flex justify-between pt-2">
                <div class="flex items-center space-x-5">
                  <div class="flow-root">
                    <button type="button" title="Whisper Voice"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="fa-microphone" />
                    </button>
                    <!-- <button type="button" title="Stop Recording"
                      class="-m-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="circle" beat class="text-red-500" />
                    </button> -->
                  </div>
                  <div class="flow-root">
                    <button @click="toggleMakrdown()" title="Markdown Editor" type="button"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="fa-brands fa-markdown" />
                    </button>
                  </div>
                  <div class="flow-root">
                    <button @click="toggleChatAiEnabled()" :title="(chatAiEnabled ? 'Disable' : 'Enable') + ' Chat Ai'"
                      type="button"
                      :class="[chatAiEnabled ? 'text-sky-500 hover:text-sky-400' : '', '-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full']">
                      <font-awesome-icon icon="robot" />
                    </button>
                    <button @click="toggleSearchAiEnabled()"
                      :title="(searchAiEnabled ? 'Disable' : 'Enable') + ' Seach Ai'" type="button"
                      :class="[searchAiEnabled ? 'text-lime-500 hover:text-lime-400' : '', '-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full']">
                      <font-awesome-icon icon="robot" />
                    </button>
                    <button @click="togglePlanAiEnabled()" :title="(planAiEnabled ? 'Disable' : 'Enable') + ' Plan Ai'"
                      type="button"
                      :class="[planAiEnabled ? 'text-amber-500 hover:text-amber-400' : '', '-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full']">
                      <font-awesome-icon icon="robot" />
                    </button>
                    <button @click="toggleDrawingAiEnabled()"
                      :title="(drawingAiEnabled ? 'Disable' : 'Enable') + ' Drawing Ai'" type="button"
                      :class="[drawingAiEnabled ? 'text-purple-500 hover:text-purple-400' : '', '-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full']">
                      <font-awesome-icon icon="robot" />
                    </button>
                  </div>
                  <div class="flow-root">
                    <button @click="toggleMemoryEnabled()" title="Limit Memories" type="button"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="brain" />
                    </button>
                    <button @click="toggleSkillsEnabled()" title="Limit Skills" type="button"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="screwdriver-wrench" />
                    </button>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <button :disabled="!submitEnabled" type="submit"
                    :class="[submitEnabled ? ' bg-lime-500  hover:bg-lime-600' : 'bg-gray-600', 'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']">
                    <font-awesome-icon class="h-5 w-5" icon="fa-paper-plane" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="h-10 bg-gradient-to-b from-regal-green"></div>
  </div>

  <TransitionRoot as="template" :show="markdownEnabled">
    <Dialog as="div" class="relative z-10" @close="toggleMakrdown()">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-zinc-900 bg-opacity-95 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl sm:p-6">
              <div class="flex items-start space-x-4 ">
                <div class="min-w-0 flex-1">
                  <form action="#">
                    <div class="border-b border-gray-200 focus-within:border-indigo-600">
                      <MdEditor ref="editorRef" v-model="message" :toolbars="toolbars" :no-upload-img="true" :theme="isDark ? 'dark' : 'light'" :placeholder="placeholder" language="en-US" codeTheme="github" previewTheme="github">
                      </MdEditor>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot as="template" :show="skillsEnabled">
    <Dialog as="div" class="relative z-10" @close="toggleSkillsEnabled()">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Skills</DialogTitle>
              <fieldset>
                <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                  <Disclosure as="div" v-for="section in skills" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
                    <h3 class="-my-3 flow-root">
                      <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <font-awesome-icon v-if="!open" class="h-5 w-5" icon="plus" />
                          <font-awesome-icon v-else class="h-5 w-5" icon="minus" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-4">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </fieldset>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot as="template" :show="memoryEnabled">
    <Dialog as="div" class="relative z-10" @close="toggleMemoryEnabled()">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Limit Memory Collections</DialogTitle>
              <div>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <font-awesome-icon class="h-5 w-5 text-gray-400" icon="search" />
                  </div>
                  <input type="search" class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" />
                </div>
              </div>
              <fieldset>
                <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                  <Disclosure as="div" v-for="section in memories" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
                    <h3 class="-my-3 flow-root">
                      <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <font-awesome-icon v-if="!open" class="h-5 w-5" icon="plus" />
                          <font-awesome-icon v-else class="h-5 w-5" icon="minus" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-4">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </fieldset>
          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot></template>

<style scoped>
</style>
  