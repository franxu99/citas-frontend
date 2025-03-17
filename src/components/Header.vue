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
    
    
    <div @click="toggleMenu" class="flex items-center justify-center cursor-pointer hover:bg-blue-400 p-2 rounded-full transition">
      <div class="flex items-center">
      <span class="mr-4">Hola, {{ infoStore.username }}</span>
    </div>
      <div class="pi pi-user cursor-pointer"  />
      <Menu ref="menu" :model="menuItems" popup />
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useInfoStore } from '../store/info';
import Menu from 'primevue/menu';

const router = useRouter();
const infoStore = useInfoStore();
const menu = ref(null);

const logout = () => {
  infoStore.clearUserInfo();
  router.push('/login');
};

const menuItems = ref([
  {
    label: 'Configuración',
    icon: 'pi pi-cog',
    command: () => router.push('/settings'),
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => {
      logout();
    },
  },
]);

const goToHome = () => {
  router.push('/');
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
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