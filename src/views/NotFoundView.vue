<script setup lang="ts">
// import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submit = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="absolute h-screen w-full flex items-center justify-center bg-[url('https://i.imgur.com/MpXedd3.png')] bg-no-repeat bg-center dark:opacity-30"></div>
  <div class="absolute min-h-screen w-full flex items-center justify-center bg-white/95 dark:bg-stone-950/95">
    <div class="flex flex-col gap-2">
      <div class="text-center">
        <span class="font-logo font-bold text-7xl text-lime-500 dark:text-lime-700">Volcano Lime</span>
      </div>
      <div class="flex w-full text-black dark:text-neutral-200">
        <p>Sorry, we can't find that page! Don't worry though, everything is STILL AWESOME at home!</p>
      </div>
      <div class="flex justify-center">
        <button @click="submit()" class="h-12 bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg">
          <font-awesome-icon :icon="['fas', 'home']" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
