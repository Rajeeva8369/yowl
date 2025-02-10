<template>
  <nav class="bg-gray-900 shadow-md rounded-xl mx-5">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <img src="/logo.png" class="h-10 w-10" alt="MediTrust Logo" />
        <router-link to="/" class="text-xl font-bold text-white">MediTrust</router-link>
      </div>

      <div class="hidden md:flex space-x-6">
        <router-link to="/" class="text-gray-400 hover:text-white transition">Home</router-link>
        <router-link to="/about" class="text-gray-400 hover:text-white transition">About</router-link>
        <router-link to="/contact" class="text-gray-400 hover:text-white transition">Contact</router-link>

        <router-link v-if="!isAuthenticated" to="/register" class="text-gray-400 hover:text-white transition">
          Join us
        </router-link>

        <router-link v-if="isAuthenticated" to="/profile" class="text-gray-400 hover:text-white transition">
          Profile
        </router-link>

        <button v-if="isAuthenticated" @click="logout" class="text-gray-400 hover:text-white transition">
          Log out
        </button>
      </div>

      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <svg class="w-8 h-8 transition-transform duration-300" :class="{ 'rotate-90': menuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden bg-gray-800 p-4 rounded-lg transition-transform duration-300">
      <router-link @click="toggleMenu" to="/" class="block text-gray-400 hover:text-white py-2 transition">Home</router-link>
      <router-link @click="toggleMenu" to="/about" class="block text-gray-400 hover:text-white py-2 transition">About</router-link>
      <router-link @click="toggleMenu" to="/contact" class="block text-gray-400 hover:text-white py-2 transition">Contact</router-link>

      <router-link v-if="!isAuthenticated" @click="toggleMenu" to="/register" class="block text-gray-400 hover:text-white py-2 transition">
        Join us
      </router-link>

      <router-link v-if="isAuthenticated" @click="toggleMenu" to="/profile" class="block text-gray-400 hover:text-white py-2 transition">
        Profile
      </router-link>

      <button v-if="isAuthenticated" @click="logout" class="block text-gray-400 hover:text-white py-2 w-full text-left transition">
        Log out
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isAuthenticated = ref(false);
    const menuOpen = ref(false);
    const router = useRouter();

    const checkAuth = () => {
      isAuthenticated.value = !!localStorage.getItem("token");
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      isAuthenticated.value = false;
      menuOpen.value = false;
      router.push("/");
      window.dispatchEvent(new Event("authChanged"));
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    onMounted(() => {
      checkAuth();
      window.addEventListener("authChanged", checkAuth);
    });

    return { isAuthenticated, menuOpen, logout, toggleMenu };
  },
};
</script>
