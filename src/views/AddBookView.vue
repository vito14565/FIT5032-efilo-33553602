<!-- src/views/AddBookView.vue -->
<template>
  <div class="container py-4">
    <h1 class="h4 mb-3">Add Book</h1>

    <!-- Form to add a new book -->
    <form @submit.prevent="addBook" class="vstack gap-3" novalidate>
      <div>
        <label for="isbn" class="form-label">ISBN</label>
        <input
          id="isbn"
          type="text"
          v-model.trim="isbn"
          required
          class="form-control"
          placeholder="e.g. 9780132350884"
        />
      </div>

      <div>
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          type="text"
          v-model.trim="name"
          required
          class="form-control"
          placeholder="Book title"
        />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Feedback message -->
    <p v-if="msg" class="alert alert-info mt-3">{{ msg }}</p>

    <hr class="my-4" />
    <h2 class="h5">Manage Books</h2>

    <!-- Simple manage list for update/delete demo -->
    <ul class="list-unstyled">
      <li
        v-for="book in books"
        :key="book.id"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span>
          {{ book.name }} — ISBN: {{ book.isbn }}
        </span>
        <div class="btn-group">
          <!-- Pass whole book to allow default value in prompt -->
          <button class="btn btn-sm btn-warning" @click="updateBook(book)">
            Update
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <hr class="my-4" />
    <!-- Query result (Books with ISBN > 1000) -->
    <BookList />
  </div>
</template>

<script setup>
// Reactive state
import { ref, onMounted } from 'vue'

// Firestore
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'

// Query component under the form
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const msg = ref('')
const books = ref([])

// Load all books for update/delete demo
async function loadBooks () {
  const snap = await getDocs(collection(db, 'books'))
  books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Add a new document into "books" collection
async function addBook () {
  if (!isbn.value || !name.value) {
    msg.value = 'Both ISBN and Name are required.'
    return
  }

  const isbnNumber = Number(isbn.value)
  if (Number.isNaN(isbnNumber)) {
    msg.value = 'ISBN must be a valid number.'
    return
  }

  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,        // store as number for numeric queries
      name: name.value,
      createdAt: serverTimestamp()
    })
    msg.value = 'Book added successfully!'
    isbn.value = ''
    name.value = ''
    loadBooks()
  } catch (e) {
    console.error('Error adding book:', e)
    msg.value = 'Failed to add book.'
  }
}

// Update book name with a prompt
async function updateBook (book) {
  try {
    const newName = window.prompt('Enter new name', book.name)
    if (newName === null) return // user cancelled
    const trimmed = newName.trim()
    if (!trimmed) {
      msg.value = 'Name cannot be empty.'
      return
    }
    const refDoc = doc(db, 'books', book.id)
    await updateDoc(refDoc, { name: trimmed })
    msg.value = 'Book updated successfully!'
    loadBooks()
  } catch (e) {
    console.error('Error updating book:', e)
    msg.value = 'Failed to update book.'
  }
}

// Delete book
async function deleteBook (id) {
  try {
    const refDoc = doc(db, 'books', id)
    await deleteDoc(refDoc)
    msg.value = 'Book deleted successfully!'
    loadBooks()
  } catch (e) {
    console.error('Error deleting book:', e)
    msg.value = 'Failed to delete book.'
  }
}

onMounted(loadBooks)
</script>