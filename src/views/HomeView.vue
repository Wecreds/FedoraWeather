<template>
  <div class="mt-[7rem] text-center">
    <h1 class="text-7xl">
      Bem-vindo a <br />
      <span>Fedora's Weather</span>!
    </h1>
    <p class="text-4xl m-2">O seu site para consultar o clima no seu local.</p>
    <p class="text-2xl m-2">Primeiro, coloque sua localização aqui.</p>
  </div>
  <div class="pt-4 mb-8 relative text-center">
    <input
      type="text"
      class="p-2 bg-gray-200 w-1/2 shadow-xl rounded-sm outline-none focus:border-b-2 focus:border-black focus:shadow-2xl"
      v-model="searchQuery"
      @input="getSearchResults"
    />
    <ul class="mx-auto bg-gray-200 w-1/2 p-2" v-if="locationStore.queryResult">
      <p v-if="queryError">Opa! Algo deu errado, tente novamente.</p>
      <p v-else-if="locationStore.queryResult.length === 0">
        Parece que não encontramos sua cidade, tente outros termos.
      </p>
      <li
        v-for="result in locationStore.queryResult"
        :key="result.id"
        class="py-2 cursor-pointer"
        @click="cityView(result)"
      >
        {{ result.place_name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchFetchStore } from '@/stores/locations'

const router = useRouter()
const locationStore = useSearchFetchStore()
const searchQuery = ref('')
const queryTimeout = ref(null)
const queryError = ref(null)

const cityView = (result) => {
  const [city, state] = result.place_name.split(',')
  router.push({
    name: 'city',
    params: { state: state.replaceAll(' ', ''), city: city },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0]
    }
  })
}

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        await locationStore.getLocation(searchQuery.value)
      } catch {
        queryError.value = true
      }
    }
  }, 300)
}
</script>

<style scoped>
span {
  background: -webkit-linear-gradient(
    90deg,
    hsla(197, 100%, 63%, 1) 0%,
    hsla(294, 100%, 55%, 1) 100%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
