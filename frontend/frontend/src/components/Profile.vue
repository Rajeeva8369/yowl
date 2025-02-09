<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4">
    <div class="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-gray-700">
      
      
      <div v-if="error" class="text-red-500 font-semibold mb-4">{{ error }}</div>

      
      <div v-if="isLoggedIn">
       
        <div class="w-24 h-24 mx-auto bg-gray-700 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-lg">
          {{ userProfile?.username.charAt(0).toUpperCase() }}
        </div>

        <h2 class="mt-4 text-2xl font-extrabold text-white">Bonjour {{ userProfile?.username }}</h2>
        <p class="text-gray-300 text-lg">{{ userProfile?.email }}</p>

        
        <div class="mt-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
          <p class="text-gray-400 text-sm">Member since: <span class="font-semibold text-white">{{ formatDate(userProfile?.createdAt) }}</span></p>
        </div>
      </div>

      
      <div v-else class="text-gray-400 text-lg font-semibold">
        Redirecting to login...
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const userProfile = ref(null);
    const error = ref(null);
    const isLoggedIn = ref(false);
    const router = useRouter();

    
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("🔴 No token found in localStorage. Redirecting to login.");
        router.push("/login"); 
        return;
      }

      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        userProfile.value = await response.json();
        isLoggedIn.value = true;
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        error.value = "Failed to load profile. Please login again.";
        localStorage.removeItem("token");
        isLoggedIn.value = false;
        router.push("/login"); 
      }
    };

    
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

   
    onMounted(() => {
      fetchUserProfile();
    });

    return { userProfile, error, isLoggedIn, formatDate };
  },
};
</script>

<style scoped>

h2, p, div {
  transition: all 0.3s ease-in-out;
}


.bg-white.bg-opacity-10 {
  transition: all 0.4s ease-in-out;
}
.bg-white.bg-opacity-10:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
}
</style>
