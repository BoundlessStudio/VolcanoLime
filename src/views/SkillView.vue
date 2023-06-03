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
    open: true,
    name: 'Slogan Maker',
    description: "A function that generates marketing slogans",
    prompt: "Write me a marketing slogan for my {{$BUSINESS}} in {{$CITY}} with \n a focus on {{$SPECIALTY}} we are without sacrificing quality.",
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
        "name": "CITY",
        "description": "The city of the business.",
        "defaultValue": ""
      },
      {
        "name": "BUSINESS",
        "description": "The business name.",
        "defaultValue": ""
      },
      {
        "name": "SPECIALTY",
        "description": "the specialty of the business.",
        "defaultValue": ""
      }
    ]
  },
  {
    open: false,
    name: 'Acronym',
    description: "Generate an acronym for the given concept or phrase",
    prompt: "Generate a suitable acronym pair for the concept. Creativity is encouraged, including obscure references. The uppercase letters in the acronym expansion must agree with the letters of the acronym. Q: Organization to protect the freedom and security of its member countries in North America and Europe. A: N.A.T.O: North Atlantic Treaty Organization. Q:{{$input}}",
    config: {
      "max_tokens": 100,
      "temperature": 0.5,
      "top_p": 0.0,
      "presence_penalty": 0.0,
      "frequency_penalty": 0.0,
      "stop_sequences": []
    },
    parameters: []
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
    parameters: []
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
    parameters: []
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
        <div class="mt-5 flex flex-col">
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
              <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="sr-only">Edit</span>
                <font-awesome-icon :icon="['fas', 'pen']" class="" aria-hidden="true" />
              </button>
              <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="sr-only">Add</span>
                <font-awesome-icon :icon="['fas', 'plus']" class="" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="py-5">
            <h1 class="font-semibold leading-6 text-gray-100 text-2xl">Semantic Functions</h1>
          </div>
          <div class=" w-full divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <ul role="list" class="">
              <li v-for="fn in functions" :key="fn.name" >
                <div class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div class="flex gap-x-4">
                    <div class="min-w-0 flex-auto">
                      <p class="text-sm font-semibold leading-6 text-gray-900">
                        <span class="absolute inset-x-0 -top-px bottom-0" />
                        <span>{{ fn.name }}</span>
                      </p>
                      <p class="mt-1 flex text-xs leading-5 text-gray-500">
                        <span class="relative truncate">{{ fn.description }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-x-4">
                    <font-awesome-icon v-if="fn.open" class="h-5 w-5 flex-none text-gray-400" :icon="['fas', 'chevron-down']" aria-hidden="true" />
                    <font-awesome-icon v-else class="h-5 w-5 flex-none text-gray-400" :icon="['fas', 'chevron-right']" aria-hidden="true" />
                  </div>
                </div>
                <div v-if="fn.open" class="px-5 text-sm transition-all duration-500 ease-in-out">
                  <hr />
                  <div class="flex flex-col md:flex-row py-2">
                    <div class="flex-none flex flex-col">
                      <div class="px-4 pt-1 sm:px-0">
                        <h3 class="text-lg font-semibold leading-7 text-gray-900">Settings</h3>  
                      </div>
                      <div>
                        <span class="text-sm font-bold leading-6 text-gray-900">Name</span>
                        <input v-model="fn.name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                      <div class="h-full pb-8">
                        <span class="text-sm font-bold leading-6 text-gray-900">Description</span>
                        <textarea v-model="fn.description" rows="7" class="block h-full w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                      </div>
                    </div>
                    <div class="flex-grow pl-4">
                      <div class="px-4 pt-1 sm:px-0">
                        <h3 class="text-lg font-semibold leading-7 text-gray-900">Prompt</h3>  
                      </div>
                      <div class="h-full pb-10">
                        <textarea v-model="fn.prompt" rows="10" class="h-full block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                      </div>
                    </div>
                    <div class="flex-none pl-4">
                      <div class="px-4 pt-1 sm:px-0">
                        <h3 class="text-lg font-semibold leading-7 text-gray-900">Paramters</h3>  
                      </div>
                      <div class="pb-1 text-xs">
                        <Accordion :activeIndex="0">
                          <template v-for="param in fn.parameters">
                            <AccordionTab>
                              <template #header>
                                <span class="text-xs" v-pre>${{</span><span class="text-xs">{{param.name}}</span><span class="text-xs" v-pre>}}</span>
                              </template>
                              <dl class="text-sm">
                                <dt class="">Name</dt>
                                <dd class="mt-1 text-gray-700">
                                  <input v-model="param.name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </dd>
                                <dt class="">Description</dt>
                                <dd class="mt-1 text-gray-700">
                                  <input v-model="param.description" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </dd>
                                <dt class="">Default</dt>
                                <dd class="mt-1 text-gray-500">
                                  <input v-model="param.defaultValue" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </dd>
                              </dl>
                            </AccordionTab>
                          </template>
                        </Accordion>
                      </div>
                    </div>
                    <div class="flex-none pl-4">
                      <div class="px-4 pt-1 sm:px-0">
                        <h3 class="text-lg font-semibold leading-7 text-gray-900">Configuration</h3>  
                      </div>
                      <div class="mt-1 border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                          <div class="px-2 py-2">
                            <dt title="shrinks or grows the 'pool' of available tokens to choose from" class="text-sm font-bold leading-6 text-gray-900">Pool</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              <div class="w-full">
                                <Slider v-model="fn.config.top_p" class="w-full mt-2" :min="0" :max="1" :step="0.1" />
                              </div>
                              <div class="flex justify-between pt-1">
                                <span class="">Small</span>
                                <span class="px-1"></span>
                                <span class="">Big</span>
                              </div>
                            </dd>
                          </div>
                          <div class="px-2 py-2">
                            <dt title="fuzz-factor on randomly choose a next token from the available pool" class="text-sm font-bold leading-6 text-gray-900">Temperature</dt>
                            <dd class="mt-1  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              <div class="w-full">
                                <Slider v-model="fn.config.temperature" class="w-full mt-2" :min="0" :max="1" :step="0.1" />
                              </div>
                              <div class="flex justify-between pt-1">
                                <span class="">Deterministic</span>
                                <span class="px-1"></span>
                                <span class="">Random</span>
                              </div>
                            </dd>
                          </div>
                          <div class="px-2 py-2">
                            <dt title="This parameter is used to discourage the model from repeating the same words or phrases too frequently within the generated text." class="text-sm font-bold leading-6 text-gray-900">Frequency</dt>
                            <dd class="mt-1  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              <div class="w-full">
                                <Slider v-model="fn.config.frequency_penalty" class="w-full mt-2" :min="0" :max="1" :step="0.1" />
                              </div>
                              <div class="flex justify-between pt-1">
                                <span class="">Liberal</span>
                                <span class="px-1"></span>
                                <span class="">Conservative</span>
                              </div>
                            </dd>
                          </div>
                          <div class="px-2 py-2 ">
                            <dt title="This parameter is used to encourage the model to include a diverse range of tokens in the generated text" class="text-sm font-bold leading-6 text-gray-900">Presence</dt>
                            <dd class="mt-1  text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              <div class="w-full">
                                <Slider v-model="fn.config.presence_penalty" class="w-full mt-2" :min="0" :max="1" :step="0.1" />
                              </div>
                              <div class="flex justify-between pt-1">
                                <span class="">Common</span>
                                <span class="px-1"></span>
                                <span class="">Unique</span>
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="flex justify-end py-2">
                    <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                      <span class="sr-only">Test</span>
                      <font-awesome-icon :icon="['fas', 'bug']" class="" aria-hidden="true" />
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
                      <font-awesome-icon :icon="['fas', 'pen']" class="" aria-hidden="true" />
                    </button>
                    <button type="button" class="inline-flex items-center gap-x-2 mx-1 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      <span class="sr-only">Delete</span>
                      <font-awesome-icon :icon="['fas', 'trash']" class="" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>