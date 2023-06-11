<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Slider from 'primevue/slider';
import { reactive, ref } from 'vue';
import { MdEditor } from "md-editor-v3";

const editorRef = ref<typeof MdEditor>()

const functions = reactive([
  {
    name: 'Acronym',
    description: "Generate an acronym for the given concept or phrase",
    prompt: "Generate a suitable acronym pair for the concept. Creativity is encouraged, including obscure references. \n The uppercase letters in the acronym expansion must agree with the letters of the acronym. \n Q: Organization to protect the freedom and security of its member countries in North America and Europe. \n A: N.A.T.O: North Atlantic Treaty Organization. \n Q:{{$input}}",
    config: {
      "max_tokens": 100,
      "temperature": 0.5,
      "top_p": 0.0,
      "presence_penalty": 0.0,
      "frequency_penalty": 0.0,
      "stop_sequences": []
    },
    parameters: [
      {
        "token": "{{$input}}",
        "name": "input",
        "description": "",
        "defaultValue": ""
      },
    ]
  },
  {
    open: false,
    name: 'Short Story',
    description: "Generate a short story",
    prompt: "write a story story about {{$input}}",
    config: {
      "max_tokens": 1000,
      "temperature": 0.7,
      "top_p": 0.5,
      "presence_penalty": 0.0,
      "frequency_penalty": 0.0,
      "stop_sequences": []
    },
    parameters: [
      {
        "token": "{{$input}}",
        "name": "input",
        "description": "",
        "defaultValue": ""
      },
    ]
  },
  {
    name: 'Slogan Maker',
    description: "A function that generates marketing slogans",
    prompt: "Write me a marketing slogan for my {{$BUSINESS}} in {{$CITY}} with a focus on {{$SPECIALTY}} we are without sacrificing quality.",
    config: {
      "max_tokens": 1000,
      "temperature": 0,
      "top_p": 0,
      "presence_penalty": 0,
      "frequency_penalty": 0,
      "stop_sequences": []
    },
    parameters: [
      {
        "token": "{{$CITY}}",
        "name": "CITY",
        "description": "The city of the business.",
        "defaultValue": ""
      },
      {
        "token": "{{$BUSINESS}}",
        "name": "BUSINESS",
        "description": "The business name.",
        "defaultValue": ""
      },
      {
        "token": "{{$SPECIALTY}}",
        "name": "SPECIALTY",
        "description": "the specialty of the business.",
        "defaultValue": ""
      }
    ]
  },
  {
    open: false,
    name: 'Summary',
    description: "Summarize given text in two sentences or less",
    prompt: "Summarize the following text in two sentences or less. [BEGIN TEXT]{{$input}}[END TEXT]",
    config: {
      "max_tokens": 100,
      "temperature": 0,
      "top_p": 0,
      "presence_penalty": 0,
      "frequency_penalty": 0,
      "stop_sequences": []
    },
    parameters: [
    {
        "token": "{{$input}}",
        "name": "input",
        "description": "",
        "defaultValue": ""
      },
    ]
  },
  {
    open: false,
    name: 'Translate',
    description: "Translate the input into a language of your choice",
    prompt: "Translate the input below into {{$language}}. MAKE SURE YOU ONLY USE {{$language}}. {{$input}} Translation:",
    config: {
      "max_tokens": 256,
      "temperature": 0.7,
      "top_p": 0,
      "presence_penalty": 0,
      "frequency_penalty": 0,
      "stop_sequences": []
      // "stop_sequences": ["[done]"]
    },
    parameters: [
      {
        "token": "{{$input}}",
        "name": "input",
        "description": "The text to translate.",
        "defaultValue": ""
      },
      {
        "token": "{{$language}}",
        "name": "language",
        "description": "language to translate the given text into.",
        "defaultValue": "en-US"
      },
    ]
  }
])

const skill = {
  name: 'Writer',
  functions: 5,
  enabled: true,
}
</script>

