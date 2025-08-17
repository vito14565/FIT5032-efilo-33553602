<template>
  <div class="json-lab">
    <h1>📚 Library Data</h1>

    <!-- 4.1: Toggle Message -->
    <section>
      <h2>Toggle Message</h2>
      <button @click="showMessage = !showMessage" class="toggle-btn">
        Toggle Message
      </button>
      <p v-if="showMessage" class="message success">
        ✨ You're a Vue superstar! ✨
      </p>
      <p v-else class="message">
        Click the button to see a message.
      </p>
    </section>

    <!-- 3.1: Author Names & Birth Years -->
    <section>
      <h2>Author Names & Birth Years</h2>
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{ highlight: isGeorgeOrwell(author.name) }"
          :style="isGeorgeOrwell(author.name) ? highlightStyle : {}"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <!-- 3.2: Authors Born After 1850 -->
    <section>
      <h2>Authors Born After 1850</h2>
      <ul>
        <li
          v-for="author in modernAuthors"
          :key="author.id"
          :class="{ highlight: isGeorgeOrwell(author.name) }"
          :style="isGeorgeOrwell(author.name) ? highlightStyle : {}"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>

    <!-- 3.3: All Famous Works -->
    <section>
      <h2>All Famous Works</h2>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>
    </section>

    <!-- Authors full details -->
    <section>
      <h2>Authors</h2>
      <div
        v-for="author in authors"
        :key="author.id"
        class="author-card"
        :class="{ highlight: isGeorgeOrwell(author.name) }"
        :style="isGeorgeOrwell(author.name) ? highlightStyle : {}"
      >
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

    <!-- Bookstore Info -->
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
import { computed, ref } from 'vue'
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

// 4.1: Toggle Message
const showMessage = ref(false)

// 2.1: Authors born after 1850
const modernAuthors = computed(() =>
  authors.filter((author) => author.birthYear > 1850)
)

// 2.2: All famous works
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title))
)

// Task 2.2: George Orwell highlight condition
const isGeorgeOrwell = (name) => name === "George Orwell"

// Task 2.2: Highlight style (style binding)
const highlightStyle = {
  backgroundColor: "yellow",
  color: "black",
  fontWeight: "bold",
  padding: "4px",
  borderRadius: "4px"
}
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

/* 4.1: Toggle button */
.toggle-btn {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.toggle-btn:hover {
  background-color: #369f6f;
}

/* Toggle message */
.message {
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
}
.success {
  background-color: #e6ffed;
  border: 1px solid #8ee89e;
}

/* Author card */
.author-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
}

/* Class binding highlight */
.highlight {
  outline: 2px solid orange;
}

/* List styling */
ul {
  margin: 0;
  padding-left: 20px;
}
</style>
