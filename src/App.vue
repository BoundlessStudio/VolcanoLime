<script setup lang="ts">
// import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
.md-editor-preview {
  overflow-wrap: break-word;
  word-break: normal;
}
.md-editor-dark {
  --md-bk-color: #475569;
}
sup {
  margin-left: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 3px;
  padding-right: 3px;
  font-weight: 600;
  /* padding: 1px; */
  --tw-text-opacity: 1;
  color: rgb(79 70 229 / var(--tw-text-opacity));
  border-radius: 2px;
  --tw-bg-opacity: 1;
  background-color: rgb(238 242 255 / var(--tw-bg-opacity));
}
</style>
