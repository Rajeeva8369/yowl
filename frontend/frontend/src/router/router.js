import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import HomePage from "../components/HomePage.vue";
import Parameter from "../components/Parameter.vue";
import Register from "../components/Register.vue";
import Contact from "../components/Contact.vue";
import About from "../components/About.vue";
import Profil from "../components/Profile.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: Login },
  { path: "/parameter", component: Parameter },
  { path: "/register", component: Register }, 
  { path: "/contact", component: Contact },
  { path: "/about", component: About },
  { path: "/profile", component: Profil },
  

];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

