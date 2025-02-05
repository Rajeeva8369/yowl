<script setup>
import { ref } from "vue";
import { DocumentDuplicateIcon } from "@heroicons/vue/24/outline"; // Icône de copie

// ✅ Récupérer les props pour afficher le modal
const props = defineProps({
  isOpen: Boolean, // Contrôlé depuis HomePage.vue
});

// ✅ Événements pour fermer le modal
const emit = defineEmits(["update:isOpen"]);

// ✅ Lien à copier
const shareLink = ref("https://meditrust.com/share");

// ✅ État pour afficher "Copié !"
const isCopied = ref(false);

// ✅ Fonction pour copier le lien
const copyLink = async () => {
  if (!navigator.clipboard) {
    alert("❌ Votre navigateur ne supporte pas la copie automatique.");
    console.error("Clipboard API non disponible");
    return;
  }

  try {
    await navigator.clipboard.writeText(shareLink.value);
    isCopied.value = true; // ✅ Change le texte en "Copié !"

    setTimeout(() => {
      isCopied.value = false; // ✅ Réinitialise après 2 secondes
    }, 2000);
  } catch (err) {
    console.error("❌ Erreur lors de la copie :", err);
    alert("Impossible de copier le lien. Vérifiez les permissions de votre navigateur.");
  }
};
</script>

<template>
  <div>
    <!-- ✅ Bouton Share pour ouvrir le modal -->
    <button @click="emit('update:isOpen', true)" class="hover:text-white transition">
      Share
    </button>

    <!-- ✅ Modal de partage -->
    <div v-if="props.isOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 class="text-2xl font-bold text-gray-900">Partager le lien</h2>
        <p class="mt-2 text-gray-600">
          Toute personne ayant ce lien pourra voir le contenu.
        </p>

        <!-- ✅ Zone de copie du lien -->
        <div class="flex items-center mt-4 border border-gray-300 p-2 rounded-md">
          <input
            type="text"
            class="w-full px-2 text-gray-900 outline-none"
            :value="shareLink"
            readonly
          />
          <button @click="copyLink" class="ml-2 bg-gray-800 text-white px-4 py-1 rounded-lg flex items-center">
            <DocumentDuplicateIcon class="w-5 h-5 mr-1" />
            <span v-if="!isCopied">Copier</span>
            <span v-else class="text-green-400">✅ Copié !</span>
          </button>
        </div>

        <!-- ✅ Bouton pour fermer le modal -->
        <button @click="emit('update:isOpen', false)" class="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
