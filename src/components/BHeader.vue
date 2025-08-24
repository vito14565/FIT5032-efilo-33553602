<template>
  <!-- Using Bootstrap header navigation -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <!-- Home link -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
        </li>

        <!-- About link -->
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
// No script needed, router-link handles navigation
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: white;
}
</style>