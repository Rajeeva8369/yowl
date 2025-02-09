<script setup>
import { ref } from 'vue'
import { Share2Icon, CopyIcon, XIcon } from 'lucide-vue-next'

const props = defineProps({
  shareLink: {
    type: String,
    required: true,
    default: 'https://example.com/share'
  }
})

const isOpen = ref(false)
const isCopied = ref(false)

// Copy link to clipboard
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.shareLink)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    alert('Impossible de copier le lien')
  }
}

// Share handlers
const shareWhatsApp = () => {
  const url = `https://wa.me/?text=${encodeURIComponent(props.shareLink)}`
  window.open(url, '_blank')
}

const shareInstagram = () => {
  window.open('https://www.instagram.com/direct/new/', '_blank')
}

const shareNative = async () => {
  if (!navigator.share) {
    alert('Le partage natif n\'est pas supporté sur ce navigateur')
    return
  }

  try {
    await navigator.share({
      title: 'Regarde ça !',
      text: 'Découvrez ce lien incroyable 👇',
      url: props.shareLink
    })
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Erreur de partage:', err)
    }
  }
}
</script>

<template>
  <div>
    <!-- Share trigger button -->
    <button
      @click="isOpen = true"
      class="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
    >
      <Share2Icon class="w-5 h-5" />
      <span>Partager</span>
    </button>

    <!-- Modal backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="isOpen = false"
    >
      <!-- Modal content -->
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 relative">
        <!-- Close button -->
        <button
          @click="isOpen = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon class="w-5 h-5" />
        </button>

        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          Partager ce lien
        </h2>

        <!-- Copy link section -->
        <div class="flex items-center gap-2 mb-4">
          <input
            type="text"
            :value="shareLink"
            readonly
            class="flex-1 px-3 py-2 border rounded-lg text-gray-600 bg-gray-50"
          />
          <button
            @click="copyLink"
            class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <CopyIcon class="w-4 h-4" />
            <span>Copier</span>
          </button>
        </div>

        <!-- Copy confirmation -->
        <div
          v-if="isCopied"
          class="text-green-600 text-sm text-center mb-4"
        >
          ✅ Lien copié dans le presse-papier !
        </div>

        <!-- Share buttons -->
        <div class="grid grid-cols-3 gap-3">
          <button
            @click="shareWhatsApp"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </button>
          <button
            @click="shareInstagram"
            class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Instagram
          </button>
          <button
            @click="shareNative"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>