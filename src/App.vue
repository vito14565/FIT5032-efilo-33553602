<script setup>
import Form from './components/Form.vue'
import JSON from './components/JSON.vue'
import { ref } from 'vue'

// State to control which component is displayed
const currentView = ref('form')
</script>

<template>
  <div>
    <h1>📚 FIT5032 Week1 Demo</h1>

    <!-- Buttons to switch between components -->
    <div style="margin-bottom: 20px;">
      <button @click="currentView = 'form'">Show Form</button>
      <button @click="currentView = 'json'">Show JSON Lab</button>
    </div>

    <!-- Render component based on currentView -->
    <Form v-if="currentView === 'form'" />
    <JSON v-else />
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
  padding: 6px 12px;
  background: #42b983;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #369f6f;
}
</style>
