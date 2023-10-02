<template>
  <div>
    <Suspense>
      <AsyncCityViewComponent />
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityViewComponent from '../components/AsyncCityViewComponent.vue'
</script>
