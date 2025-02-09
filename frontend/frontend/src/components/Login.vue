<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 p-4">
    <div class="w-full max-w-lg bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-white">Welcome Back</h1>
        <p class="text-gray-400 mt-2 text-lg">Sign in to your account</p>
      </div>

      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </form>

      
      <div v-if="errorMessage" class="text-red-500 text-center mt-2">
        {{ errorMessage }}
      </div>

      
      <div class="text-center">
        <p class="text-gray-400 text-sm">
          Don't have an account?
          <router-link to="/register" class="text-gray-500 font-medium hover:underline">Sign up here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const isLoading = ref(false);
    const router = useRouter();
    const emit = defineEmits(["showCookieBanner"]);

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        console.log("🔄 Tentative de connexion...");

        const response = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();
        console.log("🔍 Réponse Strapi :", JSON.stringify(data, null, 2));

        
        if (response.ok && data.jwt) {
          console.log("✅ Connexion réussie !");

          
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user", JSON.stringify(data.user));

          window.dispatchEvent(new Event("authChanged"));

          
          localStorage.removeItem("cookiePreferences");

          
          emit("showCookieBanner");

          router.push("/profile");
        } else {
          console.error("❌ Erreur API Strapi :", data);

          
          errorMessage.value = data.error?.message || "Échec de la connexion. Vérifiez vos identifiants.";
        }
      } catch (error) {
        console.error("❌ Erreur lors de la connexion :", error);
        errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
      } finally {
        isLoading.value = false;
      }
    };

    return { email, password, errorMessage, handleLogin, isLoading };
  },
};
</script>