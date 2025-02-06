<template>
  <nav class="bg-gray-900 shadow-md rounded-xl mr-5 ml-5">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-4 w-14 h-1">
        <img src="/logo.png" />
        <router-link to="/" class="text-xl font-bold text-white">MediTrust</router-link>
      </div>

      
      <div class="hidden md:flex space-x-6">
        <router-link to="/" class="text-gray-600 hover:text-white">Home</router-link>
        <router-link to="/about" class="text-gray-600 hover:text-white">About</router-link>
        <router-link to="/contact" class="text-gray-600 hover:text-white">Contact</router-link>

        
        <router-link v-if="!isAuthenticated" to="/register" class="text-gray-600 hover:text-white">
          Join us
        </router-link>

        
        <router-link v-if="isAuthenticated" to="/profile" class="text-gray-600 hover:text-white">
          Profile
        </router-link>

        
        <button v-if="isAuthenticated" @click="logout" class="text-gray-600 hover:text-white">
          Log out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isAuthenticated = ref(false);
    const router = useRouter();

    
    const checkAuth = () => {
      isAuthenticated.value = !!localStorage.getItem("token");
    };

    
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      isAuthenticated.value = false;
      router.push("/");
      window.dispatchEvent(new Event("authChanged")); 
    };

    
    onMounted(() => {
      checkAuth();
      window.addEventListener("authChanged", checkAuth);
    });

    return { isAuthenticated, logout };
  },
};
</script>
