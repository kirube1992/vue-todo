<script setup></script>

<template>
  <div class="main">
    <img class="pp" src="../asset/profile.png" alt="" />
    <ul class="sidebarLists">
      <li>
        <a href="../view/home.vue"><img src="../asset/home.png" />Home</a>
      </li>
      <li>
        <a href="../view/about.vue"><img src="../asset/packag.png" />About</a>
      </li>
      <li>
        <a href="../view/service.vue"><img src="../asset/tool.png" />Service</a>
      </li>
      <li>
        <a href="../view/contact.vue"><img src="../asset/contact.png" />contact</a>
      </li>
      <li>
        <a class="seetingList"><img src="../asset/setting.png" />Setting</a>
      </li>
    </ul>
  </div>
</template>
<style>
main {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background-color: #7d8ca3;
  height: 100vh;
  max-width: 275px;
  padding-top: 40px;
  font-family: 'Happy Monkey', system-ui;
  font-weight: 600;
}

.pp {
  width: 35px;
}
.sidebarLists {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* List Item */
.sidebarLists li {
  width: 100%;
}

/* Link Style */
.sidebarLists a {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

/* Icon */
.sidebarLists img {
  width: 24px;
  height: 24px;
}

/* Hover Effect */
.sidebarLists a:hover {
  background-color: #5f6f85;
  transform: translateX(5px);
}

/* Active Example */
.sidebarLists a.active {
  background-color: #4c5d72;
}

/* Settings Item (different style) */
.settingList {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  font-size: 18px;
  color: #f3f3f3;
  cursor: pointer;
  transition: 0.3s;
}

.settingList:hover {
  background-color: #5f6f85;
  border-radius: 8px;
}
</style>
