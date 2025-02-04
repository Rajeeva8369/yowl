<script setup>
import { ref } from "vue";
import { DocumentDuplicateIcon } from "@heroicons/vue/24/outline"; // Import de l'icône

// État du popup
const isOpen = ref(false);

// Fonction pour copier le lien
const copyLink = () => {
  navigator.clipboard.writeText("https://ui.shadcn.com/docs/installation");
  alert("Lien copié !");
};
</script>

<template>
  <div>
    <button @click="isOpen = true" class="hover:text-white transition">
      Share
    </button>

    <!-- Modal de partage -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 class="text-2xl font-bold text-gray-900">Partager le lien</h2>
        <p class="mt-2 text-gray-600">
          Toute personne ayant ce lien pourra voir le contenu.
        </p>
        <div class="flex items-center mt-4 border border-gray-300 p-2 rounded-md">
          <input
            type="text"
            class="w-full px-2 text-gray-900 outline-none"
            value="https://ui.shadcn.com/docs/installation"
            readonly
          />
          <button @click="copyLink" class="ml-2 bg-gray-800 text-white px-4 py-1 rounded-lg flex items-center">
            <DocumentDuplicateIcon class="w-5 h-5 mr-1" />
            Copier
          </button>
        </div>
        <button @click="isOpen = false" class="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
