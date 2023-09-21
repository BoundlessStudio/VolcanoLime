<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'

const { isAuthenticated } = useAuth0()
const mobileMenuOpen = ref(false)
const navigation = {
  system: [
    { name: 'Chat', href: '/chat' },
    { name: 'About', href: '/about' },
  ],
}
</script>

<template>
  <header class="bg-slate-600 dark:bg-slate-700 text-gray-200 dark:text-gray-400">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
      <div class="flex items-center gap-x-12">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Volcano Lime</span>
          <img src="https://i.imgur.com/lPkdSu2.png" class="w-6 h-6 inline" />
          <img src="https://i.imgur.com/mYwoufP.png" class="w-8 h-8 inline" />
        </a>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation.system" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6">{{ item.name }}</a>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <font-awesome-icon icon="fa-solid fa-bars" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex">
        <a href="#" class="text-sm font-semibold leading-6 ">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Volcano Lime</span>
            <img src="https://i.imgur.com/lPkdSu2.png" class="w-6 h-6 inline" />
            <img src="https://i.imgur.com/mYwoufP.png" class="w-8 h-8 inline" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 " @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation.system" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <a v-if="isAuthenticated" href="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50">Log in</a>
              <a v-else href="/logoff" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50">Log off</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
