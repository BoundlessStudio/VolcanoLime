<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import CommandBar from '@/components/ThreadCommandBar.vue'
import Chat from '@/components/Chat.vue'
import Reply from '@/components/Reply.vue'
import Answer from '@/components/Answer.vue'
import Plan from '@/components/Plan.vue'
import Menu from '@/components/Menu.vue'
import Drawing from '@/components/Drawing.vue'
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals, type Config } from 'unique-names-generator';
import type { AnswerMessage, ChatMessage, DrawingMessage, PlanMessage, Thread } from '@/types/thread'

const config: Config = {
  separator: "-",
  dictionaries: [adjectives, colors, animals]
}

const data = [
    {
      role: "assistant",
      message: "![picture of a dog and his boy](https://i.imgur.com/YO5HLRx.png)",
      ts: new Date().toLocaleString(),
      type: "drawing",
    } as ChatMessage,
    {
      role: "user",
      message: "Draw a picture of a dog and his boy",
      ts: new Date().toLocaleString(),
      type: "chat",
    } as ChatMessage,
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
    } as ChatMessage,
    {
      plan: {
        "state": [
          {
            "Key": "INPUT",
            "Value": ""
          }
        ],
        "steps": [
          {
            "parameters": [
              {
                "Key": "SPECIALTY",
                "Value": "Mustard Sauce"
              },
              {
                "Key": "BUSINESS",
                "Value": "BBQ Pit"
              },
              {
                "Key": "CITY",
                "Value": "London"
              }
            ],
            "outputs": [
              "SLOGAN"
            ],
            "icon": "fa-check",
            "name": "SloganMaker",
            "skill_name": "WriterSkill",
            "description": "a function that generates marketing slogans"
          },
          {
            
            "parameters": [
              {
                "Key": "subject",
                "Value": "New Marketing Slogan"
              },
              {
                "Key": "recipients",
                "Value": "amjohnson86@gmail.com"
              },
              {
                "Key": "INPUT",
                "Value": "$SLOGAN"
              }
            ],
            "icon": "fa-check",
            "name": "SendEmailAsync",
            "skill_name": "EmailSkill",
            "description": "Send an email to one or more recipients."
          }
        ],
        "parameters": [
          {
            "Key": "INPUT",
            "Value": ""
          }
        ],
        "next_step_index": 0,
        "name": uniqueNamesGenerator(config),
        "description": "Create a slogan for the BBQ Pit in London that specializes in Mustard Sauce then email it to amjohnson86@gmail.com with the subject \u0027New Marketing Slogan\u0027",
      },
      message: "Experience the magic of London's BBQ Pit - where our Mustard Sauce rules the roost, and quality is never compromised!",
      role: "assistant",
      type: "plan",
      ts: new Date().toLocaleString(),
    } as ChatMessage,
    {
      role: "user",
      message: "Create a slogan for the BBQ Pit in London that specializes in Mustard Sauce then email it to amjohnson86@gmail.com with the subject 'New Marketing Slogan'",
      ts: new Date().toLocaleString(),
      type: "chat",
    } as ChatMessage,
    {
      role: "assistant",
      message: "Yes, you can use out-of-network providers. However, you will have to pay a higher deductible and coinsurance<sup>1</sup>.",
      citations: [
      {
        number: 1,
        document: "Northwind_Health_Plus_Benfits_Details-70.pdf",
        text: ""
      }],
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
          document: "Benefits_Options-2.pdf",
          text: ""
        },
        {
          number: 2,
          document: "Northwind_Health_Plus_Benfits_Details-70.pdf",
          text: ""
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
    <Menu></Menu>
    <Prompt></Prompt>
    <div class="pt-48 px-5">
      <CommandBar v-bind="thread"></CommandBar>
      <template v-for="(item) in thread.chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white  dark:bg-slate-600 dark:text-gray-200 shadow">
            <div class="px-2 py-2">
              <Chat v-if="item.type === 'chat' && item.role == 'user'" v-bind="item"></Chat>
              <Reply v-if="item.type === 'chat' && item.role == 'assistant'" v-bind="item"></Reply>
              <Answer v-if="item.type === 'answer'" v-bind="(item as AnswerMessage)"></Answer>
              <Plan v-if="item.type === 'plan'" v-bind="(item as PlanMessage)"></Plan>
              <Drawing v-if="item.type === 'drawing'" v-bind="(item as DrawingMessage)"></Drawing>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>