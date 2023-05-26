<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import Answer from '@/components/Answer.vue'
import Menu from '@/components/Menu.vue'
import { ref } from 'vue';

const chats = ref([
{
    role: "assistant",
    message: "Yes, you can use out-of-network providers. However, you will have to pay a higher deductible and coinsurance<sup>1</sup>.",
    citations: [
      "1 - Northwind_Health_Plus_Benfits_Details-70.pdf"
    ],
    followup: ['?', '?', '?'],
    ts: new Date()
  },
  {
    role: "user",
    message: "Can i use out-of-network provider?",
    ts: new Date()
  },
  {
    role: "assistant",
    message: "Northwind Health Plus offers coverage for hosibitalization, doctors visits, lab tests and x-rays<sup>1</sup>. Standard only offers coverage for doctors visits and lab tests.",
    citations: [
      "1 - Benefits_Options-2.pdf"
    ],
    followup: ["?", "?", "?"],
    ts: new Date()
  },
  {
    role: "user",
    message: "What is included in my Northwind Health Plus plan that is not in the standard plan?",
    ts: new Date()
  }
])
</script>

<template>
  <div class="h-screen">
    <Menu></Menu>
    <Prompt placeholder="Ask a question, get an answer from my memory."></Prompt>
    <div class="pt-60 px-5">
      <template v-for="(item) in chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white shadow">
            <div class="px-2 py-2">
              <Answer :role="item.role" :message="item.message" :citations="item.citations" :followup="item.followup" :ts="item.ts" ></Answer>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  
</template>

<style scoped></style>