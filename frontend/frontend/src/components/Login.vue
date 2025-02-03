<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
    <div class="w-full max-w-lg bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl p-8 space-y-6 transform transition duration-500 ease-in-out scale-105 hover:scale-100">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-white">MediTrust</h1>
        <p class="text-gray-400 mt-2 text-lg">Sign in to stay updated</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg"
        >
          Login
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-400 text-sm">
          Don't have an account?
          <router-link to="/register" class="text-gray-500 font-medium hover:underline">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.email && this.password) {
        console.log("Logging in with:", this.email, this.password);
        alert("Login successful");
      } else {
        alert("Please fill in all fields");
      }
    },
  },
};
</script>

<style scoped>
/* Custom animations */
button {
  transition: transform 0.2s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  background-color: #4a5568; /* Dark grayish blue */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

input {
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

input:focus {
  box-shadow: 0 0 8px 2px rgba(66, 153, 225, 0.6); /* Soft focus effect */
  background-color: #2d3748;
}

/* Add some background blur effect */
.bg-gradient-to-br {
  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(30, 30, 30, 0.9));
}

/* Enhance the text */
.text-gray-400 {
  color: #a0aec0 !important;
}

.text-gray-500 {
  color: #edf2f7 !important;
}

.text-gray-600 {
  color: #e2e8f0 !important;
}
</style>
