
<template>
    <nav class="bg-gray-900 shadow-md rounded-xl mr-5 ml-5">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4 w-14 h-1">
            <img src="/logo.png">
          <router-link to="/" class="text-xl font-bold text-white">MediTrust</router-link>
        </div>
        <div class="hidden md:flex space-x-6">
          <router-link to="/" class="text-gray-600 hover:text-white">Home</router-link>
          <router-link to="/about" class="text-gray-600 hover:text-white">About</router-link>
          <router-link to="/Register" class="text-gray-600 hover:text-white">Join us</router-link>
          <router-link to="/Contact" class="text-gray-600 hover:text-white">Contact</router-link>
        </div>
        <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div v-if="isMenuOpen" class="md:hidden bg-gray-900 shadow-md p-4 space-y-3 rounded-xl">
        <router-link to="/" class="block text-gray-600 hover:text-white">Home</router-link>
        <router-link to="/About" class="block text-gray-600 hover:text-white">About</router-link>
        <router-link to="/Register" class="block text-gray-600 hover:text-white">Join us</router-link>
        <router-link to="/Contact" class="block text-gray-600 hover:text-white">Contact</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>

<script setup>
import { RouterLink } from "vue-router";
</script>
  