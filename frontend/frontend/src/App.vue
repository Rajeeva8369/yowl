<template>
  <div class="min-h-screen w-full bg-black text-white">
    <Menu />
    <router-view @showCookieBanner="showCookieBanner = true" />
    
    <Cookie v-if="showCookieBanner" @close="showCookieBanner = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from "./components/Menu.vue";
import Cookie from "./components/Cookie.vue";

const showCookieBanner = ref(false);

onMounted(() => {
  const savedPreferences = localStorage.getItem("cookiePreferences");
  if (!savedPreferences) {
    showCookieBanner.value = true;
  }

  window.addEventListener("authChanged", () => {
    showCookieBanner.value = true;
  });
});
</script>