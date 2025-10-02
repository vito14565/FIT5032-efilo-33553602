<!-- src/views/GetAllBookAPI.vue -->
<template>
  <div class="container">
    <h2>Get All Book API</h2>

    <!-- Error message -->
    <p v-if="error" class="error">Error: {{ error }}</p>

    <!-- Show JSON data -->
    <pre v-else-if="jsondata">{{ jsondata }}</pre>

    <!-- Loading state -->
    <p v-else>Loading…</p>
  </div>
</template>

<script>
import { getDocs, collection } from "firebase/firestore";
import db from "../firebase/init"; // default export

export default {
  name: "GetAllBookAPI",
  data() {
    return {
      jsondata: null, // JSON data from Firestore
      error: null,    // Error message
    };
  },
  async mounted() {
    try {
      // Fetch all documents from Firestore collection "books"
      const snap = await getDocs(collection(db, "books"));
      const allBooks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Format response as JSON
      this.jsondata = JSON.stringify(allBooks, null, 2);
      this.error = null;
    } catch (e) {
      console.error("Error fetching all books:", e);
      this.error = e.message;
      this.jsondata = null;
    }
  },
};
</script>

<style scoped>
.error {
  color: #c00;
  font-weight: bold;
}
</style>