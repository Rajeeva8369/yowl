<template>
  <div class="flex flex-col min-h-screen bg-gray-950 text-white">
   

    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- Création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-white">Créer un post</h2>
        <textarea 
          v-model="newPostContent" 
          class="w-full p-4 mt-4 bg-gray-700 text-white rounded-lg border border-gray-600" 
          rows="4" 
          placeholder="What's on your mind?"
        ></textarea>
        <input 
          type="file" 
          @change="handleImageUpload" 
          class="mt-3 text-sm text-gray-400" 
          accept="image/*"
        />
        <!-- Prévisualisation de l'image -->
        <div v-if="imagePreview" class="mt-4">
          <img :src="imagePreview" class="max-h-48 rounded-lg object-cover" alt="Preview" />
        </div>
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
            :src="post.userImage || '/placeholder.svg'" 
            alt="User" 
            class="w-12 h-12 rounded-full border border-gray-700"
          />
          <div>
            <p class="font-semibold text-gray-200">{{ post.username }}</p>
            <p class="text-gray-500 text-sm">{{ formatDate(post.createdAt) }}</p>
          </div>
          
          <button 
            v-if="post.userId === user.id"
            @click="deletePost(post.id, index)" 
            class="ml-auto text-gray-400 hover:text-red-500 transition duration-200"
          >
            🗑️
          </button>
        </div>

        <!-- Contenu du post -->
        <p class="text-gray-300 mt-4">{{ post.content }}</p>
        <img 
          v-if="post.image" 
          :src="post.image" 
          class="rounded-lg max-h-80 w-full object-cover mt-4"
          alt="Post image"
        />

        <!-- Actions du post -->
        <div class="flex justify-around items-center mt-6 text-gray-400">
          <button @click="likePost(post.id, index)" class="hover:text-red-500 transition duration-200">
            ❤️ {{ post.likes }}
          </button>
          <button @click="toggleComments(index)" class="hover:text-blue-500 transition duration-200">
            💬 Comments ({{ post.comments.length }})
          </button>
          <button @click="sharePost(post.id)" class="hover:text-green-500 transition duration-200">
            🔗 Partager
          </button>
        </div>

        <!-- Section commentaires -->
        <div v-if="post.showCommentSection" class="mt-4 space-y-4">
          <div v-for="(comment, cIndex) in post.comments" :key="comment.id" 
               class="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
            <span class="text-gray-300">{{ comment.content }} - {{ comment.username }}</span>
            <button 
              v-if="comment.userId === user.id"
              @click="deleteComment(comment.id, index, cIndex)" 
              class="text-red-500 hover:text-red-700 transition duration-200"
            >
              🗑️
            </button>
          </div>
          
          <!-- Ajout de commentaire -->
          <div class="flex space-x-2">
            <input 
              v-model="post.newComment" 
              placeholder="Add a comment..." 
              class="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
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
    </main>

    <!-- Pagination -->
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
export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      newPostContent: '',
      newPostImage: null,
      imagePreview: null,
      errorMessage: '',
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0,
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('token') || null
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalPosts / this.pageSize)
    }
  },
  mounted() {
    if (!this.token || !this.user) {
      this.$router.push('/login')
      return
    }
    this.loadPosts()
  },
  methods: {
    async loadPosts(page = 1) {
      try {
        const response = await fetch(
          `http://localhost:1337/api/posts?populate[users_permissions_user][populate][0]=avatar&populate=image,comments.user&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${this.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (!response.ok) throw new Error('Échec du chargement des posts')

        const data = await response.json()
        this.totalPosts = data.meta.pagination.total
        this.currentPage = data.meta.pagination.page

        this.posts = data.data.map(post => {
          const userData = post.attributes.users_permissions_user?.data
          return {
            id: post.id,
            content: post.attributes.content,
            image: post.attributes.image?.data?.attributes?.url 
              ? `http://localhost:1337${post.attributes.image.data.attributes.url}` 
              : null,
            username: userData?.attributes?.username || 'Anonymous',
            userImage: userData?.attributes?.avatar?.data?.attributes?.url 
              ? `http://localhost:1337${userData.attributes.avatar.data.attributes.url}` 
              : null,
            createdAt: post.attributes.createdAt,
            comments: post.attributes.comments?.data.map(comment => ({
              id: comment.id,
              content: comment.attributes.content,
              userId: comment.attributes.user?.data?.id,
              username: comment.attributes.user?.data?.attributes?.username
            })) || [],
            likes: post.attributes.likes || 0,
            showCommentSection: false,
            newComment: '',
            userId: userData?.id
          }
        })
      } catch (error) {
        console.error('Erreur API:', error)
        this.errorMessage = 'Erreur lors du chargement des posts'
      }
    },

    async handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Prévisualisation
      this.imagePreview = URL.createObjectURL(file)
      this.newPostImage = file
      this.errorMessage = ''
    },

    async addPost() {
      if (!this.newPostContent.trim() && !this.newPostImage) {
        this.errorMessage = 'Le contenu ou une image est requis pour créer un post'
        return
      }

      try {
        const formData = new FormData()
        formData.append('data', JSON.stringify({
          content: this.newPostContent,
          users_permissions_user: this.user.id,
          likes: 0
        }))

        if (this.newPostImage) {
          formData.append('files.image', this.newPostImage, this.newPostImage.name)
        }

        const response = await fetch('http://localhost:1337/api/posts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: formData
        })

        if (!response.ok) throw new Error('Échec de la création du post')

        this.newPostContent = ''
        this.newPostImage = null
        this.imagePreview = null
        await this.loadPosts(1)
      } catch (error) {
        console.error('Erreur lors de la création du post:', error)
        this.errorMessage = 'Échec de la création du post'
      }
    },

    async deletePost(postId, index) {
      const post = this.posts[index]
      if (post.userId !== this.user.id) {
        alert('Vous ne pouvez supprimer que vos propres posts')
        return
      }

      if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) return

      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        if (!response.ok) throw new Error('Échec de la suppression du post')

        this.posts = this.posts.filter(p => p.id !== postId)
      } catch (error) {
        console.error('Erreur lors de la suppression du post:', error)
        alert('Une erreur est survenue lors de la suppression')
      }
    },

    async deleteComment(commentId, postIndex, commentIndex) {
      if (this.posts[postIndex].comments[commentIndex].userId !== this.user.id) {
        alert('Vous ne pouvez supprimer que vos propres commentaires')
        return
      }

      try {
        const response = await fetch(`http://localhost:1337/api/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        if (!response.ok) throw new Error('Échec de la suppression du commentaire')

        this.posts[postIndex].comments.splice(commentIndex, 1)
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error)
        alert('Une erreur est survenue lors de la suppression')
      }
    },

    async likePost(postId, index) {
      try {
        const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: { likes: this.posts[index].likes + 1 }
          })
        })

        if (!response.ok) throw new Error('Échec du like')

        this.posts[index].likes += 1
      } catch (error) {
        console.error('Erreur lors du like:', error)
      }
    },

    async addComment(postId, index) {
      if (!this.posts[index].newComment.trim()) return

      try {
        const response = await fetch('http://localhost:1337/api/comments', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              content: this.posts[index].newComment,
              post: postId,
              user: this.user.id
            }
          })
        })

        if (!response.ok) throw new Error('Échec de l\'ajout du commentaire')

        const newComment = await response.json()
        this.posts[index].comments.push({
          id: newComment.data.id,
          content: this.posts[index].newComment,
          userId: this.user.id,
          username: this.user.username
        })
        this.posts[index].newComment = ''
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error)
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'Date inconnue'
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    toggleComments(index) {
      this.posts[index].showCommentSection = !this.posts[index].showCommentSection
    },

    sharePost(postId) {
      const shareUrl = `${window.location.origin}/posts/${postId}`
      navigator.clipboard.writeText(shareUrl)
      alert('Lien copié dans le presse-papier !')
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage
        this.loadPosts(newPage)
      }
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
