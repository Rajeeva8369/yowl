<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/logo.png" alt="MediTrust Logo" class="h-10" />
        <h1 class="text-3xl font-bold tracking-wide">MediTrust</h1>
      </div>
      <router-link to="/Parameter">
        <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition border border-gray-600">
          Account
        </button>
      </router-link>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- Post Input -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <textarea
          class="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows="4"
          placeholder="What's on your mind?"
        ></textarea>
        <button class="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition w-full border border-gray-600">
          Post
        </button>
      </div>

      <!-- Feed -->
      <div class="space-y-6">
        <div class="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 border border-gray-700">
          <div class="flex items-center space-x-4">
            <img src="https://yt3.googleusercontent.com/gupO1lvHk2XOg82UrvkG0lFFY8iw7r6y0HcKjaoOOWilFxjcO_8vQbgXduHVtLBsv932TymLjA=s900-c-k-c0x00ffffff-no-rj"
              alt="User" class="w-12 h-12 rounded-full border-2 border-gray-500" />
            <div>
              <p class="font-semibold text-gray-200">TF1</p>
              <p class="text-gray-500 text-sm">2 hours ago</p>
            </div>
          </div>
          <p class="text-gray-300">Trêve à Gaza : Israël confirme avoir libéré 200 détenus, les quatre otages israéliennes dans un "état stable"</p>
          <img src="https://i.cbc.ca/1.7433079.1737150061!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/gaza.jpg?im=Resize%3D780"
            class="rounded-lg border border-gray-600" />
          <div class="flex justify-around mt-4 text-gray-400">
            <button class="hover:text-white transition">Like</button>
            <button class="hover:text-white transition">Comment</button>
            <button class="hover:text-white transition">Share</button>
          </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 border border-gray-700">
          <div class="flex items-center space-x-4">
            <img src="https://yt3.ggpht.com/-uYnyeu0wFpQ/AAAAAAAAAAI/AAAAAAAAAAA/VU2Ct3J_ZQw/s900-c-k-no/photo.jpg"
              alt="User" class="w-12 h-12 rounded-full border-2 border-gray-500" />
            <div>
              <p class="font-semibold text-gray-200">Sky News</p>
              <p class="text-gray-500 text-sm">4 hours ago</p>
            </div>
          </div>
          <p class="text-gray-300">Binotto and the Audi project: "It will be a long journey"</p>
          <img src="https://cdn-1.motorsport.com/images/amp/YMd98vv2/s800/mattia-binotto-directeur-des-o.webp"
            class="rounded-lg border border-gray-600" />
          <div class="flex justify-around mt-4 text-gray-400">
            <button class="hover:text-white transition">Like</button>
            <button class="hover:text-white transition">Comment</button>
            <button class="hover:text-white transition">Share</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-800">
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
</style>
