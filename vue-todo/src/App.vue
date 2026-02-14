<script setup>
import { ref, computed, onMounted, watch } from "vue";
const todo = ref([]);
const name = ref("");

watch(name, (newval) => {
  localStorage.setItem("name", newval);
});

onMounted(() => {
  name.value = localStorage.getItem("name" || "");
});
</script>

<template>
  <main class="app">
    <section class="gertting">
      <label for="name-input" class="greeting-label">What's Up</label>
      <input
        id="name-input"
        type="text"
        placeholder="What is your name?"
        v-model="name"
        class="name-input"
      />
    </section>
  </main>
</template>

<style>
/* ===== GLOBAL STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== MAIN APP CONTAINER ===== */
.app {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

/* ===== GREETING SECTION ===== */
.gertting {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

/* ===== GREETING LABEL ===== */
.greeting-label {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: -0.5px;
}

/* ===== NAME INPUT ===== */
.name-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.name-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.name-input::placeholder {
  color: #aaa;
  font-style: italic;
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 600px) {
  .app {
    padding: 10px;
  }

  .gertting {
    padding: 30px 20px;
  }

  .greeting-label {
    font-size: 2rem;
  }

  .name-input {
    padding: 12px 16px;
    font-size: 1rem;
  }
}

/* ===== OPTIONAL: Display greeting message ===== */
.greeting-message {
  margin-top: 20px;
  font-size: 1.3rem;
  color: #333;
  text-align: center;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===== OPTIONAL: Add some fun when input has value ===== */
.name-input:not(:placeholder-shown) {
  border-color: #4caf50;
  background: #f0f9f0;
}

.name-input:not(:placeholder-shown) + .greeting-label {
  color: #4caf50;
}
</style>
