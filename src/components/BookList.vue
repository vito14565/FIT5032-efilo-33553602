<template>
  <div>
    <h1>Books with ISBN > 1000 (top 5 by ISBN desc)</h1>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <p v-if="books.length === 0">No books found.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

export default {
  setup () {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        // Query: where + orderBy + limit
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),     // filter
          orderBy('isbn', 'desc'),      // sort by ISBN (desc)
          limit(5)                      // take top 5
        )

        const snap = await getDocs(q)
        books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(fetchBooks)
    return { books }
  }
}
</script>