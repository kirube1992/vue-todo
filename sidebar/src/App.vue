<script setup>
import sidebar from './component/sidebar.vue'
</script>

<template>
  <div class="app">
    <sidebar />
    <router-view />
  </div>
</template>

<style>
.app {
  background: #59544b;
  max-width: 280px;
  height: 100vh;
}
</style>
