<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'
const isDark = useDark()
</script>

<template>
  <div :class="[isDark ? 'dark' : '', 'bg-gradient-to-t from-slate-800 to-regal-green']">
    <div class="container mx-auto transition-all duration-500 ease-in-out">
      <RouterView />
    </div>
  </div>
</template>

<style>
.md-editor-dark {
  --md-bk-color: #475569;
}
sup {
  margin-left: 5px;
  padding-left: 2px;
  padding-right: 2px;
  /* padding: 1px; */
  --tw-text-opacity: 1;
  color: rgb(79 70 229 / var(--tw-text-opacity));
  border-radius: 2px;
  --tw-bg-opacity: 1;
  background-color: rgb(238 242 255 / var(--tw-bg-opacity));
}
</style>