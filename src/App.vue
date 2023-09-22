<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-primary-color text-black">
    <SiteNavigation />
    <RouterView />
  </div>
</template>