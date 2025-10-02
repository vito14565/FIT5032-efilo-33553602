<template>
  <div class="container">
    <h2>Count Book API</h2>

    <p v-if="error" style="color:#c00">{{ error }}</p>
    <pre v-if="jsondata">{{ jsondata }}</pre>
    <p v-else>Loading…</p>
  </div>
</template>

<script>
import axios from "axios"

const API_URL =
  import.meta.env.VITE_COUNT_API_URL 

export default {
  name: "CountBookAPI",
  data() {
    return {
      jsondata: null,
      error: null,
    }
  },
  async mounted() {
    try {
      const res = await axios.get(API_URL)
      this.jsondata = JSON.stringify(res.data, null, 2)
    } catch (e) {
      console.error("Error fetching book count:", e)
      this.error = e?.response?.data?.message || e.message
      this.jsondata = null
    }
  },
}
</script>