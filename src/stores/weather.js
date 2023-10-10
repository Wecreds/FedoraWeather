import { reactive, computed } from 'vue'
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router'

import axios from 'axios';

export const useWeatherFetchStore = defineStore('weather', () => {
    const state = reactive({
        weatherData: null,
    })
    

    const route = useRoute()
    const weatherData = computed(() => state.weather)
    
    const getWeatherData = async () => {
        const openweatherAPIKEY = import.meta.env.VITE_OpenWeatherApiKey
        try {
          const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openweatherAPIKEY}&units=metric&lang=pt_br`
          )

          state.weatherData = weatherData.data
      
          //Arrumando a data para o formato UTC.
          const localOffset = new Date().getTimezoneOffset() * 60000
          const utc = weatherData.data.current.dt * 1000 + localOffset
          weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset
      
          //Arrumando o horário para o formato UTC.
          weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
          })
      
          return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(error)
        }
      }
    //   const getLocation = async (searchQuery) => {
    //     const mapboxAPIKEY = import.meta.env.VITE_MapBoxApiKey
    //     try {
    //         const data = await axios.get(
    //             `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxAPIKEY}&types=place&language=pt`
    //         )
    //         state.queryResult = data.data.features
    //         return Promise.resolve(true) 
    //     } catch (error) {
    //         return Promise.reject(error)
    //     }
    // }

    return {weatherData, getWeatherData}

})