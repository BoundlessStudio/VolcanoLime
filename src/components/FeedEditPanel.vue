<script setup lang="ts">
import { FeedAccess, type FeedDocument, type FeedEditDocument } from '@/api/electric-raspberry';
import { ref, watch } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useThreadStore } from '@/stores/thread'

export interface FeedEditProps {
  show: boolean,
  id: string,
}

const { getFeed, editFeed } = useThreadStore()
const props = defineProps<FeedEditProps>()
const document = ref<FeedDocument>({})

watch(() => props.show, async (visibility) => {
  if(visibility) {
    document.value = await getFeed(props.id)
  }
}, { immediate: true })

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'canceled'): void
}>()
function close() {
  emit('canceled')
}
async function save(e: Event) {
  e.preventDefault()
  const dto = {
    ...document.value,
  } as FeedEditDocument
  await editFeed(dto)
  emit('saved')
}
</script>

<template>
  <TransitionRoot as="template" :show="props.show">
    <Dialog as="div" class="relative z-10" @close="close">
      <div class="fixed inset-0"></div>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="bg-indigo-700 px-4 py-6 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-white">Edit Feed</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="close">
                            <span class="sr-only">Close panel</span>
                            <font-awesome-icon icon="times" class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-indigo-300">Get started by filling in the information below to create your feed.</p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pb-5 pt-6">
                         
                            <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Name</label>
                            </div>
                            <div class="sm:col-span-2">
                              <input v-model="document.name" type="text" name="project-name" id="project-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <div class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label for="project-description" class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">Description</label>
                            </div>
                            <div class="sm:col-span-2">
                              <textarea v-model="document.description" id="project-description" name="project-description" rows="7" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                          <fieldset class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <legend class="sr-only">Privacy</legend>
                            <div class="text-sm font-medium leading-6 text-gray-900" aria-hidden="true">Privacy</div>
                            <div class="space-y-5 sm:col-span-2">
                              <div class="space-y-5 sm:mt-0">
                                <div class="relative flex items-start">
                                  <div class="absolute flex h-6 items-center">
                                    <input v-model="document.access" :value="0" id="private-access" name="privacy" aria-describedby="private-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                  </div>
                                  <div class="pl-7 text-sm leading-6">
                                    <label for="private-access" class="font-medium text-gray-900">Private to you</label>
                                    <p id="private-access-description" class="text-gray-500">You are the only one able to access this feed</p>
                                  </div>
                                </div>
                                <div class="relative flex items-start">
                                  <div class="absolute flex h-6 items-center">
                                    <input v-model="document.access" :value="1" id="public-access" name="privacy" aria-describedby="public-access-description" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"  />
                                  </div>
                                  <div class="pl-7 text-sm leading-6">
                                    <label for="public-access" class="font-medium text-gray-900">Public access</label>
                                    <p id="public-access-description" class="text-gray-500">Everyone with the link will see this feed</p>
                                  </div>
                                </div>
                              </div>
                              <hr class="border-gray-200" />
                              <div>
                                <a href="#" class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900">
                                  <font-awesome-icon icon="question-circle" class="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                  <a href="/about#sharing" target="_blank">Learn more about sharing</a>
                                </a>
                              </div>
                              <div v-if="document.access == FeedAccess.Public">
                                <a href="#" class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                  <font-awesome-icon icon="link" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
                                  <a href="#">Copy link</a>
                                </a>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button @click="close" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >Cancel</button>
                    <button @click="save" type="submit" class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>