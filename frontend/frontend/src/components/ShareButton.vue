<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const shareLink = ref(props.shareLink);
const isCopied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 2000);
  } catch (err) {
    alert("Impossible de copier le lien.");
  }
};

const shareWhatsApp = () => {
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareLink.value)}`;
  window.open(whatsappURL, "_blank");
};

const shareInstagram = () => {
  const instagramURL = `https://www.instagram.com/direct/new/`;
  window.open(instagramURL, "_blank");
};

const shareNative = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Regarde ça !",
        text: "Découvrez ce lien incroyable 👇",
        url: shareLink.value,
      })
      .catch((error) => console.error("Erreur de partage:", error));
  } else {
    alert("Le partage natif n'est pas supporté sur ce navigateur.");
  }
};
</script>

<template>
  <div>
    <button @click="isOpen = true" class="hover:text-blue-400 transition">
      ➦
    </button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md text-center relative">
        <button @click="isOpen = false" class="absolute top-4 right-4">
          <XIcon class="w-6 h-6 text-gray-600" />
        </button>

        <h2 class="text-2xl font-bold text-gray-900">Partager le lien</h2>

        <div class="flex items-center mt-4 border border-gray-300 p-2 rounded-md">
          <input type="text" class="w-full px-2 text-gray-900 bg-transparent" v-model="shareLink" readonly />
          <button @click="copyLink" class="ml-2 bg-gray-800 text-white px-4 py-1 rounded-lg flex items-center">
            <DocumentDuplicateIcon class="w-5 h-5 mr-1" />
            Copier
          </button>
        </div>

        <p v-if="isCopied" class="text-green-500 mt-2">Lien copié ! ✅</p>

        <div class="flex justify-between mt-4 space-x-2">
          <button @click="shareWhatsApp" class="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
            WhatsApp
          </button>
          <button @click="shareInstagram" class="bg-pink-500 text-white px-4 py-2 rounded-lg w-full">
            Instagram
          </button>
          <button @click="shareNative" class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Contact
          </button>
        </div>

        <button @click="isOpen = false" class="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
