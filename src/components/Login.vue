<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-screen">
    <div class="absolute left-1/2 -translate-x-1/2 w-screen max-w-max">
      <div class="flex justify-center items-center">
        <RouterLink to="/">
          <img class="h-32 w-32" src="https://i.imgur.com/39VOU8x.png" alt="Volcano Lime" />
        </RouterLink>
      </div>
      <div class="w-screen max-w-md flex-auto overflow-hidden text-sm leading-6 pb-2">
        <img class="w-full" src="https://i.imgur.com/hoGx2Ce.png" />
      </div>
      <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ">
        <div class="p-4">
          <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
            <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <font-awesome-icon icon="fa-lock" class="'h-6 w-6" />
            </div>
            <div>
              <a href="/login" class="font-semibold text-gray-900">
                <span>Login</span>
                <span class="absolute inset-0" />
              </a>
              <p class="mt-1 text-gray-600">You need to authenticate to use this application.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>