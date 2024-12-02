<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="scale-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./style.css";

export default defineComponent({
  name: "App",
});
</script>
