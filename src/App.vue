<template>
  <Menu />
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import { RouterView } from 'vue-router'
</script>