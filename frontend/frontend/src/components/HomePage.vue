<script setup>
import { ref, onMounted } from "vue";
import { DocumentDuplicateIcon } from "@heroicons/vue/24/outline";

// ✅ États réactifs
const newPostContent = ref("");
const newPostImage = ref(null);
const posts = ref([]);
const isShareOpen = ref(false);
const shareLink = ref("https://meditrust.com/share");
const isCopied = ref(false);
const showCookieBanner = ref(false);
const showPremiumBanner = ref(false);

// ✅ Vérifier et charger l'état des cookies
const checkCookieConsent = () => {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    showCookieBanner.value = true; // Afficher la bannière si aucun consentement n'a été donné
  } else if (consent === "declined") {
    showPremiumBanner.value = true; // Afficher l'option premium si refusé
  }
};

// ✅ Accepter/refuser les cookies
const onAccept = () => {
  localStorage.setItem("cookieConsent", "accepted");
  showCookieBanner.value = false;
  showPremiumBanner.value = false;
};

const onDecline = () => {
  localStorage.setItem("cookieConsent", "declined");
  showCookieBanner.value = false;
  showPremiumBanner.value = true;
};

// ✅ Réinitialiser le consentement des cookies (Test depuis la console)
const resetCookies = () => {
  localStorage.removeItem("cookieConsent");
  location.reload();
};

// ✅ Charger les posts depuis `localStorage`
const loadPosts = () => {
  const storedPosts = localStorage.getItem("posts");

  // ✅ Posts initiaux qui ne peuvent pas être supprimés
  const defaultPosts = [
    {
      username: "Admin",
      timestamp: Date.now() - 86400000, // 1 jour avant
      content: "Bienvenue sur MediTrust ! Partagez vos pensées et opinions ici.",
      userImage: "https://via.placeholder.com/50",
      image: null,
      likes: 10,
      isLiked: false,
      comments: ["Merci !", "Super initiative."],
      newComment: "",
      showCommentSection: false,
      isPermanent: true, // Ne peut pas être supprimé
    },
    {
      username: "MediTrust Team",
      timestamp: Date.now() - 43200000, // 12 heures avant
      content: "N'oubliez pas de respecter les règles de la communauté 😊",
      userImage: "https://via.placeholder.com/50",
      image: null,
      likes: 5,
      isLiked: false,
      comments: ["Bonne idée !", "Je suis d'accord."],
      newComment: "",
      showCommentSection: false,
      isPermanent: true, // Ne peut pas être supprimé
    },
  ];

  posts.value = storedPosts ? JSON.parse(storedPosts) : defaultPosts;
};

// ✅ Sauvegarder les posts dans `localStorage`
const savePosts = () => {
  localStorage.setItem("posts", JSON.stringify(posts.value));
};

// ✅ Ajouter un post (seuls les nouveaux posts peuvent être supprimés)
const addPost = () => {
  if (newPostContent.value.trim() === "") return;

  const newPost = {
    username: "You",
    timestamp: Date.now(),
    content: newPostContent.value,
    userImage: "https://via.placeholder.com/50",
    image: newPostImage.value,
    likes: 0,
    isLiked: false,
    comments: [],
    newComment: "",
    showCommentSection: false,
    isPermanent: false, // Ce post peut être supprimé
  };

  posts.value.unshift(newPost);
  savePosts();
  newPostContent.value = "";
  newPostImage.value = null;
};

// ✅ Gérer l'upload d'une image pour un post
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      newPostImage.value = reader.result;
    };
  }
};

// ✅ Supprimer un post (empêcher la suppression des posts initiaux)
const deletePost = (index) => {
  if (!posts.value[index].isPermanent) {
    posts.value.splice(index, 1);
    savePosts();
  } else {
    alert("Ce post ne peut pas être supprimé !");
  }
};

// ✅ Supprimer un commentaire d'un post
const deleteComment = (postIndex, commentIndex) => {
  if (posts.value[postIndex] && posts.value[postIndex].comments[commentIndex]) {
    posts.value[postIndex].comments.splice(commentIndex, 1);
    savePosts();
  }
};

// ✅ Gérer les likes (ajouter/enlever)
const likePost = (index) => {
  posts.value[index].isLiked = !posts.value[index].isLiked;
  posts.value[index].likes += posts.value[index].isLiked ? 1 : -1;
  savePosts();
};

// ✅ Ouvrir/fermer la section des commentaires
const toggleComments = (index) => {
  posts.value[index].showCommentSection = !posts.value[index].showCommentSection;
};

// ✅ Ajouter un commentaire
const addComment = (index) => {
  if (posts.value[index].newComment.trim() === "") return;
  posts.value[index].comments.push(posts.value[index].newComment);
  posts.value[index].newComment = "";
  savePosts();
};

// ✅ Gérer le formatage du temps écoulé depuis la publication d'un post
const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

// ✅ Copier le lien de partage
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 2000);
  } catch (err) {
    alert("Impossible de copier le lien.");
  }
};

// ✅ Confirmer le refus des cookies
const confirmDecline = () => {
  showPremiumBanner.value = false; // Ferme la fenêtre Premium
  alert("Vous avez confirmé votre refus des cookies. Certaines fonctionnalités peuvent être limitées.");
};

// ✅ Charger les posts et vérifier les cookies au montage
onMounted(() => {
  checkCookieConsent();
  loadPosts();
});
</script>



