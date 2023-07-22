<script setup lang="ts">
import { FeedAccess, type FeedDocument } from '@/api/electric-raspberry'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, onMounted } from 'vue'
import { useThreadStore } from '@/stores//thread'
import Header from '@/components/Header.vue'

const { listFeeds, deleteFeed } = useThreadStore()
const loading = ref(true)
const feeds = ref<FeedDocument[]>([])
const confirmation = ref()

const load = async () => {
  loading.value = true
  feeds.value = await listFeeds()
  loading.value = false
}

const removeFeed = async () => {
  const id = confirmation.value
  confirmation.value = undefined
  await deleteFeed(id)
  await load()
}

onMounted(async () => {
  await load()
})
</script>

<template>
  <div v-if="loading">
    <div class="flex h-screen">
      <div class="m-auto text-center">
        <img src="https://i.imgur.com/MpXedd3.png" class="animate-pulse w-32 h-32" />
        <span>Loading</span>
      </div>
    </div>
  </div>
  <div v-else class="container max-w-5xl">
    <Header />
    <div class="py-5">
      <hr />
    </div>
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="feed in feeds" :key="feed.feedId" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-gray-900">{{ feed.name }}</h3>
              <span v-if="feed.access == FeedAccess.Public" class="inline-flex flex-shrink-0 items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                Public <font-awesome-icon class="pl-1" icon="unlock" />
              </span>
              <span v-else class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Private <font-awesome-icon class="pl-1" icon="lock" />
              </span>
            </div>
            <p class="mt-1 truncate text-sm text-gray-500">{{ feed.description }}</p>
          </div>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
              <a :href="`/feed/${feed.feedId}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                View
              </a>
            </div>
            <div class="-ml-px flex w-0 flex-1">
              <a @click="confirmation = feed.feedId" href="#" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                Delete
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <TransitionRoot as="template" :show="confirmation != undefined">
    <Dialog as="div" class="relative z-10" @close="confirmation = undefined">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <font-awesome-icon icon="exclamation-triangle" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Confirm Removal</DialogTitle>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button @click="removeFeed" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete</button>
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