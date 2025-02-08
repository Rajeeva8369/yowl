<template>
  <div class="flex flex-col min-h-screen bg-gray-950 text-white">
   

    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- Zone de création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-white">Créer un post</h2>
        <textarea 
          v-model="newPostContent" 
          class="w-full p-4 mt-4 bg-gray-700 text-white rounded-lg" 
          rows="4" 
          placeholder="What's on your mind?"
        ></textarea>
        <input 
          type="file" 
          @change="handleImageUpload" 
          class="mt-3 text-sm text-gray-400" 
          accept="image/*"
        />
        <button 
          @click="addPost" 
          class="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg w-full transition duration-200"
        >
          Post
        </button>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </div>

      <!-- Liste des posts -->
      <div v-for="(post, index) in posts" :key="post.id" class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <!-- En-tête du post -->
        <div class="flex items-center space-x-4">
          <img 
            :src="post.userImage || 'https://via.placeholder.com/50'" 
            alt="User" 
            class="w-12 h-12 rounded-full border border-gray-700"
          />
          <div>
            <p class="font-semibold text-gray-200">{{ post.username }}</p>
            <p class="text-gray-500 text-sm">{{ formatDate(post.createdAt) }}</p>
          </div>
          <!-- Bouton de suppression si c'est le post de l'utilisateur -->
          <button 
            v-if="String(post.userId) === String(user.id)"
            @click="deletePost(post.id, index)" 
            class="ml-auto text-gray-400 hover:text-red-500 transition duration-200"
          >
            🗑 Delete
          </button>
        </div>

        <!-- Contenu du post -->
        <p class="text-gray-300 mt-4">{{ post.content }}</p>
        <img 
          v-if="post.image" 
          :src="`http://localhost:1337${post.image}`" 
          class="rounded-lg max-h-80 w-full object-cover mt-4"
          alt="Post image"
        />

        <!-- Actions sur le post -->
        <div class="flex justify-around items-center mt-6 text-gray-400">
          <button @click="likePost(post.id, index)" class="hover:text-red-500 transition duration-200">
            ♥ {{ post.likes }}
          </button>
          <button @click="toggleComments(index)" class="hover:text-blue-500 transition duration-200">
            💬 Comments ({{ post.comments.length }})
          </button>
          <button @click="sharePost(post.id)" class="hover:text-green-500 transition duration-200">
            ➦ Partager
          </button>
        </div>

        <!-- Section des commentaires -->
        <div v-if="post.showCommentSection" class="mt-4 space-y-4">
          <div v-for="(comment, cIndex) in post.comments" :key="comment.id" 
               class="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
            <span class="text-gray-300">{{ comment.content }}</span>
            <button 
              v-if="String(comment.userId) === String(user.id)"
              @click="deleteComment(comment.id, index, cIndex)" 
              class="text-red-500 hover:text-red-700 transition duration-200"
            >
              🗑
            </button>
          </div>
          <!-- Formulaire d'ajout de commentaire -->
          <div class="flex space-x-2">
            <input 
              v-model="post.newComment" 
              placeholder="Add a comment..." 
              class="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              @click="addComment(post.id, index)" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <!-- Message si aucun post -->
      <div v-if="posts.length === 0" class="text-center text-gray-500 py-8">
        Aucun post à afficher
      </div>
    </main>

    <!-- Footer avec pagination -->
    <footer class="bg-gray-900 text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-800">
      <div class="flex justify-center items-center space-x-4 mb-4">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition duration-200"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition duration-200"
        >
          Next
        </button>
      </div>
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const posts = ref([]);
    const newPostContent = ref("");
    const newPostImage = ref(null);
    const errorMessage = ref("");
    const router = useRouter();

    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalPosts = ref(0);

    const totalPages = computed(() => Math.ceil(totalPosts.value / pageSize.value));

    // Récupérer le token et l'utilisateur connecté
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      console.warn("❌ Aucun utilisateur connecté. Redirection vers login.");
      router.push("/login");
      return;
    }

    // Charger les posts depuis Strapi avec pagination
    const loadPosts = async (page = 1) => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/posts?populate[users_permissions_user][populate][0]=avatar&populate=image,comments.user&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize.value}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("❌ Échec du chargement des posts");

        const data = await response.json();
        totalPosts.value = data.meta.pagination.total;
        currentPage.value = data.meta.pagination.page;

        posts.value = data.data.map(post => {
          const userData = post.attributes.users_permissions_user?.data;
          return {
            id: post.id,
            content: post.attributes.content,
            image: post.attributes.image?.data?.attributes?.url || null,
            username: userData?.attributes?.username || "Anonymous",
            userImage: userData?.attributes?.avatar?.data?.attributes?.url || null,
            createdAt: post.attributes.createdAt,
            comments: post.attributes.comments?.data.map(comment => ({
              id: comment.id,
              content: comment.attributes.content,
              userId: comment.attributes.user?.data?.id,
              username: comment.attributes.user?.data?.attributes?.username
            })) || [],
            likes: post.attributes.likes || 0,
            showCommentSection: false,
            newComment: "",
            userId: userData?.id
          };
        });
      } catch (error) {
        console.error("❌ Erreur API:", error);
        errorMessage.value = "Erreur lors du chargement des posts";
      }
    };

    // Gérer l'upload d'image
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('files', file);

        const uploadResponse = await fetch('http://localhost:1337/api/images', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error('Échec de l\'upload de l\'image');

        const uploadData = await uploadResponse.json();
        newPostImage.value = uploadData[0].id;
      } catch (error) {
        console.error('❌ Erreur lors de l\'upload de l\'image:', error);
        errorMessage.value = "Échec de l'upload de l'image";
      }
    };

    // Ajouter un post
    const addPost = async () => {
      errorMessage.value = "";

      if (!newPostContent.value.trim()) {
        errorMessage.value = "Le contenu ne peut pas être vide";
        return;
      }

      try {
        const postData = {
          data: {
            content: newPostContent.value,
            users_permissions_user: user.id,
            image: newPostImage.value,
            likes: 0
          }
        };

        const response = await fetch("http://localhost:1337/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) throw new Error("Échec de la création du post");

        newPostContent.value = "";
        newPostImage.value = null;
        await loadPosts(1);
      } catch (error) {
        console.error("❌ Erreur lors de la création du post:", error);
        errorMessage.value = "Échec de la création du post";
      }
    };

    // Supprimer un post
    const deletePost = async (postId, index) => {
      const post = posts.value[index];
      
      if (String(post.userId) !== String(user.id)) {
        alert("Vous ne pouvez supprimer que vos propres posts");
        return;
      }

      if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Échec de la suppression du post");

        posts.value = posts.value.filter(p => p.id !== postId);
      } catch (error) {
        console.error("❌ Erreur lors de la suppression du post:", error);
        alert("Une erreur est survenue lors de la suppression");
      }
    };

    // Supprimer un commentaire
    const deleteComment = async (commentId, postIndex, commentIndex) => {
      if (String(posts.value[postIndex].comments[commentIndex].userId) !== String(user.id)) {
        alert("Vous ne pouvez supprimer que vos propres commentaires");
        return;
      }

      try {
        const response = await fetch(`http://localhost:1337/api/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Échec de la suppression du commentaire");

        posts.value[postIndex].comments.splice(commentIndex, 1);
      } catch (error) {
        console.error("❌ Erreur lors de la suppression du commentaire:", error);
        alert("Une erreur est survenue lors de la suppression");
      }
    };

    // Ajouter un like
    const likePost = async (postId, index) => {
      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { likes: posts.value[index].likes + 1 },
          }),
        });

        if (!response.ok) throw new Error("Échec du like");

        posts.value[index].likes += 1;
      } catch (error) {
        console.error("❌ Erreur lors du like:", error);
      }
    };

    // Ajouter un commentaire
    const addComment = async (postId, index) => {
      if (!posts.value[index].newComment.trim()) return;

      try {
        const response = await fetch("http://localhost:1337/api/comments", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              content: posts.value[index].newComment,
              post: postId,
              user: user.id,
            },
          }),
        });

        if (!response.ok) throw new Error("Échec de l'ajout du commentaire");

        const newComment = await response.json();
        posts.value[index].comments.push({
          id: newComment.data.id,
          content: posts.value[index].newComment,
          userId: user.id,
          username: user.username
        });
        posts.value[index].newComment = "";
      } catch (error) {
        console.error("❌ Erreur lors de l'ajout du commentaire:", error);
      }
    };

    // Formater la date
    const formatDate = (dateString) => {
      if (!dateString) return "Date inconnue";
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };

    // Afficher/masquer les commentaires
    const toggleComments = (index) => {
      posts.value[index].showCommentSection = !posts.value[index].showCommentSection;
    };

    // Partager un post
    const sharePost = (postId) => {
      const shareUrl = `${window.location.origin}/posts/${postId}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Lien copié dans le presse-papier !");
    };

    // Changer de page
    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
        loadPosts(newPage);
      }
    };

    onMounted(() => {
      loadPosts();
    });

    return {
      posts,
      newPostContent,
      newPostImage,
      errorMessage,
      user,
      currentPage,
      totalPages,
      addPost,
      deletePost,
      deleteComment,
      likePost,
      addComment,
      formatDate,
      toggleComments,
      sharePost,
      changePage,
      handleImageUpload,
    };
  },
};
</script>