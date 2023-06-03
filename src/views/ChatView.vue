<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import CommandBar from '@/components/ThreadCommandBar.vue'
import Chat from '@/components/Chat.vue'
import Reply from '@/components/Reply.vue'
import Answer from '@/components/Answer.vue'
import Plan from '@/components/Plan.vue'
import Logo from '@/components/Logo.vue'
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals, type Config } from 'unique-names-generator';
import type { AnswerMessage, ChatMessage, DrawingMessage, PlanMessage, Thread } from '@/types/thread'

const config: Config = {
  separator: "-",
  dictionaries: [colors, animals]
}

const data = [
    {
      role: "assistant",
      message: "Once upon a time, in a small village nestled in the valley of rolling green hills, there lived a young boy named Finn with his faithful dog, Bear. They were inseparable, the boy with the wild sun-streaked hair, and the shaggy, lovable mutt. One day, while exploring the woods, Finn discovered an ancient map hidden in a hollow tree trunk. The map was tattered and worn, but a mysterious symbol marked a location deep in the heart of the forest. Excited by the prospect of adventure, Finn and Bear set off to uncover the treasure that lay hidden within their beloved woods. Their journey was not an easy one. The forest was dense and tangled, with sharp thorns and brambles that scratched their skin and caught in their hair. They crossed a fierce river, its rapids threatening to sweep them away, and scaled a steep slope that seemed intent on keeping the treasure hidden. But Finn and Bear were determined, and they pressed on, guided by the need to uncover the secrets the map held.",
      type: "chat",
      ts: new Date().toLocaleString(),
    } as ChatMessage,
    {
      role: "user",
      type: "chat",
      message: "Write me a story about a dog and his boy.",
      ts: new Date().toLocaleString(),
    } as ChatMessage
  ];

const thread = reactive<Thread>({
  id: uuidv4(),
  name: uniqueNamesGenerator(config),
  skills: [],
  memories: ['generic'],
  chats: data
});

</script>

<template>
  <div class="h-screen">
    <Logo></Logo>
    <Prompt></Prompt>
    <div class="pt-32 md:pt-48 px-5">
      <CommandBar v-bind="thread"></CommandBar>
      <template v-for="(item) in thread.chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white  dark:bg-slate-600 dark:text-gray-200 shadow">
            <div class="px-2 py-2">
              <Chat v-if="item.role == 'user'" v-bind="item"></Chat>
              <Reply v-if="item.role == 'assistant'" v-bind="item"></Reply>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>