<template>
  <header class="bg-blue-500 text-white p-4 flex justify-between items-center">
    <div @click="goToHome" class="flex items-center cursor-pointer">
      <!-- <img src="/logo.png" alt="Salud Nova" class="h-8 mr-2" /> -->
        <h1 class="text-xl font-bold">Salud Nova</h1>
    </div>
    <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/" class="hover:underline">Inicio</router-link></li>
          <li>Servicios</li>
          <li>Acerca de</li>
          <li>Contacto</li>
        </ul>
      </nav>
    <div class="flex items-center">
      <span class="mr-4">Hola, {{ infoStore.username }}{{ console.log(infoStore) }}</span>
      <button @click="goToSettings" class="bg-white text-blue-500 px-4 py-2 rounded mr-2">Configuración</button>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Cerrar Sesión</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useInfoStore } from '../store/info';

const router = useRouter();
const infoStore = useInfoStore();
console.log(infoStore);

const goToSettings = () => {
  router.push('/settings');
};

const logout = () => {
  infoStore.clearUserInfo();
  router.push('/login');
};

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
header {
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button.bg-white {
  background-color: white;
  color: #3b82f6;
}

button.bg-red-500 {
  background-color: #ef4444;
  color: white;
}
</style>