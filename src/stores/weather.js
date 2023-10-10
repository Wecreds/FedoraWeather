import { reactive, computed } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherFetchStore = defineStore('weather', () => {
    const state = reactive({
        weatherData: null,
    })
    
    const weatherData = computed(() => state.weatherData)
    
    const getWeatherData = async (lat, lng) => {
        const openweatherAPIKEY = import.meta.env.VITE_OpenWeatherApiKey
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${openweatherAPIKEY}&units=metric&lang=pt_br`
          )
          //Arrumando a data para o formato UTC.
          const localOffset = new Date().getTimezoneOffset() * 60000
          const utc = response.data.current.dt * 1000 + localOffset
          response.data.currentTime = utc + 1000 * response.data.timezone_offset
      
          //Arrumando o horário para o formato UTC.
          response.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset
            hour.currentTime = utc + 1000 * response.data.timezone_offset
          })
          state.weatherData = response.data
          return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(error)
        }
      }

    return {weatherData, getWeatherData}

})