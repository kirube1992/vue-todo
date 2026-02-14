<script setup>
import { ref, computed, onMounted, watch } from "vue";
const todos = ref([]);
const name = ref("");

const input_content = ref("");
const input_catagory = ref("");

const todoAsc = computed(() => {
  todos.value.sort((a, b) => {
    return b.cerateAdt - a.cerateAdt;
  });
});

watch(name, (newval) => {
  localStorage.setItem("name", newval);
});

onMounted(() => {
  name.value = localStorage.getItem("name" || "");
  todos.value = JSON.parse(localStorage.getItem("todos")) || "";
});

const addToDo = () => {
  if (input_catagory.value.trim === "" || input_content.value.trim === null) {
    return;
  }

  todos.value.push({
    content: input_content.value,
    catagory: input_catagory.value,
    done: false,
    cerateAdt: new Date().getTime(),
  });
};

watch(
  todos,
  (newval) => {
    localStorage.setItem("todos", JSON.stringify(newval));
  },
  { deep: true },
);
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
    <section class="creat-todo">
      <h3>CREATE TO DO</h3>
      <form @submit.prevent="addToDo">
        <h4>what's on ur mind</h4>
        <input
          type="text"
          placeholder="e.g. Video edeting"
          v-model="input_content"
        />
        <h4>pick a catagory</h4>
        <div class="catacory">
          <label>
            <input
              type="radio"
              name="Catagory"
              value="business"
              v-model="input_catagory"
            />
            <div>business</div>
          </label>
          <label>
            <input
              type="radio"
              name="Catagory"
              value="personal"
              v-model="input_catagory"
            />
            <div>personal</div>
          </label>
        </div>

        <input type="submit" value="add-todo" />
      </form>
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
  padding: 20px;
}

/* ===== MAIN APP CONTAINER ===== */
.app {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* ===== GREETING SECTION ===== */
.gertting {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

.greeting-label {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-align: center;
}

.name-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 1rem;
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

/* ===== CREATE TODO SECTION ===== */
.creat-todo {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out 0.1s backwards;
}

.creat-todo h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
  position: relative;
}

.creat-todo h3::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.creat-todo form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.creat-todo h4 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.creat-todo input[type="text"] {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
  margin-bottom: 10px;
}

.creat-todo input[type="text"]:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

/* ===== CATEGORY RADIO BUTTONS ===== */
.catacory {
  display: flex;
  gap: 20px;
  margin: 10px 0 20px;
  flex-wrap: wrap;
}

.catacory label {
  flex: 1;
  min-width: 120px;
  cursor: pointer;
}

.catacory input[type="radio"] {
  display: none;
}

.catacory div {
  padding: 15px;
  text-align: center;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
  text-transform: capitalize;
}

.catacory input[type="radio"]:checked + div {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

/* Business category specific hover */
.catacory label:first-child div:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

/* Personal category specific hover */
.catacory label:last-child div:hover {
  border-color: #764ba2;
  background: rgba(118, 75, 162, 0.1);
}

/* ===== SUBMIT BUTTON ===== */
input[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
  width: 100%;
}

input[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

input[type="submit"]:active {
  transform: translateY(0);
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
  body {
    padding: 10px;
  }

  .app {
    gap: 15px;
  }

  .gertting,
  .creat-todo {
    padding: 20px;
  }

  .greeting-label {
    font-size: 1.8rem;
  }

  .catacory {
    flex-direction: column;
    gap: 10px;
  }

  .catacory label {
    width: 100%;
  }

  input[type="submit"] {
    padding: 12px 20px;
    font-size: 1rem;
  }
}

/* ===== TODO LIST SECTION (for future use) ===== */
.todo-list {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.todo-item.business {
  border-left: 4px solid #667eea;
}

.todo-item.personal {
  border-left: 4px solid #764ba2;
}

/* ===== UTILITY CLASSES ===== */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mt-2 {
  margin-top: 20px;
}

.mb-2 {
  margin-bottom: 20px;
}
</style>
