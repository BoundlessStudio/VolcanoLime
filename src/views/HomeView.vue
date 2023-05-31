<script setup lang="ts">
// import WelcomePortrait from '@/components/WelcomePortrait.vue';
import WelcomeLandscape from '@/components/WelcomeLandscape.vue';
import Login from '@/components/Login.vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { isAuthenticated } = useAuth0();
</script>

<template>
  <div v-if="isAuthenticated">
    <WelcomeLandscape />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<style>
</style>