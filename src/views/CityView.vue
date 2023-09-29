<template>
    <div></div>
</template>
  
  <script setup>
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import apiConfig from '../../config.js';

  const openweatherAPIKEY = apiConfig.openweatherAPIKEY
  const route = useRoute()
  const getWeatherData = async () => {
    try{
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openweatherAPIKEY}`
        );
  
      //Arrumando a data para o formato UTC.
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
  
      //Arrumando o horário para o formato UTC.
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
  
      return weatherData.data
    } catch(error){
      console.error(error)
    };
  };
  
  const weatherData = await getWeatherData();
  console.log(weatherData)
  
  </script>
  