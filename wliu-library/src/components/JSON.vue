<template>
  <div class="json-lab">
    <h1>📚 Library Data</h1>

    <!-- 3.1  -->
    <section>
      <h2>Author Names & Birth Years</h2>
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <!-- 3.2 1850 born -->
    <section>
      <h2>Authors Born After 1850</h2>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <!-- author data -->
    <section>
      <h2>Authors</h2>
      <div v-for="author in authors" :key="author.id" class="author-card">
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

    <!-- bookstroe data -->
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

<script setup>
import { computed } from 'vue'
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

// Activity 2.1: modernAuthors
const modernAuthors = computed(() =>
  authors.filter((author) => author.birthYear > 1850)
)

// Activity 2.2: allFamousWorks
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title))
)
</script>

<style scoped>
.json-lab {
  font-family: Arial, sans-serif;
  padding: 20px;
}
h1 {
  color: #333;
}
h2 {
  margin-top: 20px;
  color: #444;
}
.author-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
}
ul {
  margin: 0;
  padding-left: 20px;
}
</style>
