
import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import AuthForm from '../components/AuthForm.vue';

const routes = [
    { path: '/', component: AuthForm },
    { path: '/home', component: Home },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;