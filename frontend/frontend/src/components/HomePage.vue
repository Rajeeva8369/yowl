<template>
    <div class="flex flex-col h-screen bg-black">
  
      <header class="bg-black text-white py-4 px-6 shadow-md">
        <div class="flex items-center justify-between h-14 w-14">
            <img src="C:\Users\rosas\yowl\frontend\frontend\image\logo.png">
          <h1 class="text-3xl font-bold">MediTrust</h1>
          <div class="space-x-10">
            <router-link to="/Parameter">
            <button class="bg-gray-200 text-black px-4 py-2 rounded-lg">Account</button>
        </router-link>
          </div>
        </div>
      </header>
  
      <div class="flex flex-1">
        <main class="flex-1 p-6 space-y-8">
          <div class="bg-gray-200 p-6 rounded-lg shadow-md">
            <textarea
              class="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="What's on your mind?"
            ></textarea>
            <button class="mt-4 bg-black text-white px-4 py-2 rounded-lg">Post</button>
          </div>
  
          <div class="space-y-6">
            <div class="bg-gray-200 p-6 rounded-lg shadow-md">
              <div class="flex items-center space-x-4">
                <img src="https://yt3.googleusercontent.com/gupO1lvHk2XOg82UrvkG0lFFY8iw7r6y0HcKjaoOOWilFxjcO_8vQbgXduHVtLBsv932TymLjA=s900-c-k-c0x00ffffff-no-rj" alt="User"
                  class="w-12 h-12 rounded-full border-2 border-gray-300" />
                <div>
                  <p class="font-semibold">TF1</p>
                  <p class="text-gray-600 text-sm">2 hours ago</p>
                </div>
              </div>
              <p class="mt-4 text-gray-800">Trêve à Gaza : Israël confirme avoir libéré 200 détenus, les quatre otages israéliennes dans un "état stable"</p>
              <img src="https://i.cbc.ca/1.7433079.1737150061!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/gaza.jpg?im=Resize%3D780">
              <div class="flex space-x-6 mt-4 text-gray-500">
                <button class="hover:text-blue-600">Like</button>
                <button class="hover:text-blue-600">Comment</button>
                <button class="hover:text-blue-600">Share</button>
              </div>
            </div>
  
            <div class="bg-gray-200 p-6 rounded-lg shadow-md">
              <div class="flex items-center space-x-4">
                <img src="https://yt3.ggpht.com/-uYnyeu0wFpQ/AAAAAAAAAAI/AAAAAAAAAAA/VU2Ct3J_ZQw/s900-c-k-no/photo.jpg" alt="User"
                  class="w-12 h-12 rounded-full border-2 border-gray-300" />
                <div>
                  <p class="font-semibold">Sky news</p>
                  <p class="text-gray-600 text-sm">4 hours ago</p>
                </div>
              </div>
              <p class="mt-4 text-gray-800">Binotto and the Audi project: "It will be a long journey"</p>
              <img src="https://cdn-1.motorsport.com/images/amp/YMd98vv2/s800/mattia-binotto-directeur-des-o.webp">
              <div class="flex space-x-6 mt-4 text-gray-500">
                <button class="hover:text-blue-600">Like</button>
                <button class="hover:text-blue-600">Comment</button>
                <button class="hover:text-blue-600">Share</button>
              </div>
            </div>
          </div>
        </main>
      </div>
  
      <footer class="bg-black text-white py-4 text-center">
        <p>&copy; 2025 MediTrust. All rights reserved.</p>
      </footer>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  