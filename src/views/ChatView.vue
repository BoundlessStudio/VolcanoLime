<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue'
import ChatReponse from '@/components/ChatReponse.vue'
import Menu from '@/components/Menu.vue'
import { ref } from 'vue'

const chats = ref([
  {
    role: "assistant",
    message: "Vitae justo eget magna fermentum iaculis. Nisl rhoncus mattis rhoncus urna neque viverra. Eget aliquet nibh praesent tristique magna sit amet. Viverra vitae congue eu consequat ac felis. Non pulvinar neque laoreet suspendisse interdum. Vestibulum morbi blandit cursus risus at ultrices mi.",
  },
  {
    role: "user",
    message: "Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Tempor orci eu lobortis elementum nibh tellus. In iaculis nunc sed augue lacus viverra vitae. Diam vel quam elementum pulvinar etiam. Sed augue lacus viverra vitae congue. Egestas dui id ornare arcu odio. Vulputate dignissim suspendisse in est ante in. ",
  },
  {
    role: "assistant",
    message: "Sagittis aliquam malesuada bibendum arcu vitae. Lobortis scelerisque fermentum dui faucibus in. Dictum non consectetur a erat. At imperdiet dui accumsan sit. Congue nisi vitae suscipit tellus mauris. Quam quisque id diam vel quam elementum pulvinar. Ornare arcu odio ut sem nulla pharetra diam sit amet. ",
  },
  {
    role: "user",
    message: "Penatibus et magnis dis parturient montes. Morbi enim nunc faucibus a. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Integer enim neque volutpat ac tincidunt vitae semper. Purus non enim praesent elementum facilisis leo vel fringilla. Nec ultrices dui sapien eget mi proin sed libero enim. Magna eget est lorem ipsum dolor sit.",
  },
  {
    role: "assistant",
    message: "Vitae justo eget magna fermentum iaculis. Nisl rhoncus mattis rhoncus urna neque viverra. Eget aliquet nibh praesent tristique magna sit amet. Viverra vitae congue eu consequat ac felis. Non pulvinar neque laoreet suspendisse interdum. Vestibulum morbi blandit cursus risus at ultrices mi.",
  },
  {
    role: "user",
    message: "Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Tempor orci eu lobortis elementum nibh tellus. In iaculis nunc sed augue lacus viverra vitae. Diam vel quam elementum pulvinar etiam. Sed augue lacus viverra vitae congue. Egestas dui id ornare arcu odio. Vulputate dignissim suspendisse in est ante in. ",
  },
  {
    role: "assistant",
    message: "Sagittis aliquam malesuada bibendum arcu vitae. Lobortis scelerisque fermentum dui faucibus in. Dictum non consectetur a erat. At imperdiet dui accumsan sit. Congue nisi vitae suscipit tellus mauris. Quam quisque id diam vel quam elementum pulvinar. Ornare arcu odio ut sem nulla pharetra diam sit amet. ",
  },
  {
    role: "user",
    message: "Penatibus et magnis dis parturient montes. Morbi enim nunc faucibus a. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Integer enim neque volutpat ac tincidunt vitae semper. Purus non enim praesent elementum facilisis leo vel fringilla. Nec ultrices dui sapien eget mi proin sed libero enim. Magna eget est lorem ipsum dolor sit.",
  }
])
</script>

<template>
  <div class="h-screen">
    <Menu></Menu>
    <div class="container mx-auto fixed -top-4 z-10">
      <div class="h-full rounded-lg bg-white shadow">
        <div class="px-4 py-5 sm:p-6">
          <ChatInput></ChatInput>
        </div>
      </div>
      <div class="h-10 bg-gradient-to-b from-regal-green"></div>
    </div>
    <div class="pt-72 px-5">
      <template v-for="(item) in chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white shadow">
            <div class="px-2 py-2">
              <ChatReponse :role="item.role" :message="item.message"></ChatReponse>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>