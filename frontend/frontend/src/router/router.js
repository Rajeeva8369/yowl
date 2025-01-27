import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import HomePage from "../components/HomePage.vue";
import Menu from "../components/Menu.vue";
import Parameter from "../components/Parameter.vue";
import Register from "../components/Register.vue";

const routes = [
    { path: "/", component: HomePage },
    { path: "/login", component: Login },
    { path: "/Menu", component: Menu },
    { path: "/Parameter", component: Parameter},
    { path: "/Register", component: Register },
   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
