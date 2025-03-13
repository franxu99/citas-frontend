import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AppointmentForm from '../views/AppointmentForm.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/AuthForm.vue';
import { useInfoStore } from '../store/info';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/appointment-form', component: AppointmentForm, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const infoStore = useInfoStore();
  if (to.meta.requiresAuth && !infoStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;