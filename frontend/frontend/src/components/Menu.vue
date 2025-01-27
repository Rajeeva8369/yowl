<template>
    <div class="flex flex-col h-screen bg-gray-100">
  
      <header class="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold">MySocial</h1>
          <div class="space-x-4">
            <button class="bg-white text-blue-600 px-4 py-2 rounded-lg">Log In</button>
            <button class="bg-white text-blue-600 px-4 py-2 rounded-lg">Sign Up</button>
          </div>
        </div>
      </header>
  
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-md p-6 space-y-6">
          <h2 class="text-xl font-semibold text-gray-700">Menu</h2>
          <ul class="space-y-4">
            <li><a href="#" class="text-gray-600 hover:text-blue-600">Home</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600">Messages</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600">Notifications</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600">Profile</a></li>
          </ul>
        </aside>
  
        <!-- Main Content Area -->
        <main class="flex-1 p-6 overflow-auto space-y-8">
          <!-- New Post Section -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <textarea
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="What's on your mind?"
            ></textarea>
            <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Post</button>
          </div>
  
          <!-- Posts Feed -->
          <div class="space-y-6">
            <!-- Post 1 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="User"
                  class="w-12 h-12 rounded-full border-2 border-gray-300" />
                <div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-gray-600 text-sm">2 hours ago</p>
                </div>
              </div>
              <p class="mt-4 text-gray-800">This is my first post on this social platform! Excited to share more with you all.</p>
              <div class="flex space-x-6 mt-4 text-gray-500">
                <button class="hover:text-blue-600">Like</button>
                <button class="hover:text-blue-600">Comment</button>
                <button class="hover:text-blue-600">Share</button>
              </div>
            </div>
  
            <!-- Post 2 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User"
                  class="w-12 h-12 rounded-full border-2 border-gray-300" />
                <div>
                  <p class="font-semibold">Jane Smith</p>
                  <p class="text-gray-600 text-sm">4 hours ago</p>
                </div>
              </div>
              <p class="mt-4 text-gray-800">Just came back from a trip to the mountains. Feeling so refreshed!</p>
              <div class="flex space-x-6 mt-4 text-gray-500">
                <button class="hover:text-blue-600">Like</button>
                <button class="hover:text-blue-600">Comment</button>
                <button class="hover:text-blue-600">Share</button>
              </div>
            </div>
          </div>
        </main>
      </div>
  
      <!-- Footer -->
      <footer class="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2025 MySocial. All rights reserved.</p>
      </footer>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles for the homepage if needed */
  </style>
  