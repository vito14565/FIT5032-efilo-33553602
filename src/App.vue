<template>
  <div class="main-container">
    <!-- Use BHeader component for navigation -->
    <header>
      <BHeader />
    </header>

    <!-- Router view will load HomeView, AboutView, etc. -->
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import BHeader from './components/BHeader.vue' // import the header component
</script>

<style>
.main-container {
  padding: 20px;
}
.main-box {
  margin-top: 20px;
}
</style>