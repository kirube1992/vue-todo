<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  label: String,
  icon: String,
});
const list = ref("");
</script>
<template>
  <div class="content">
    <div class="icon-box">
      <i :src="icon" alt="label" class="icon-image"></i>
    </div>
    <p class="lable">{{ label }}</p>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center; /* Centers items vertically */
  padding: 12px;
  cursor: pointer;
}
.icon-box {
  width: 30px;
  height: 30px;
  background: #4fd1c5;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.label {
  margin: 0;
  color: #a0aec0;
  font-weight: 600;
  font-size: 14px;
}
</style>
