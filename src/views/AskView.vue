<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import CommandBar from '@/components/ThreadCommandBar.vue'
import Chat from '@/components/Chat.vue'
import Answer from '@/components/Answer.vue'
import Logo from '@/components/Logo.vue'
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals, type Config } from 'unique-names-generator';
import type { AnswerMessage, ChatMessage, Citation, DrawingMessage, PlanMessage, Thread } from '@/types/thread'

const config: Config = {
  separator: "-",
  dictionaries: [colors, animals]
}

const data = [
    {
      role: "assistant",
      message: "Yes, you can use out-of-network providers. However, you will have to pay a higher deductible and coinsurance<sup>1</sup>.",
      citations: [
        {
          number: 1,
          provider: "windows",
          origin: "folder",
          source: "Benfits",
          document: "Northwind_Health_Plus_Benfits_Details-70.pdf",
          author: "James Webstar",
          timestamp: new Date().toLocaleDateString(),
          text: "out-of-network providers are covered, but you will have to pay a higher deductible and coinsurance.",
          confidence: 0.9476,
        } as Citation
      ],
      followup: [
        "What is cost of out-of-network provider?",
        "What is included for out-of-network providers?",
        "What is included in my Northwind Health Plus plan that is not in the standard plan?"
      ],
      type: "answer",
      ts: new Date().toLocaleString(),
    } as ChatMessage,
    {
      role: "user",
      message: "Can i use out-of-network provider?",
      ts: new Date().toLocaleString(),
      type: "chat",
    } as ChatMessage,
    {
      role: "assistant",
      message: "Northwind Health Plus offers coverage for hosibitalization, doctors visits, lab tests and x-rays<sup>1</sup>. Standard only offers coverage for doctors visits and lab tests.<sup>2</sup>",
      citations: [
        {
          number: 1,
          provider: "windows",
          origin: "folder",
          source: "Benefits",
          document: "Benefits_Options-2.pdf",
          author: "James Webstar",
          timestamp: new Date().toLocaleString(),
          text: "Northwind Health Plus offers coverage for hosibitalization, doctors visits, lab tests and x-rays.",
          confidence: 0.9857,
        },
        {
          number: 2,
          provider: "windows",
          origin: "folder",
          source: "Benefits",
          document: "Northwind_Health_Plus_Benfits_Details-70.pdf",
          author: "James Webstar",
          timestamp: new Date().toLocaleString(),
          text: "Compared to Standard only offers coverage for doctors visits and lab tests.",
          confidence: 0.8765,
        }
      ],
      followup: [
        "Can i use out-of-network provider?",
        "What is cost of out-of-network provider?",
        "What is included for out-of-network providers?"
      ],
      type: "answer",
      ts: new Date().toLocaleString(),
    } as ChatMessage,
    {
      role: "user",
      message: "What is included in my Northwind Health Plus plan that is not in the standard plan?",
      type: "chat",
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
              <Chat v-if="item.type === 'chat'" v-bind="item"></Chat>
              <Answer v-if="item.type === 'answer'" v-bind="(item as AnswerMessage)"></Answer>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>