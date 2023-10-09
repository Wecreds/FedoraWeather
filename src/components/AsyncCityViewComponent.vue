<template>
  <div class="min-h-screen w-full flex justify-center">
    <div class="flex flex-col flex-1 items-center">
      <div class="flex flex-col items-center p-12 bg-slate-300 rounded-md shadow-xl m-2">
        <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.currentTime).toLocaleDateString('pt-br', {
              weekday: 'long',
              day: '2-digit',
              month: 'long'
            })
          }},
          {{
            new Date(weatherData.currentTime).toLocaleTimeString('pt-br', {
              timeStyle: 'short'
            })
          }}.
        </p>
        <p class="text-8xl mb-8">{{ Math.round(weatherData.current.temp) }}&deg;C</p>
        <p class="text-center">
          Sensação térmica
          {{ Math.round(weatherData.current.feels_like) }}&deg;C
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <hr class="w-2/3 border-black border-opacity-10 border bg-slate-300" />

      <div class="max-w-screen-md w-full py-12 bg-slate-300 rounded-md shadow-xl m-2">
        <div class="mx-8">
          <h2 class="mb-4">Clima por horário</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString('pt-br', {
                    hour: '2-digit'
                  })
                }}:00
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt=""
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="w-2/3 border-black border-opacity-10 border bg-slate-300" />

      <div class="max-w-screen-md w-full py-12 bg-slate-300 rounded-md shadow-xl m-2">
        <div class="mx-8">
          <h2 class="mb-4">Clima da semana</h2>
          <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString('pt-br', {
                  weekday: 'long'
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>Máx.: {{ Math.round(day.temp.max) }}</p>
              <p>Min.: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="top-3 left-3 fixed text-3xl cursor-pointer">
    <router-link to="/">
    <i class="fa-solid fa-arrow-left"></i>
    </router-link>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const openweatherAPIKEY = import.meta.env.VITE_OpenWeatherApiKey

const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openweatherAPIKEY}&units=metric&lang=pt_br`
    )

    //Arrumando a data para o formato UTC.
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

    //Arrumando o horário para o formato UTC.
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    })

    return weatherData.data
  } catch (error) {
    console.error(error)
  }
}

const weatherData = await getWeatherData()
console.log(weatherData)
</script>
