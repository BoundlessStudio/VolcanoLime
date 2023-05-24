
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const visable = ref(false);
watch(
  () => route.path,
  async path => {
    visable.value = path != '/'
  }
)
</script>

<template>
  <div v-if="visable" class="absolute top-0 left-0">
    <RouterLink to="/">
      <img class="h-24 w-24" src="https://i.imgur.com/39VOU8x.png" alt="Volcano Lime" />
    </RouterLink>
  </div>
</template>
  