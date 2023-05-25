<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue'
import Menu from '@/components/Menu.vue'
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
    
    </div>
  </div>
  
</template>

<style scoped></style>