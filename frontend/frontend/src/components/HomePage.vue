<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const newPostContent = ref("");
const newPostImage = ref(null);
const posts = ref([]);
const isOpen = ref(false);
const shareLink = ref("https://meditrust.com/share");
const isCopied = ref(false);
const showCookieBanner = ref(false);
const showPremiumBanner = ref(false);



const checkCookieConsent = () => {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    showCookieBanner.value = true;
  } else if (consent === "declined") {
    showPremiumBanner.value = true; 
  }
};

const onAccept = () => {
  localStorage.setItem("cookieConsent", "true");
  showCookieBanner.value = false;
  showPremiumBanner.value = false;
  console.log("✓ Cookies acceptés !");
};

const onDecline = () => {
  localStorage.setItem("cookieConsent", "false");
  showCookieBanner.value = false;
  showPremiumBanner.value = true;
  console.log("☓ Cookies refusés !");
};
const resetCookies = () => {
  localStorage.removeItem("cookieConsent");
  location.reload();
};
const loadPosts = () => {
  const storedPosts = localStorage.getItem("posts");
}
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

const confirmDecline = () => {
  showPremiumBanner.value = false;
  console.log("✓ Refus des cookies confirmé !");
};
onMounted(() => {
  checkCookieConsent();
  loadPosts();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-950 text-white">

    <!-- ✅ CONTENU PRINCIPAL -->
    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- ✅ Zone de création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <textarea v-model="newPostContent" class="w-full p-4 bg-gray-700 text-white rounded-lg" rows="4" placeholder="What's on your mind?"></textarea>
        <input type="file" @change="handleImageUpload" class="mt-3 text-sm text-gray-400" />
        <button @click="addPost" class="mt-4 bg-black text-white px-6 py-2 rounded-lg w-full">Post</button>
        
      </div>

      <!-- ✅ Liste des posts -->
      <div v-for="(post, index) in posts" :key="index" class="bg-gray-800 p-6 rounded-lg">
        <div class="flex items-center space-x-4">
          <img :src="post.userImage" alt="User" class="w-12 h-12 rounded-full border" />
          <div>
            <p class="font-semibold text-gray-200">{{ post.username }}</p>
            <p class="text-gray-500 text-sm">{{ timeAgo(post.timestamp) }}</p>
          </div>
        </div>
        <p class="text-gray-300">{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" class="rounded-lg max-h-80 object-cover" />

        <div class="flex justify-around items-center mt-4 text-gray-400">
          <button @click="likePost(index)" class="hover:text-red-700">
            ⁠♡ <span>{{ post.likes }}</span>
          </button>
          <button @click="toggleComments(index)" class="hover:text-black">
            Comments ({{ post.comments.length }})
          </button>
          <button @click="isOpen = true" class="hover:text-blue-400">
            ➦
          </button>
 
        </div>

        <div v-if="post.showCommentSection" class="mt-4">
          <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="text-gray-300 bg-gray-700 p-2 rounded-lg shadow-md">
            {{ comment }}
          </div>
          <input v-model="post.newComment" placeholder="Add a comment..." class="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg" />
          <button @click="addComment(index)" class="mt-2 bg-black text-white px-4 py-2 rounded-lg">Comment</button>
          <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-md mt-2">
  <span class="text-gray-300">{{ comment }}</span>
  <button @click="deleteComment(index, cIndex)" class="text-gray-200 hover:text-red-600">
    ×
  </button>
</div>

        </div>
      </div>
    </main>

    <footer class="bg-gray-900 text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-800">
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>
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

    <div v-if="showPremiumBanner" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h2 class="text-2xl font-bold text-gray-900">Accès Premium Requis</h2>
        <p class="mt-4 text-gray-700">
          Vous avez refusé les cookies. Pour accéder gratuitement aux contenus, vous devez les accepter.
          Sinon, profitez d'une expérience sans publicité avec MediTrust Premium.
        </p>

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
              <td class="p-2 border">✓</td>
              <td class="p-2 border">✓</td>
              <td class="p-2 border">✓</td>
            </tr>
            <tr>
              <td class="p-2 border">Accès complet</td>
              <td class="p-2 border">☓</td>
              <td class="p-2 border">✓</td>
              <td class="p-2 border">✓</td>
            </tr>
            <tr>
              <td class="p-2 border">Sans publicité</td>
              <td class="p-2 border">☓</td>
              <td class="p-2 border">☓</td>
              <td class="p-2 border">✓</td>
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
