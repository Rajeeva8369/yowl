<template>
  <div class="flex flex-col min-h-screen bg-gray-950 text-white">
    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      
      <!-- ✅ Zone de création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-white">Créer un post</h2>
        <textarea 
          v-model="newPostContent" 
          class="w-full p-4 bg-gray-700 text-white rounded-lg" 
          rows="4" 
          placeholder="What's on your mind?"
        ></textarea>
        <input type="file" @change="handleImageUpload" class="mt-3 text-sm text-gray-400" />
        <button @click="addPost" class="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg w-full">
          Post
        </button>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </div>

      <!-- ✅ Affichage des posts paginés -->
      <div v-for="(post, index) in posts" :key="index" class="bg-gray-800 p-6 rounded-lg">
        <div class="flex items-center space-x-4">
          <img :src="post.userImage || 'https://via.placeholder.com/50'" 
               alt="User" class="w-12 h-12 rounded-full border" />
          <div>
            <p class="font-semibold text-gray-200">{{ post.username || "Anonymous" }}</p>
            <p class="text-gray-500 text-sm">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
        <p class="text-gray-300 mt-2">{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" class="rounded-lg max-h-80 object-cover mt-2" />

        <!-- ✅ Actions sur le post -->
        <div class="flex justify-around items-center mt-4 text-gray-400">
          <button @click="likePost(post.id, index)" class="hover:text-red-700">
            ♥ {{ post.likes }}
          </button>
          <button @click="toggleComments(index)" class="hover:text-black">
            Comments ({{ post.comments.length }})
          </button>
          <button @click="sharePost(post.id)" class="hover:text-blue-400">
            ➦ Partager
          </button>
        </div>

        <!-- ✅ Section des commentaires -->
        <div v-if="post.showCommentSection" class="mt-4">
          <div v-for="(comment, cIndex) in post.comments" :key="cIndex" class="text-gray-300 bg-gray-700 p-2 rounded-lg shadow-md">
            {{ comment.content }}
          </div>
          <input v-model="post.newComment" placeholder="Add a comment..." class="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg" />
          <button @click="addComment(post.id, index)" class="mt-2 bg-black text-white px-4 py-2 rounded-lg">Comment</button>
        </div>
      </div>
    </main>

    <!-- ✅ Footer -->
    <footer class="bg-gray-900 text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-800">
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const posts = ref([]);
    const newPostContent = ref("");
    const newPostImage = ref(null);
    const errorMessage = ref("");
    const router = useRouter();

    // ✅ Récupérer le token et l'utilisateur connecté
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      console.warn("❌ Aucun utilisateur connecté. Redirection vers login.");
      router.push("/login");
    }

    // ✅ Charger les posts depuis Strapi
    const loadPosts = async () => {
      try {
        console.log("📡 Chargement des posts avec le token:", `Bearer ${token}`);
        const response = await fetch("http://localhost:1337/api/posts?populate=comments,users_permissions_user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("❌ Échec du chargement des posts");

        const data = await response.json();
        posts.value = data.data.map(post => ({
          id: post.id,
          content: post.attributes.content,
          image: post.attributes.image?.url || null,
          username: post.attributes.users_permissions_user?.username || "Anonymous",
          userImage: post.attributes.users_permissions_user?.avatar?.url || null,
          createdAt: post.attributes.createdAt,
          comments: post.attributes.comments || [],
          likes: post.attributes.likes || 0, // ✅ Correction du chargement des likes
          showCommentSection: false,
          newComment: "",
        }));
      } catch (error) {
        console.error("❌ Erreur API:", error);
      }
    };

    // ✅ Ajouter un like
    const likePost = async (postId, index) => {
      try {
        console.log(`👍 Like ajouté au post ${postId}`);

        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { likes: posts.value[index].likes + 1 }, // ✅ Mise à jour des likes
          }),
        });

        if (!response.ok) throw new Error("❌ Échec du like");

        posts.value[index].likes += 1;
      } catch (error) {
        console.error("❌ Erreur lors du like:", error);
      }
    };

    // ✅ Ajouter un commentaire
    const addComment = async (postId, index) => {
      if (!posts.value[index].newComment.trim()) return;

      try {
        console.log(`📝 Ajout du commentaire: ${posts.value[index].newComment}`);

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

        if (!response.ok) throw new Error("❌ Échec de l'ajout du commentaire");

        // ✅ Mise à jour locale du commentaire sans recharger
        posts.value[index].comments.push({ content: posts.value[index].newComment });
        posts.value[index].newComment = "";
      } catch (error) {
        console.error("❌ Erreur lors de l'ajout du commentaire:", error);
      }
    };

    // ✅ Ajouter un post
    const addPost = async () => {
      errorMessage.value = "";

      if (!newPostContent.value.trim()) {
        errorMessage.value = "Le contenu ne peut pas être vide.";
        return;
      }

      try {
        const response = await fetch("http://localhost:1337/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              content: newPostContent.value,
              users_permissions_user: user.id,
              image: newPostImage.value,
            },
          }),
        });

        if (!response.ok) throw new Error("❌ Échec de la création du post");

        console.log("✅ Post créé avec succès !");
        newPostContent.value = "";
        loadPosts(); // ✅ Recharger la liste des posts après ajout
      } catch (error) {
        console.error("❌ Erreur lors de la création du post:", error);
        errorMessage.value = "Échec de la création du post.";
      }
    };

    // ✅ Formater la date des posts
    const formatDate = (dateString) => {
      if (!dateString) return "Date inconnue";
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // ✅ Gérer l'upload d'une image
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("files", file);

      try {
        const response = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) throw new Error("❌ Échec de l'upload de l'image");

        const data = await response.json();
        newPostImage.value = data[0].url;
      } catch (error) {
        console.error("❌ Erreur d'upload:", error);
      }
    };

    // ✅ Afficher/masquer la section des commentaires
    const toggleComments = (index) => {
      posts.value[index].showCommentSection = !posts.value[index].showCommentSection;
    };

    // ✅ Partager un post
    const sharePost = (postId) => {
      const shareUrl = `http://localhost:5173/posts/${postId}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Lien copié !");
    };

    onMounted(() => {
      loadPosts();
    });

    return {
      posts,
      newPostContent,
      newPostImage,
      errorMessage,
      addPost,
      handleImageUpload,
      formatDate,
      addComment,
      likePost,
      toggleComments,
      sharePost,
    };
  },
};
</script>
