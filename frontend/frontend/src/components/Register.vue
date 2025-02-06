<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
    <div class="w-full max-w-lg bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-white">Create an Account</h1>
        <p class="text-gray-400 mt-2 text-lg">Sign up to access MediTrust</p>
      </div>

      <!-- ✅ Registration Form -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            required
            class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
            placeholder="JohnDoe"
          />
        </div>

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
          class="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg"
        >
          Register
        </button>
      </form>

      <!-- ✅ Error Message -->
      <div v-if="errorMessage" class="text-red-500 text-center mt-2">
        {{ errorMessage }}
      </div>

      <!-- ✅ Redirect to Login -->
      <div class="text-center">
        <p class="text-gray-400 text-sm">
          Already have an account?
          <router-link to="/login" class="text-gray-500 font-medium hover:underline">Sign in here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleRegister = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/auth/local/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("✅ Registration successful:", data);

          // ✅ Redirect to profile AFTER the user data is stored
          router.push("/profile");
        } else {
          errorMessage.value = data.message || "Registration failed";
        }
      } catch (error) {
        console.error("❌ Registration error:", error);
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    return { username, email, password, errorMessage, handleRegister };
  },
};
</script>

<style scoped>
button {
  transition: transform 0.2s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease;
}
button:hover {
  transform: scale(1.05);
  background-color: #4a5568;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}
</style>
