import { createRouter, createWebHistory } from "vue-router"; 
import Login from "../components/Login.vue"; 
import HomePage from "../components/HomePage.vue"; 
import Parameter from "../components/Parameter.vue"; 
import Register from "../components/Register.vue"; 
import Contact from "../components/Contact.vue";  
import About from "../components/About.vue";  


const routes = [     
    { path: "/", component: HomePage },     
    { path: "/login", component: Login },     
    { path: "/Parameter", component: Parameter},     
    { path: "/Register", component: Register },     
    { path: "/Contact", component: Contact },  
    { path: "/About", component: About },     ];  
    
    const router = createRouter({history: createWebHistory(), routes, });  
    
    export default router; 
