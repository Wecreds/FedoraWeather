import { reactive, computed } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchFetchStore = defineStore('location', () => {
    const state = reactive({
        queryResult: null,
    })
    
    const queryResult = computed(() => state.queryResult)
    
    const getLocation = async (searchQuery) => {
        const mapboxAPIKEY = import.meta.env.VITE_MapBoxApiKey
        try {
            const data = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxAPIKEY}&types=place&language=pt`
            )
            state.queryResult = data.data.features
            return Promise.resolve(true) 
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {queryResult, getLocation}

})