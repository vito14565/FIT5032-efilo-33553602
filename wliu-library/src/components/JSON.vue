<script setup>
import { computed } from 'vue'
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

// 2.1
const modernAuthors = computed(() =>
  authors.filter((author) => author.birthYear > 1850)
)
</script>

<template>
  <div class="json-lab">
    <h1>📚 Library Data</h1>

    <!-- author data  -->
    <section>
      <h2>Authors Born After 1850</h2>
      <div v-for="author in modernAuthors" :key="author.id" class="author-card">
        <h3>{{ author.name }} (Born {{ author.birthYear }})</h3>
        <p><strong>Genres:</strong> {{ author.genres.join(", ") }}</p>
        <div>
          <strong>Famous Works:</strong>
          <ul>
            <li v-for="(work, index) in author.famousWorks" :key="index">
              {{ work.title }} ({{ work.year }})
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- bookstores data -->
    <section>
      <h2>Bookstore Info</h2>
      <p><strong>Name:</strong> {{ bookstores.name }}</p>
      <p><strong>Total Stores:</strong> {{ bookstores.totalStores }}</p>
      <p><strong>Countries:</strong> {{ bookstores.countries.join(", ") }}</p>
      <p>
        <strong>Store Types:</strong>
        Physical - {{ bookstores.storeTypes.physical }},
        Online - {{ bookstores.storeTypes.online }}
      </p>
      <div>
        <strong>Top Sellers:</strong>
        <ul>
          <li v-for="(book, index) in bookstores.topSellers" :key="index">{{ book }}</li>
        </ul>
      </div>
      <div>
        <strong>Opening Hours:</strong>
        <p>Weekdays: {{ bookstores.openingHours.weekdays.open }} - {{ bookstores.openingHours.weekdays.close }}</p>
        <p>Weekends: {{ bookstores.openingHours.weekends.open }} - {{ bookstores.openingHours.weekends.close }}</p>
      </div>
    </section>
  </div>
</template>
