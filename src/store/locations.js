import {reactive, computed} from 'vue'
import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', () => {
    const state = reactive({
        queryResult: []
    })
    
    const queryResult = computed(() => state.queryResult)
    
    const getLocation = async (searchText) => {
        const mapboxAPIKEY = import.meta.env.VITE_MapBoxApiKey
        try {
            const data = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapboxAPIKEY}&types=place&language=pt`
            )
            state.queryResult = data.data.feature
            return Promise.resolve(true) 
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return {queryResult, getLocation}

})