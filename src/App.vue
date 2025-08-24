<template>
  <div class="main-container">
    <header>
      <!-- Navigation header (we can add navigation links here later) -->
      <h1>📚 FIT5032 Week1 Demo</h1>
    </header>

    <main class="main-box">
      <!-- Render the component that matches the current route -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// No need to import Form or JSON anymore because we are using Vue Router
</script>

<style>
.main-container {
  padding: 20px;
}
.main-box {
  margin-top: 20px;
}
</style>