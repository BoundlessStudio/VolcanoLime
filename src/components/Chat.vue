<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import { useChatStore } from '@/stores/chat'
import type { MessageDocument } from '@/api/electric-raspberry';

const { chat } = useChatStore()
const toggle = (msg: MessageDocument) => {
  msg.show = !msg.show
}
</script>

<template>
  <div v-for="msg in chat.messages" class="rounded-lg p-1 bg-stone-800 ">
    <div class="flex gap-1">
      <div v-if="msg.role == 2" @click="toggle(msg)">
        <font-awesome-icon :icon="['fas', 'robot']" class="h-6 w-6 text-orange-500" aria-hidden="true" />
      </div>
      <div v-else-if="msg.role == 3">
        <font-awesome-icon :icon="['fas', 'user']" class="h-6 w-6 text-lime-500" aria-hidden="true" />
      </div>
      <div>
        <MdPreview v-model="msg.content" previewTheme="github" theme="dark" language="en-US" />
      </div>
    </div>
    <div v-if="msg.role == 2" class="pb-4 flex justify-center">
      <button v-if="msg.show" @click="toggle(msg)" type="button" class="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20">Hide Work</button>
      <button v-else @click="toggle(msg)" type="button" class="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20">Show Work</button>
    </div>
    <div v-if="msg.show">
      <ul>
      <template v-for="log in msg.logs">
        <li class="text-sm text-gray-500">
          <div><span class="text-indigo-500 font-bold">Thought: </span>{{log.thought}}</div>
          <div><span class="text-orange-500 font-bold">Action: </span>{{log.action}}</div>
          <div><span class="text-lime-500 font-bold">Observation: </span>{{log.observation}}</div>
        </li>
      </template>
      </ul>
    </div>
    
  </div>
</template>

<style scoped>
</style>