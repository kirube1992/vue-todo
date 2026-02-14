<script setup>
import { ref, computed, onMounted, watch } from "vue";

const todos = ref([]);
const name = ref("");
const input_content = ref("");
const input_category = ref(""); // Fixed spelling

// ✅ FIXED: Computed returns sorted copy
const todoAsc = computed(() => {
  return [...todos.value].sort((a, b) => {
    return (b.createdAt || 0) - (a.createdAt || 0); // Fixed spelling
  });
});

watch(name, (newval) => {
  localStorage.setItem("name", newval);
});

onMounted(() => {
  name.value = localStorage.getItem("name") || "";

  // ✅ FIXED: Proper array fallback
  const savedTodos = localStorage.getItem("todos");
  todos.value = savedTodos ? JSON.parse(savedTodos) : [];
});

// ✅ FIXED: Remove function
const removeTodo = (todoToRemove) => {
  todos.value = todos.value.filter((t) => t !== todoToRemove);
};

const addToDo = () => {
  // ✅ FIXED: Proper validation
  // if (!input_category.value.trim() || !input_content.value.trim()) {
  //   alert("Please fill in both content and category!");
  //   return;
  // }

  todos.value.push({
    content: input_content.value,
    category: input_category.value, // Fixed spelling
    done: false,
    createdAt: new Date().getTime(), // Fixed spelling
  });

  // ✅ FIXED: Clear with empty strings
  input_content.value = "";
  input_category.value = "";
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
    <section class="todo-lists">
      <h3>TODO LIST</h3>
      <div class="list">
        <div
          v-for="todo in todoAsc"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.catagory}`"></span>
          </label>
          <div class="todo-contents">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)"></button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style>
/* ===== GLOBAL RESET & VARIABLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #5e72e4;
  --primary-dark: #324cdd;
  --primary-light: #8f9ef0;
  --business: #667eea;
  --personal: #764ba2;
  --success: #2dce89;
  --danger: #f5365c;
  --dark: #32325d;
  --gray: #8898aa;
  --gray-light: #e9ecef;
  --white: #ffffff;
  --shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  --radius: 12px;
}

/* ===== GLOBAL STYLES ===== */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
  min-height: 100vh;
  padding: 20px;
}

/* ===== MAIN APP CONTAINER ===== */
.app {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* ===== GREETING SECTION ===== */
.gertting {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
  animation: slideUp 0.5s ease-out;
}

.greeting-label {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
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
  border: 2px solid var(--gray-light);
  border-radius: var(--radius);
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.name-input:focus {
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

/* ===== CREATE TODO SECTION ===== */
.creat-todo {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
  animation: slideUp 0.5s ease-out 0.1s backwards;
}

.creat-todo h3 {
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--gray-light);
  position: relative;
}

.creat-todo h3::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
}

.creat-todo form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.creat-todo h4 {
  font-size: 1rem;
  color: var(--gray);
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.creat-todo input[type="text"] {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid var(--gray-light);
  border-radius: var(--radius);
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
  margin-bottom: 10px;
}

.creat-todo input[type="text"]:focus {
  border-color: var(--primary);
  background: var(--white);
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
  border: 2px solid var(--gray-light);
  border-radius: var(--radius);
  font-weight: 600;
  color: var(--gray);
  transition: all 0.3s ease;
  text-transform: capitalize;
}

.catacory input[type="radio"]:checked + div {
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
  color: var(--white);
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

/* Business category specific hover */
.catacory label:first-child div:hover {
  border-color: var(--business);
  background: rgba(102, 126, 234, 0.1);
}

/* Personal category specific hover */
.catacory label:last-child div:hover {
  border-color: var(--personal);
  background: rgba(118, 75, 162, 0.1);
}

/* ===== SUBMIT BUTTON ===== */
input[type="submit"] {
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
  color: var(--white);
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--radius);
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

/* ===== TODO LIST SECTION ===== */
.todo-lists {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
  animation: slideUp 0.5s ease-out 0.2s backwards;
}

.todo-lists h3 {
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--gray-light);
  position: relative;
}

.todo-lists h3::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* ===== TODO ITEM ===== */
.todo-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.todo-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Category-specific borders */
.todo-item .bubble.business {
  border-color: var(--business);
  background: var(--business);
}

.todo-item .bubble.personal {
  border-color: var(--personal);
  background: var(--personal);
}

/* Done state */
.todo-item.done {
  opacity: 0.7;
  background: #f0f0f0;
}

.todo-item.done .todo-contents input {
  text-decoration: line-through;
  color: var(--gray);
  background: transparent;
}

/* ===== TODO CHECKBOX CUSTOM ===== */
.todo-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.todo-item input[type="checkbox"] {
  display: none;
}

.bubble {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid;
  display: inline-block;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.bubble.business {
  border-color: var(--business);
  background: transparent;
}

.bubble.personal {
  border-color: var(--personal);
  background: transparent;
}

input[type="checkbox"]:checked + .bubble {
  background: currentColor;
}

input[type="checkbox"]:checked + .bubble.business {
  background: var(--business);
  box-shadow:
    0 0 0 2px var(--white),
    0 0 0 4px var(--business);
}

input[type="checkbox"]:checked + .bubble.personal {
  background: var(--personal);
  box-shadow:
    0 0 0 2px var(--white),
    0 0 0 4px var(--personal);
}

/* ===== TODO CONTENT ===== */
.todo-contents {
  flex: 1;
}

.todo-contents input {
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
}

.todo-contents input:hover {
  border-color: var(--gray-light);
  background: var(--white);
}

.todo-contents input:focus {
  border-color: var(--primary);
  background: var(--white);
}

/* ===== ACTION BUTTONS ===== */
.actions {
  display: flex;
  gap: 10px;
}

.delete {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.delete:hover {
  opacity: 1;
}

.delete::before,
.delete::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 2px;
  background: var(--danger);
  top: 50%;
  left: 50%;
}

.delete::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.delete::after {
  transform: translate(-50%, -50%) rotate(-45deg);
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

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--gray);
  font-style: italic;
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
  .creat-todo,
  .todo-lists {
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

  .todo-item {
    flex-wrap: wrap;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }

  input[type="submit"] {
    padding: 12px 20px;
    font-size: 1rem;
  }
}

/* ===== UTILITY CLASSES ===== */
.text-gradient {
  background: linear-gradient(135deg, var(--business) 0%, var(--personal) 100%);
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
.text-center {
  text-align: center;
}
</style>