<template>
  <div class="h-screen">
    <Logo></Logo>
    <div class="pt-10 transition-all duration-500 ease-in-out">
      <div class="px-4 sm:px-6 lg:px-8">
        <div>
          <h1 class="font-semibold leading-6 text-gray-100 text-2xl">Semantic Skill</h1>
        </div>
        <div class="py-5 flex flex-col">
          <div class="flex justify-between">
            <div class="flex w-96 rounded-md shadow-sm">
              <div :class="[skill.enabled ? 'bg-lime-500 dark:bg-lime-600' : 'bg-red-500 dark:bg-red-600', ' flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">
                <font-awesome-icon icon="screwdriver-wrench" class="h-5 w-5" aria-hidden="true" />
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t text-gray-500 dark:text-gray-200 border-gray-200 bg-white dark:bg-slate-600 dark:border-slate-700">
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <span class="">{{ skill.name }}</span>
                  <p class="dark:text-gray-400">{{ skill.functions }} Functions</p>
                </div>
                <div class="flex-shrink-0 pr-2 flex">
                </div>
              </div>
            </div>
            <div>
              <button title="Edit Skill" type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="sr-only">Edit Skill</span>
                <font-awesome-icon :icon="['fas', 'pen']" class="" aria-hidden="true" />
              </button>
              <button title="Add Function" type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="sr-only">Add Function</span>
                <font-awesome-icon :icon="['fas', 'plus']" class="" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="py-2">
            <div class="w-full divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
              <Accordion :active-index="0">
                <template v-for="fn in functions" :key="fn.name">
                  <AccordionTab>
                    <template #header>
                      <span>{{fn.name }} - {{fn.description}}</span>
                    </template>
                    <div class="flex flex-col md:flex-row">
                      <div class="md:w-1/2">
                        <span class="text-sm font-bold leading-6 text-gray-900">Name</span>
                        <input v-model="fn.name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                      <div class="md:w-1/2 md:px-2">
                        <span class="text-sm font-bold leading-6 text-gray-900">Description</span>
                        <input v-model="fn.description" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div class="flex flex-col md:flex-row">
                      <div class="pt-3 pb-8 md:w-1/2">
                        <span class="text-sm font-bold leading-6 text-gray-900">Prompt</span>
                        <textarea v-model="fn.prompt" rows="10" class="h-full block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                      </div>
                      <div class="md:px-2 md:w-1/2">
                        <span class="text-sm font-bold leading-6 text-gray-900">Parameters</span>
                        <template v-for="param in fn.parameters">
                          <dl class="text-sm p-2 mt-1 border-2 border-dashed rounded-md grid grid-cols-3">
                            <dt class="">Name</dt>
                            <dd class="flex gap-2  text-gray-700 col-span-2 py-1">
                              <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{param.token}}</span>
                            </dd>
                            <dt class="">Description</dt>
                            <dd class=" text-gray-700 col-span-2 py-1">
                              <input v-model="param.description" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </dd>
                            <dt class="">Default</dt>
                            <dd class=" text-gray-500 col-span-2 py-1">
                              <input v-model="param.defaultValue" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </dd>
                          </dl>
                        </template>
                      </div>
                    </div>
                    <div class="py-2">
                      <hr />
                    </div>
                    <div class="flex justify-start py-2">
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        <span class="sr-only">Test</span>
                        <font-awesome-icon :icon="['fas', 'bug']" class="" aria-hidden="true" />
                      </button>
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                        <span class="sr-only">Auto Paramters</span>
                        <font-awesome-icon :icon="['fas', 'gear']" class="" aria-hidden="true" />
                      </button>
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                        <span class="sr-only">Auto Paramters</span>
                        <font-awesome-icon :icon="['fas', 'highlighter']" class="" aria-hidden="true" />
                      </button>
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                        <span class="sr-only">Import</span>
                        <font-awesome-icon :icon="['fas', 'upload']" class="" aria-hidden="true" />
                      </button>
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span class="sr-only">Update</span>
                        <font-awesome-icon :icon="['fas', 'floppy-disk']" class="" aria-hidden="true" />
                      </button>
                      <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        <span class="sr-only">Delete</span>
                        <font-awesome-icon :icon="['fas', 'trash']" class="" aria-hidden="true" />
                      </button>
                    </div>
                  </AccordionTab>
                </template>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>