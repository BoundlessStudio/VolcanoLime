<script setup lang="ts">
import { ref } from 'vue';

const plan = {
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
          "Key": "INPUT",
          "Value": ""
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
  "name": "Sequential Plan Test 1",
  "description": "Create a slogan for the BBQ Pit in London that specializes in Mustard Sauce then email it to amjohnson86@gmail.com with the subject \u0027New Marketing Slogan\u0027"
};

const ts = new Date()

const tabs = [
  { name: 'Steps', href: '#', icon: 'fa-shoe-prints', current: true },
  { name: 'State', href: '#', icon: 'fa-circle-info', current: false },
]
</script>

<template>
  <div class="relative">
    <div class="p-5">
      <font-awesome-icon title="Goal" icon="flag-checkered" class="h-6 w-6" /> 
      <span class="align-top">{{ plan.description }}</span>
    </div>
    <div>
      <div class="pl-10 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
            <font-awesome-icon :icon="tab.icon" :class="[tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div>
    <div class="p-5">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(event, eventIdx) in plan.steps" :key="eventIdx">
            <div class="relative pb-8">
              <span v-if="eventIdx !== plan.steps.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="relative flex space-x-3">
                <div>
                  <span :class="[eventIdx >= plan.next_step_index ? 'bg-indigo-500' : 'bg-green-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                    <font-awesome-icon :icon="eventIdx >= plan.next_step_index ? 'fa-flag' : 'fa-check'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="flex flex-col pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500">
                      <a :href="'/skill/'+event.skill_name+'/fn/'+event.name" class="font-medium text-gray-900">{{ event.name }}</a> {{ event.description }} 
                    </p>
                  </div>
                  <div class="p-5">
                    <div v-for="(parameter) in event.parameters">
                      <label :for="parameter.Key" class="block text-sm font-medium leading-6 text-gray-900">{{parameter.Key}}</label>
                      <div class="mt-2">
                        <input v-model="parameter.Value" :name="parameter.Key" :id="parameter.Key" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600">{{ plan.name }} - {{ ts.toLocaleString() }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div class="h-10 w-10 bg-white rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-lime-500 " />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white rounded-md border-2 border-regal-green">
        <button title="Run Plan">
          <font-awesome-icon class="p-1 text-gray-500" icon="fa-play" />
        </button>
        <button title="Remove Plan">
          <font-awesome-icon class="p-1 text-gray-500" icon="fa-square-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>