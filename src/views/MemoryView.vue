<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
// import Tree from 'primevue/tree';
import { type TreeSelectionKeys, type TreeNode, type TreeExpandedKeys } from 'primevue/tree';
import Logo from '@/components/Logo.vue'
import { ref } from 'vue';

interface Memory {
  id: string;
  provider: string;
  public: boolean;
  source: string;
  count: number;
  progress: string;
  icon: string;
  nodes: TreeNode[];
}

// Move Tree into Dialog
const stats = ref<Memory[]>([
  {
    id: uuidv4(),
    provider: 'Microsoft',
    public: false,
    source: 'jamie_maxwell_webster@hotmail.com',
    count: 1234,
    progress: '100%',
    icon: 'fa-brands fa-windows',
    nodes: [
      { 
        key: uuidv4(), 
        label: 'Mail', 
        children: [
          { key: uuidv4(), label: 'Folders' }
        ] 
      },
      { 
        key: uuidv4(), 
        label: 'Calendars', 
        children: [
          { key: uuidv4(), label: 'Layers' }
        ] 
      },
      { 
        key: uuidv4(), 
        label: 'Drive', 
        children: [
          { 
            key: uuidv4(), 
            label: 'Folder', 
            children: [{ key: uuidv4(), label: 'File' }] 
          }
        ] 
      },
      { key: uuidv4(), label: 'Contacts' },
      { key: uuidv4(), label: 'Tasks' },
      { key: uuidv4(), label: 'Notes' },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Google', 
    public: false,
    source: 'jamie.webster@gmail.com', 
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-google', 
    nodes: [
      { 
        key: uuidv4(), 
        label: 'Gmail', 
        children: [
          { key: uuidv4(), label: 'Labels' }
        ]
      },
      { 
        key: uuidv4(), 
        label: 'Calendar', 
        children: [
          { key: uuidv4(), label: 'Layers' }
        ] 
      },
      { 
        key: uuidv4(), 
        label: 'Drive', 
        children: [
          { 
            key: uuidv4(), 
            label: 'Folder', 
            children: [{ key: uuidv4(), label: 'File' }] 
          }
        ] 
      },
      { key: uuidv4(), label: 'Contacts' },
      { key: uuidv4(), label: 'Tasks' },
      { key: uuidv4(), label: 'Location' },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Google', 
    public: false,
    source: 'jamie.webster@factorybucket.com', 
    count: 0,
    progress: '0%', 
    icon: 'fa-brands fa-google', 
    nodes: [
      { 
        key: uuidv4(), 
        label: 'Gmail', 
        children: [
          { key: uuidv4(), label: 'Labels' }
        ]
      },
      { 
        key: uuidv4(), 
        label: 'Calendar', 
        children: [
          { key: uuidv4(), label: 'Layers' }
        ] 
      },
      { 
        key: uuidv4(), 
        label: 'Drive', 
        children: [
          { 
            key: uuidv4(), 
            label: 'Folder', 
            children: [{ key: uuidv4(), label: 'File' }] 
          }
        ] 
      },
      { key: uuidv4(), label: 'Contacts' },
      { key: uuidv4(), label: 'Tasks' },
      { key: uuidv4(), label: 'Location' },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Github', 
    public: true,
    source: 'HGV/Phylactery', 
    count: 42, 
    progress: '69%', 
    icon: 'fa-brands fa-github', 
    nodes: []
  },
  {
    id: uuidv4(),
    provider: 'Github',
    public: true,
    source: 'RGBKnights/cautious-doodle', 
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-github', 
    nodes: [
      {
        key: uuidv4(), 
        label: 'Commits', 
      },
      {
        key: uuidv4(), 
        label: 'Issues',
      },
      {
        key: uuidv4(), 
        label: 'Pull Requests',
      },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Github', 
    public: false,
    source: 'Gist/RGBKnights', 
    count: 12, 
    progress: '100%', 
    icon: 'fa-brands fa-github', 
    nodes: []
  },
  {
    id: uuidv4(), 
    provider: 'Slack', 
    public: false,
    source: "Factory Bukcet",
    count: 322, 
    progress: '82%', 
    icon: 'fa-brands fa-slack', 
    nodes: [
      {
        key: uuidv4(), 
        label: 'HGV', 
        children: [
          { key: uuidv4(), label: 'Channel 1' },
          { key: uuidv4(), label: 'Channel 2' },
          { key: uuidv4(), label: 'Channel 3' },
        ]
      },
      {
        key: uuidv4(), 
        label: 'Venatio Studios', 
        children: [
          { key: uuidv4(), label: 'Channel A' },
          { key: uuidv4(), label: 'Channel B' },
          { key: uuidv4(), label: 'Channel C' },
        ]
      },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Notion', 
    public: false,
    source: "Factory Bucket",
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-notion',  
    nodes: [
      {
        key: uuidv4(), 
        label: 'HGV', 
        children:[
            { key: uuidv4(), label: 'Page A' },
            {
              key: uuidv4(), 
              label: 'Page B', 
              children: [
                { key: uuidv4(), label: 'Page i' },
                { key: uuidv4(), label: 'Page ii' },
                { key: uuidv4(), label: 'Page iii' },
              ]
            },
            { key: uuidv4(), label: 'Page C' },
            { key: uuidv4(), label: 'Page C' },
          ]
      },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Notion', 
    public: true,
    source: "RGBKnights",
    count: 0,
    progress: '0%', 
    icon: 'fa-brands fa-notion',  
    nodes: [
      {
        key: uuidv4(), 
        label: 'HGV', 
        children:[
            { key: uuidv4(), label: 'Page A' },
            {
              key: uuidv4(), 
              label: 'Page B', 
              children: [
                { key: uuidv4(), label: 'Page i' },
                { key: uuidv4(), label: 'Page ii' },
                { key: uuidv4(), label: 'Page iii' },
              ]
            },
            { key: uuidv4(), label: 'Page C' },
            { key: uuidv4(), label: 'Page C' },
          ]
      },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Trello',
    public: true,
    source: "Minecraft",
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-trello', 
    nodes: []
  },
  {
    id: uuidv4(), 
    provider: 'Trello',
    public: false,
    source: "Idea-Vault",
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-trello', 
    nodes: []
  },
  {
    id: uuidv4(), 
    provider: 'Trello',
    public: false,
    source: "AD Legue",
    count: 0,
    progress: '0%', 
    icon: 'fa-brands fa-trello', 
    nodes: []
  },
  {
    id: uuidv4(), 
    provider: 'Discord',
    public: false,
    source: "Ability Draft",
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-discord', 
    nodes: [
      { key: uuidv4(), label: 'Channel A' },
      { key: uuidv4(), label: 'Channel B' },
      { key: uuidv4(), label: 'Channel C' },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Discord',
    public: false,
    source: "Dota2",
    count: 0, 
    progress: '0%', 
    icon: 'fa-brands fa-discord', 
    nodes: [
      { key: uuidv4(), label: 'Channel A' },
      { key: uuidv4(), label: 'Channel B' },
      { key: uuidv4(), label: 'Channel C' },
    ]
  },
  {
    id: uuidv4(), 
    provider: 'Web',
    public: true,
    source: "URL",
    count: 12, 
    progress: '100%', 
    icon: 'cloud-arrow-down', 
    nodes: []
  },
  {
    id: uuidv4(), 
    provider: 'Blob',
    public: false,
    source: "File",
    count: 0, 
    progress: '0%', 
    icon: 'file-arrow-up', 
    nodes: []
  },
])

const selectedKey = ref<TreeSelectionKeys>([])
</script>

<!-- Search Box -->
<!-- Provider Catiegories -->

<template>
  <div class="h-screen">
    <Logo></Logo>
    <div class="pt-10 transition-all duration-500 ease-in-out">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <h1 class="font-semibold leading-6 text-gray-100 text-2xl">Memory Sources</h1>
          <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span>Add</span>
          </button>
        </div>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in stats" :key="item.id"
            class="relative overflow-hidden rounded-lg  text-gray-500 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-600 dark:text-gray-200 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div :class="[item.public ? 'bg-lime-500 dark:bg-lime-600' : 'bg-gray-500', 'absolute rounded-md p-3']">
                <font-awesome-icon :icon="item.icon" class="h-6 w-6 text-gray-50" aria-hidden="true" />
              </div>
              <div class="flex justify-between">
                <div class="ml-16 text-sm font-medium">
                  <span>{{ item.source }}</span>
                </div>
              </div>
            </dt>
            <dd class="flex flex-col pb-6 sm:pb-7">
              <div class="ml-16 flex items-baseline">
                <p class="text-2xl font-semibold pr-1">{{ item.count }}</p>
                <div class="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                  <div class="bg-indigo-500 h-2.5 rounded-full" :style="'width:' + item.progress"></div>
                </div>
                <p class="text-xs pl-1 font-semibold ">{{ item.progress }}</p>
              </div>
              <div class="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-slate-500 px-4 py-4 sm:px-6 flex justify-between">
                <div class="text-sm">
                  <a v-if="item.nodes.length > 0" href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-200 dark:hover:text-indigo-300">
                    <span>Configure</span>
                  </a>
                </div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-red-600 hover:text-red-500 dark:text-red-200 dark:hover:text-red-300">
                    <span>Delete</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-tree {
  border: none;
  padding: 0px;
}
</style>