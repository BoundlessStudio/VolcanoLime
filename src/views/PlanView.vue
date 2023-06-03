<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import CommandBar from '@/components/ThreadCommandBar.vue'
import Chat from '@/components/Chat.vue'
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
      plan: {
        "state": [],
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
      message: "Experience the magic of London\u0027s BBQ Pit - where our Mustard Sauce rules the roost, and quality is never compromised!",
      role: "assistant",
      type: "plan",
      ts: new Date().toLocaleString(),
    } as ChatMessage,
    // {
    //   role: "user",
    //   message: "Create a slogan for the BBQ Pit in London that specializes in Mustard Sauce then email it to amjohnson86@gmail.com with the subject 'New Marketing Slogan'",
    //   ts: new Date().toLocaleString(),
    //   type: "chat",
    // } as ChatMessage
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
    <div class="pt-48 px-5">
      <CommandBar v-bind="thread"></CommandBar>
      <template v-for="(item) in thread.chats">
        <div class="py-3 transition-all duration-500 ease-in-out">
          <div class="h-full rounded-lg bg-white  dark:bg-slate-600 dark:text-gray-200 shadow">
            <div class="px-2 py-2">
              <Chat v-if="item.type === 'chat'" v-bind="item"></Chat>
              <Plan v-if="item.type === 'plan'" v-bind="(item as PlanMessage)"></Plan>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>