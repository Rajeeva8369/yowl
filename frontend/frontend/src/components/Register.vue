<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
    <div class="w-full max-w-lg bg-gray-800 bg-opacity-80 rounded-3xl shadow-2xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-white">Create an Account</h1>
        <p class="text-gray-400 mt-2 text-lg">Sign up to access MediTrust</p>
      </div>

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
          <label for="birthDate" class="block text-sm font-medium text-gray-300">Date de naissance</label>
          <input
            v-model="birthDate"
            type="date"
            id="birthDate"
            required
            @change="validateAge"
            class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
          />
          <p v-if="ageError" class="text-red-500 text-sm mt-1">{{ ageError }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            @input="validatePassword"
            class="w-full px-4 py-3 mt-1 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
            placeholder="••••••••"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg"
        >
          Register
        </button>
      </form>

     
      <div v-if="errorMessage" class="text-red-500 text-center mt-2">
        {{ errorMessage }}
      </div>

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
    const birthDate = ref("");
    const password = ref("");
    const ageError = ref("");
    const passwordError = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const validateAge = () => {
      if (!birthDate.value) return;
      const birthYear = new Date(birthDate.value).getFullYear();
      const today = new Date();
      const age = today.getFullYear() - birthYear;

      if (age < 16) {
        ageError.value = "Vous devez avoir au moins 16 ans pour vous inscrire.";
      } else {
        ageError.value = "";
      }
    };

    const validatePassword = () => {
      if (!password.value) return;
      const birthYear = birthDate.value ? new Date(birthDate.value).getFullYear().toString() : "";

      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password.value)) {
        passwordError.value =
          "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.";
        return;
      }

      if (birthYear && password.value.includes(birthYear)) {
        passwordError.value = "Le mot de passe ne doit pas contenir votre année de naissance.";
        return;
      }

      passwordError.value = "";
    };

    const handleRegister = async () => {
      if (ageError.value || passwordError.value) return;

      try {
        console.log("🔄 Tentative d'inscription...");

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
        console.log("🔍 Réponse Strapi :", data);

        if (response.ok && data.jwt) {
          console.log("✅ Inscription réussie !");
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user", JSON.stringify(data.user));

          router.push("/profile");
        } else {
          console.error("❌ Erreur API Strapi :", data);
          errorMessage.value = data.error?.message || "Échec de l'inscription.";
        }
      } catch (error) {
        console.error("❌ Erreur lors de l'inscription :", error);
        errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
      }
    };

    return {
      username,
      email,
      birthDate,
      password,
      ageError,
      passwordError,
      errorMessage,
      validateAge,
      validatePassword,
      handleRegister,
    };
  },
};
</script>
