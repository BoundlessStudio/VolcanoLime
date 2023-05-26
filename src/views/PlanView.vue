<script setup lang="ts">
import Prompt from '@/components/Prompt.vue'
import Menu from '@/components/Menu.vue'
import Plan from '@/components/Plan.vue'
</script>

<template>
  <div class="h-screen">
    <Menu></Menu>
    <Prompt placeholder="Plan your goal using my built in skills and/or create your own semantic skills."></Prompt>
    <div class="pt-60 px-5">
      <div class="py-3 transition-all duration-500 ease-in-out">
        <div class="h-full rounded-lg bg-white shadow">
          <div class="px-2 py-2">
            <Plan></Plan>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>