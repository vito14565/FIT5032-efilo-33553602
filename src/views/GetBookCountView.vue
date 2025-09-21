<template>
  <div class="container">
    <h1>Book Counter</h1>
    <button @click="fetchCount">Get Book Count</button>

    <p v-if="error">Error: {{ error }}</p>
    <p v-else-if="count !== null">Total number of books: {{ count }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "GetBookCountView",
  setup() {
    const count = ref(null);
    const error = ref(null);

    const fetchCount = async () => {
      try {
        error.value = null;
        const res = await axios.get("https://us-central1-bookproject-weihsiang-ce46d.cloudfunctions.net/countBooks");
        count.value = res.data.count;
      } catch (e) {
        error.value = e.message;
      }
    };

    return { count, error, fetchCount };
  },
};
</script>