<script setup lang="ts">
import { ref } from "vue";
import { useDark, useToggle, useMediaQuery } from '@vueuse/core'
import { MdEditor } from "md-editor-v3";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'


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
const greaterThenSmall = useMediaQuery('(min-width: 640px)')

const placeholder = ref("") 
const message = ref('')

const markdownEnabled = ref(false)
const toggleMakrdown = useToggle(markdownEnabled)
</script>

<template>
  <div class="container mx-auto fixed transition-all duration-500 ease-in-out -top-4 z-10 ">
    <div class="h-full rounded-lg bg-white dark:bg-slate-600 dark:text-gray-200 shadow">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-start space-x-4">
          <div class="min-w-0 flex-1">
            <form action="#">
              <div class="border-b border-gray-200 focus-within:border-lime-600">
                <label for="comment" class="sr-only">How can I assist you today?</label>
                <textarea v-model="message" :placeholder="placeholder" :rows="greaterThenSmall ? 4 : 1" name="comment" id="comment"
                  class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 dark:bg-slate-600 dark:text-gray-200 focus:border-lime-600 focus:ring-0 sm:text-sm sm:leading-6">
                </textarea>
              </div>
              <div class="flex justify-between pt-2">
                <div class="flex items-center space-x-5">
                  <div class="flow-root sm:hidden">
                    <RouterLink to="/" class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="home" />
                    </RouterLink>
                  </div>
                  <div class="flow-root">
                    <button type="button" title="Whisper Voice"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="fa-microphone" />
                    </button>
                    <!-- 
                    <button type="button" title="Stop Recording"
                      class="-m-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="circle" beat class="text-red-500" />
                    </button> 
                    -->
                  </div>
                  <div class="flow-root">
                    <button @click="toggleMakrdown()" title="Markdown Editor" type="button"
                      class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <font-awesome-icon icon="fa-brands fa-markdown" />
                    </button>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <button type="submit"
                    :class="[' bg-lime-500  hover:bg-lime-600' , 'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']">
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
 </template>

<style scoped>
</style>
  