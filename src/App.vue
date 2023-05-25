<template>
  <div class="bg-gradient-to-t from-slate-800 to-regal-green">
    <div class="container mx-auto transition-all duration-500 ease-in-out">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>