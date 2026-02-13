<script setup>
import { ref, computed, onMounted } from "vue";
const list = ref("");
</script>
<template>
  <div class="content">
    <p>{{ list }}</p>
  </div>
</template>
