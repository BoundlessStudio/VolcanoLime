<script setup lang="ts">
import type { PlanMessage } from '@/types/thread';

const props = defineProps<PlanMessage>()

const onPlay = () => {
  if(props.plan.next_step_index === props.plan.steps.length)  {
    props.plan.next_step_index = 0;
  } else {
    props.plan.next_step_index = props.plan.steps.length;
  }
}

const tabs = [
  { name: 'Steps', href: '#', icon: 'shoe-prints', current: true }, 
  { name: 'Data', href: '#', icon: 'database', current: false },
]
</script>

<template>
  <div class="relative">
    <!-- <div>
      <div class="pl-10 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
            <font-awesome-icon :icon="tab.icon" :class="[tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div> -->
    <div class="p-5">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(event, eventIdx) in props.plan.steps" :key="eventIdx">
            <div class="relative pb-8">
              <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              <div class="w-full relative flex space-x-3">
                <div>
                  <span :class="[eventIdx >= plan.next_step_index ? 'bg-indigo-500' : 'bg-green-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-400']">
                    <font-awesome-icon :icon="eventIdx >= plan.next_step_index ? 'fa-flag' : 'fa-check'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="w-full flex flex-col pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      <a :href="'/skill/'+event.skill_name+'/fn/'+event.name" class="font-medium">{{ event.name }}</a> {{ event.description }} 
                    </p>
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
                    <font-awesome-icon :icon="props.plan.next_step_index >= props.plan.steps.length ? 'fa-check' : 'fa-flag-checkered'" class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="w-full flex flex-col pt-1.5">
                  <div v-if="props.plan.next_step_index >= props.plan.steps.length">
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      <span class="font-medium">Result:</span> {{ props.message }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      <span class="font-medium">Run Plan to get result</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
        <button @click="onPlay" title="Run Plan">
          <font-awesome-icon class="p-1" icon="play-circle" />
        </button>
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