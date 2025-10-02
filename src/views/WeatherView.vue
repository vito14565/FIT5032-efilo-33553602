<template>
  <div class="container">
    <h1>WEATHER APP</h1>

    <!-- Search by city -->
    <div class="search-bar">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name"
        class="search-input"
      />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>

    <!-- Weather data display -->
    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </main>

    <!-- Error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios"

// Store the API key in an environment variable (recommended: .env.local)
const apikey = import.meta.env.VITE_OWM_KEY

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      error: "",
    }
  },
  computed: {
    // Calculate temperature (API returns Kelvin, here converted directly to Celsius)
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    // weather icon URL
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    },
  },
  mounted() {
    // After page load, fetch current location weather (Task 10.1)
    this.fetchCurrentLocationWeather()
  },
  methods: {
    // Use browser Geolocation to get location
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      } else {
        this.error = "Geolocation not supported by this browser."
      }
    },
    // Search by entering a city name (Task 10.2)
    async searchByCity() {
      if (!this.city) {
        this.error = "Please enter a city name."
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    },
    // Shared function: fetch API data
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
        this.error = ""
      } catch (err) {
        this.error = "Error fetching weather data: " + (err.response?.data?.message || err.message)
        this.weatherData = null
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
.search-bar {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.search-input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.search-button {
  padding: 8px 14px;
  border: none;
  background: #0d6efd;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 15px;
}
</style>