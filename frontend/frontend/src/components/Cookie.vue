<template>
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- ✅ Fenêtre principale des cookies -->
      <div v-if="showCookieBanner" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full text-center">
          <h2 class="text-3xl font-bold text-gray-900">MediTrust et vos données</h2>
          <p class="mt-3 text-gray-600 text-sm leading-relaxed">
            Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience.
            Vous pouvez les accepter, les refuser ou choisir vos préférences.
          </p>
  
          <!-- ✅ Options des cookies -->
          <div class="mt-5 space-y-4 text-left">
            <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div>
                <label class="text-gray-800 font-medium">Cookies Nécessaires</label>
                <p class="text-xs text-gray-500">Essentiels au fonctionnement du site. Toujours activés.</p>
              </div>
              <span class="text-sm font-semibold text-gray-700">✅ Obligatoire</span>
            </div>
  
            <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div>
                <label class="text-gray-800 font-medium">Cookies Fonctionnels</label>
                <p class="text-xs text-gray-500">Permettent de personnaliser votre expérience.</p>
              </div>
              <button
                @click="toggleCookie('functional')"
                class="w-10 h-5 flex items-center bg-gray-300 rounded-full transition duration-300 relative"
                :class="{ 'bg-blue-600': cookies.functional }"
              >
                <span class="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                  :class="{ 'translate-x-5': cookies.functional }">
                </span>
              </button>
            </div>
  
            <div class="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div>
                <label class="text-gray-800 font-medium">Cookies de Performance</label>
                <p class="text-xs text-gray-500">Aident à améliorer les performances du site.</p>
              </div>
              <button
                @click="toggleCookie('performance')"
                class="w-10 h-5 flex items-center bg-gray-300 rounded-full transition duration-300 relative"
                :class="{ 'bg-blue-600': cookies.performance }"
              >
                <span class="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                  :class="{ 'translate-x-5': cookies.performance }">
                </span>
              </button>
            </div>
          </div>
  
          <!-- ✅ Boutons d'action -->
          <div class="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              @click="acceptAllCookies"
              class="w-full sm:w-auto flex-1 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
            >
              Accepter tout
            </button>
            <button
              @click="rejectAllCookies"
              class="w-full sm:w-auto flex-1 px-5 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-400 rounded-lg transition duration-300"
            >
              Refuser tout
            </button>
            <button
              @click="savePreferences"
              class="w-full sm:w-auto flex-1 px-5 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </transition>
  
    <!-- ✅ Deuxième fenêtre de confirmation après refus des cookies -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showRefusalMessage" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 class="text-2xl font-bold text-gray-900">Cookies refusés</h2>
          <p class="mt-3 text-gray-600 text-sm leading-relaxed">
            Vous avez refusé tous les cookies. Certaines fonctionnalités du site peuvent ne pas fonctionner correctement.
            Vous pouvez modifier vos préférences à tout moment.
          </p>
  
          <div class="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              @click="showCookieBanner = true; showRefusalMessage = false"
              class="w-full sm:w-auto flex-1 px-5 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-400 rounded-lg transition duration-300"
            >
              Modifier mes préférences
            </button>
            <button
              @click="closeRefusalMessage"
              class="w-full sm:w-auto flex-1 px-5 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const showCookieBanner = ref(false);
      const showRefusalMessage = ref(false);
      const cookies = ref({
        necessary: true,
        functional: false,
        performance: false,
      });
  
      // ✅ Vérifier les préférences de l'utilisateur
      onMounted(() => {
        const savedPreferences = localStorage.getItem("cookiePreferences");
        if (!savedPreferences) {
          showCookieBanner.value = true;
        } else {
          cookies.value = JSON.parse(savedPreferences);
        }
      });
  
      // ✅ Basculer un cookie ON/OFF
      const toggleCookie = (type) => {
        cookies.value[type] = !cookies.value[type];
      };
  
      // ✅ Accepter tous les cookies
      const acceptAllCookies = () => {
        cookies.value.functional = true;
        cookies.value.performance = true;
        savePreferences();
      };
  
      // ❌ Refuser tous les cookies (sauf les nécessaires)
      const rejectAllCookies = () => {
        cookies.value.functional = false;
        cookies.value.performance = false;
        savePreferences();
        showRefusalMessage.value = true;
      };
  
      // ✅ Sauvegarder les préférences et fermer la bannière
      const savePreferences = () => {
        localStorage.setItem("cookiePreferences", JSON.stringify(cookies.value));
        showCookieBanner.value = false;
      };
  
      // ✅ Fermer la deuxième fenêtre après refus
      const closeRefusalMessage = () => {
        showRefusalMessage.value = false;
      };
  
      return {
        showCookieBanner,
        showRefusalMessage,
        cookies,
        toggleCookie,
        acceptAllCookies,
        rejectAllCookies,
        savePreferences,
        closeRefusalMessage,
      };
    },
  };
  </script>