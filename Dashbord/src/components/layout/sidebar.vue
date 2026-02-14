<script setup>
import SideLIst from "../UI/SideLIst.vue";
import { ref } from "vue";
import logoIcon from "../../assets/sidelogo.png";
import billingIcon from "../../assets/billing.png";
import tableIcon from "../../assets/table.png";
import dashboardIcon from "../../assets/dashboard.png";
import RTLIcon from "../../assets/RTL.png";

const mainItem = ref([
  { name: "dashbord", icon: dashboardIcon },
  { name: "billing", icon: billingIcon },
  { name: "Table", icon: tableIcon },
  { name: "RTL", icon: RTLIcon },
]);
</script>
<template>
  <aside class="sidebar">
    <div class="sidebar_top">
      <i>
        <img :src="logoIcon" alt="Logo" class="sidebar_icon" />
      </i>
      <h3>Puirty UI dashbord</h3>
    </div>
    <SideLIst
      v-for="list in mainItem"
      :key="list.name"
      :label="list.name"
      :icon="list.icon"
    />
  </aside>
</template>

<style>
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #eaeaea;
}
.sidebar_top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>