<template>
  <div class="flex flex-col min-h-screen bg-gray-950 text-white">
    <!-- ✅ HEADER -->
    <header class="bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/logo.png" alt="MediTrust Logo" class="h-10" />
        <h1 class="text-3xl font-bold tracking-wide text-gray-200">MediTrust</h1>
      </div>
    </header>

    <!-- ✅ CONTENU PRINCIPAL -->
    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- ✅ Zone de création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg border">
        <textarea v-model="newPostContent" class="w-full p-4 bg-gray-700 text-white border rounded-lg" rows="4" placeholder="What's on your mind?"></textarea>
        <input type="file" @change="handleImageUpload" class="mt-3 text-sm text-gray-400" />
        <button @click="addPost" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg w-full">Post</button>
        
      </div>

      <!-- ✅ Liste des posts -->
      <div v-for="(post, index) in posts" :key="index" class="bg-gray-800 p-6 rounded-lg border">
        <div class="flex items-center space-x-4">
          <img :src="post.userImage" alt="User" class="w-12 h-12 rounded-full border-2 border-blue-500" />
          <div>
            <p class="font-semibold text-gray-200">{{ post.username }}</p>
            <p class="text-gray-500 text-sm">{{ timeAgo(post.timestamp) }}</p>
          </div>
        </div>
        <p class="text-gray-300">{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" class="rounded-lg border max-h-80 object-cover" />

        <div class="flex justify-around mt-4 text-gray-400">
          <button @click="likePost(index)" class="hover:text-blue-400">
            👍 <span>{{ post.likes }}</span>
          </button>
          <button @click="toggleComments(index)" class="hover:text-green-400">
            💬 Comments ({{ post.comments.length }})
          </button>
          <button @click="isShareOpen = true" class="hover:text-yellow-400">
            🔄 Share
          </button>
          <div class="flex justify-between items-center mt-4">
  <button @click="deletePost(index)" class="text-red-500 hover:text-red-700">
    🗑 Supprimer
  </button>
</div>

        </div>

        <!-- ✅ Section des commentaires -->
        <div v-if="post.showCommentSection" class="mt-4">
          <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="text-gray-300 bg-gray-700 p-2 rounded-lg shadow-md">
            {{ comment }}
          </div>
          <input v-model="post.newComment" placeholder="Write a comment..." class="w-full mt-2 p-2 bg-gray-700 text-white border rounded-lg" />
          <button @click="addComment(index)" class="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg">Comment</button>
          <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-md mt-2">
  <span class="text-gray-300">{{ comment }}</span>
  <button @click="deleteComment(index, cIndex)" class="text-red-400 hover:text-red-600">
    ❌
  </button>
</div>

        </div>
      </div>
    </main>

    <!-- ✅ FOOTER -->
    <footer class="bg-gray-900 text-gray-500 py-4 text-center mt-8 border-t">
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>

    <!-- ✅ POP-UP SHARE -->
    <div v-if="isShareOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg max-w-md text-center">
        <h2 class="text-2xl font-bold text-gray-900">Partager le lien</h2>
        <div class="flex items-center mt-4 border border-gray-300 p-2 rounded-md">
          <input type="text" class="w-full px-2 text-gray-900" v-model="shareLink" readonly />
          <button @click="copyLink" class="ml-2 bg-gray-800 text-white px-4 py-1 rounded-lg">
            <DocumentDuplicateIcon class="w-5 h-5 mr-1" /> Copier
          </button>
        </div>
        <button @click="isShareOpen = false" class="mt-4 bg-gray-400 text-white px-6 py-2 rounded-lg">Fermer</button>
      </div>
    </div>

    <!-- ✅ POP-UP COOKIES (Première fenêtre) -->
    <div v-if="showCookieBanner" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center">
        <h2 class="text-2xl font-bold text-gray-900">MediTrust et vos données</h2>
        <p class="mt-4 text-gray-700">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience.
          Vous pouvez accepter ou refuser ces cookies.
        </p>
        <div class="mt-6 flex flex-col gap-4">
          <button @click="onAccept" class="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Tout Accepter
          </button>
          <button @click="onDecline" class="bg-gray-400 text-white px-6 py-2 rounded-lg">
            Tout Refuser
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ POP-UP PREMIUM (Style TF1 avec grille des options) -->
    <div v-if="showPremiumBanner" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h2 class="text-2xl font-bold text-gray-900">Accès Premium Requis</h2>
        <p class="mt-4 text-gray-700">
          Vous avez refusé les cookies. Pour accéder gratuitement aux contenus, vous devez les accepter.
          Sinon, profitez d'une expérience sans publicité avec MediTrust Premium.
        </p>

        <!-- ✅ Grille des options (comme TF1) -->
        <table class="w-full mt-4 text-gray-700 border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border">Option</th>
              <th class="p-2 border">Tout Refuser</th>
              <th class="p-2 border">Tout Accepter</th>
              <th class="p-2 border">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 border">Accès aux extraits</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
            </tr>
            <tr>
              <td class="p-2 border">Accès complet</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
            </tr>
            <tr>
              <td class="p-2 border">Sans publicité</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">✅</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-6 flex flex-col gap-4">
          <button @click="onAccept" class="bg-sky-600 text-white px-6 py-2 rounded-lg">
            Modifier et tout accepter
          </button>
          <button @click="confirmDecline" class="bg-gray-400 text-white px-6 py-2 rounded-lg">
            Confirmer votre refus
          </button>
          <button class="bg-emerald-500 text-white px-6 py-2 rounded-lg">
            Passer à Premium - 5,99€/mois
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Bouton pour réinitialiser les cookies -->
<div class="fixed bottom-5 right-5">
  <button @click="resetCookies" class="bg-red-500 text-white px-4 py-2 rounded-lg">
    Réinitialiser les cookies
  </button>
</div>
</template>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
</style>
