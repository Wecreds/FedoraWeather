<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-primary-color text-black">
    <RouterView />
  </div>
  <div class="bottom-3 left-3 absolute w-fit">
    <a href="https://github.com/Wecreds/FedoraWeather" class="p-0 w-fit">
      <img src="/github-logo.png" class="w-1/12 cursor-pointer" />
    </a>
  </div>
</template>
