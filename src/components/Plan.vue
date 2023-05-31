<script setup lang="ts">
import type { PlanMessage } from '@/types/thread';

const props = defineProps<PlanMessage>()

const onPlay = () => {
  if(props.plan.next_step_index === props.plan.steps.length)  {
    props.plan.next_step_index = 0
    props.plan.state= [{
      "Key": "INPUT",
      "Value": ""
    }]
  } else {
    props.plan.next_step_index = props.plan.steps.length
    props.plan.state = [{
      "Key": "SLOGAN",
      "Value": "Experience the magic of London\u0027s BBQ Pit - where our Mustard Sauce rules the roost, and quality is never compromised!"
    },
    {
      "Key": "INPUT",
      "Value": "Experience the magic of London\u0027s BBQ Pit - where our Mustard Sauce rules the roost, and quality is never compromised!"
    }]
  }
}

</script>

<template>
  <div class="relative">
    <div class="p-5">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          <li>
            <div class="relative pb-8">
              <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="w-full relative flex space-x-3">
                <div>
                  <span :class="[props.plan.next_step_index >= props.plan.steps.length ? 'bg-green-500' : 'bg-indigo-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-400']">
                    <font-awesome-icon :icon="'bullseye'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="w-full flex flex-col pt-1.5">
                  <span class="text-sm">{{ props.plan.description }}</span>
                </div>
              </div>
            </div>
          </li>
          <!-- TODO: Add steps' Pramaters -->
          <li v-for="(step, stepIdx) in props.plan.steps" :key="stepIdx">
            <div class="relative pb-8">
              <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="w-full relative flex space-x-3">
                <div>
                  <span :class="[stepIdx >= plan.next_step_index ? 'bg-indigo-500' : 'bg-green-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-400']">
                    <font-awesome-icon :icon="stepIdx >= plan.next_step_index ? 'shoe-prints' : 'fa-check'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="w-full flex flex-col pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      <a :href="'/skill/'+step.skill_name+'/fn/'+step.name" class="underline font-medium">{{ step.name }}</a> {{ step.description }} 
                    </p>
                  </div>
                  <div>
                    <table>
                      <tr v-for="(parameter, parameterIdx) in step.parameters" :key="parameterIdx">
                        <td>
                          <span title="Input" class="w-full inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{parameter.Key}}</span>
                        </td>
                        <td v-if="parameter.Value.startsWith('$')">
                          <span class="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{parameter.Value}}</span>
                        </td>
                        <td v-else>
                          <span>{{parameter.Value}}</span>
                        </td>
                      </tr>
                      <tr v-for="(output, outputIdx) in step.outputs" :key="outputIdx">
                        <td>
                          <span title="Output" class="w-full inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{output}}</span>
                        </td>
                        <td>
                          <span>{{ plan.state.find(s => s.Key == output)?.Value }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="relative pb-8">
              <div class="w-full relative flex space-x-3">
                <div>
                  <span :class="[props.plan.next_step_index >= props.plan.steps.length ? 'bg-green-500' : 'bg-indigo-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-400']">
                    <font-awesome-icon :icon="'fa-flag-checkered'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="w-full flex flex-col pt-1.5">
                  <div v-if="props.plan.next_step_index >= props.plan.steps.length">
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      {{ props.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hr class="mx-4  dark:border-slate-400" />
    <div class="px-5 pt-3 pb-1">
      <div class="flex flex-row">
        <div class="">
          <button @click="onPlay" type="button" class="rounded bg-green-100 dark:bg-green-500 px-2 py-1 text-xs font-semibold dark:text-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-green-200 dark:hover:bg-green-400">
            <font-awesome-icon title="Invoke Plan" icon="play" class="text-green-500 dark:text-gray-100" />
            <span class="pl-1">Run</span>
          </button>
        </div>
        <div class="pl-2">
          <button type="button" class="rounded bg-purple-100 dark:bg-purple-500 px-2 py-1 text-xs font-semibold dark:text-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-purple-200 dark:hover:bg-purple-400">
            <font-awesome-icon title="Automate" icon="wand-magic-sparkles" class="text-purple-500 dark:text-gray-100" />
            <span class="pl-1">Automate</span>
          </button>
        </div>
      </div>
    </div>
    <div>
      <p class="text-xs text-right text-indigo-600 dark:text-indigo-400">{{ props.ts }}</p>
    </div>
    <div class="absolute -top-6 -left-6">
      <div class="h-10 w-10 bg-white dark:bg-slate-600 dark:text-gray-200 rounded-md border-2 border-regal-green text-center" >
        <font-awesome-icon icon="fa-robot" class="h-6 w-6 pt-1 text-amber-500" />
      </div>
    </div>
    <div class="absolute -top-6 -right-6">
      <div class=" bg-white dark:bg-slate-600 text-gray-500 dark:text-gray-200  rounded-md border-2 border-regal-green">
        <button title="Edit Plan">
          <font-awesome-icon class="p-1" icon="pen" />
        </button>
        <button title="Remove from thread">
          <font-awesome-icon class="p-1" icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>