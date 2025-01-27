<template>
  <div class="flex min-h-screen">
    <div class="w-full max-w-md m-auto bg-sky-950 rounded-lg shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-secondary text-gray-200">MediTrust</h1>
        <p class="text-gray-300 mt-2">Create an account to get started</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm text-gray-100">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full p-3 rounded bg-white border border-gray-700 focus:ring-2 focus:ring-secondary outline-none"
            placeholder="John Doe"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm text-gray-100">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full p-3 rounded bg-white border border-gray-700 focus:ring-2 focus:ring-secondary outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm text-gray-100">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full p-3 rounded bg-white border border-gray-700 focus:ring-2 focus:ring-secondary outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-secondary py-3 rounded font-semibold hover:bg-gray-600 transition duration-300 text-gray-200"
        >
          Register
        </button>
      </form>

      <div class="text-center mt-4">
          <p class="text-gray-400 text-sm">Already have an account?
<router-link to="/login" class="text-secondary hover:underline">Sign in here</router-link>
</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleRegister() {
      if (this.name && this.email && this.password) {
        console.log('Registering with:', this.name, this.email, this.password);
        alert('Registration successful');
      } else {
        alert('Please fill in all fields');
      }
    },
  },
};
</script>

<style scoped></style>

