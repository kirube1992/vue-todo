<script setup>
import sidebar from "@/components/layout/sidebar.vue";
import topbar from "@/components/layout/topbar.vue";
</script>

<template>
  <div class="layout">
    <sidebar />
    <div class="main">
      <topbar />
      <div class="content">
        <h1>content</h1>
      </div>
    </div>
  </div>
</template>

<style>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.contetn {
  display: flex;
  padding: 24;
  overflow-y: auto;
}
</style>
