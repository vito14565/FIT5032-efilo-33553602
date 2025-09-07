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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const isbn = ref('')
const name = ref('')
const msg = ref('')

async function addBook () {
  // Validation: both fields are required
  if (!isbn.value || !name.value) {
    msg.value = 'Both ISBN and Name are required.'
    return
  }

  // Validation: ISBN must be a number
  const isbnNumber = Number(isbn.value)
  if (Number.isNaN(isbnNumber)) {
    msg.value = 'ISBN must be a valid number.'
    return
  }

  try {
    // Add a new document to the "books" collection
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
      createdAt: serverTimestamp()
    })

    // Reset form and show success message
    msg.value = 'Book added successfully!'
    isbn.value = ''
    name.value = ''
  } catch (e) {
    console.error('Error adding book:', e)
    msg.value = 'Failed to add book.'
  }
}
</script>
