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
  display: flex;
}
</style>
