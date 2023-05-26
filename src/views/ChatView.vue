<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import Chat from '@/components/Chat.vue'
import Menu from '@/components/Menu.vue'
import { ref } from 'vue'

const chats = ref([
  {
    role: "assistant",
    message: "Once upon a time, in a small village nestled in the valley of rolling green hills, there lived a young boy named Finn with his faithful dog, Bear. They were inseparable, the boy with the wild sun-streaked hair, and the shaggy, lovable mutt. One day, while exploring the woods, Finn discovered an ancient map hidden in a hollow tree trunk. The map was tattered and worn, but a mysterious symbol marked a location deep in the heart of the forest. Excited by the prospect of adventure, Finn and Bear set off to uncover the treasure that lay hidden within their beloved woods. Their journey was not an easy one. The forest was dense and tangled, with sharp thorns and brambles that scratched their skin and caught in their hair. They crossed a fierce river, its rapids threatening to sweep them away, and scaled a steep slope that seemed intent on keeping the treasure hidden. But Finn and Bear were determined, and they pressed on, guided by the need to uncover the secrets the map held.",
    ts: new Date()
  },
  {
    role: "user",
    message: "Write me a story about a dog and his boy.",
    ts: new Date()
  }  
])
</script>

<template>
  <div class="h-screen">
    <Menu></Menu>
    <Prompt placeholder="How can I assist you today? Lets Chat!"></Prompt>
    <div class="pt-60 px-5">
      <template v-for="(item) in chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white shadow">
            <div class="px-2 py-2">
              <Chat :role="item.role" :message="item.message" :ts="item.ts" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>