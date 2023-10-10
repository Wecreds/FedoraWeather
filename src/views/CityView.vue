<template>
  <div>
    <Suspense>
      <AsyncCityViewComponent />
      <template #fallback>
        <CityViewSkeletonComponent />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityViewComponent from '../components/AsyncCityViewComponent.vue'
import CityViewSkeletonComponent from '../components/CityViewSkeletonComponent.vue';

</script>
