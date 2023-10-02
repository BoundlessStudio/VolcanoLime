<script setup lang="ts">
import { onMounted } from 'vue';
import PromptMarkdown from '@/components/PromptMarkdown.vue'
import Chat from '@/components/Chat.vue'
import Logo from '@/components/Logo.vue'
import { useChatStore } from '@/stores/chat'

const { chat, submit } = useChatStore()

onMounted(() => {
  var parent = document.getElementById('sandbox')?.parentElement
  var w = parent?.clientWidth || 510
  var h = parent?.clientHeight || 510
  document.getElementById('sandbox')?.setAttribute("style",`width: ${w-10}px; height: ${h-10}px;`);
})
</script>

<template>
  <div class="absolute h-screen w-full flex gap-2 bg-stone-900 overflow-hidden">
    <div class="relative w-2/5 h-full flex flex-col">
      <div class="w-full px-2 pt-2 text-center">
        <Logo />
      </div>
      <div class="h-full w-full overflow-y-auto overflow-x-hidden px-2 py-2 flex flex-col gap-4">
        <Chat />
        <div id="anchor"></div>
      </div>
      <div class="h-48 p-1">
        <PromptMarkdown :loading="chat.isLoading" @submit="submit" class="rounded" />
      </div>
    </div>
    <div class="w-3/5 h-full p-1">
      <div :class="[chat.isLoading ? 'rainbow-fast' : 'rainbow-slow', 'rainbow h-full w-full p-1 bg-stone-900']">
        <div id="sandbox" style="width: 500px; height: 500px;">
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <span class="text-neutral-700 text-lg">sandbox</span> -->

<style scoped>
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow-slow {
  &::before {
    animation: rotate 300s linear infinite;
  }
}
.rainbow-fast {
  &::before {
    animation: rotate 10s linear infinite;
  }
}

.rainbow {
  position: relative;
  z-index: 0;
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #65a30d;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#aa3a97, #aa3a97), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),  linear-gradient(#377af5, #377af5);
    /* animation: rotate 300s linear infinite; */
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 3px;
    top: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background-color: rgb(28 25 23 / var(--tw-bg-opacity));
    border-radius: 5px;
  }
}
</style>
