<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Bienvenido a tu panel</h1>
    
    <!-- Sección de Información del Usuario -->
    <div class="bg-white p-4 rounded shadow mb-4">
      <h2 class="text-xl font-semibold mb-2">Tu Información</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input type="text" id="name" v-model="userForm.name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="lastname" class="block text-sm font-medium text-gray-700">Apellido:</label>
          <input type="text" id="lastname" v-model="userForm.lastname" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input type="email" id="email" v-model="userForm.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input type="text" id="phone" v-model="userForm.phone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
          <input type="text" id="date" v-model="userForm.date" placeholder="DD/MM/YYYY" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" class="mt-2 bg-blue-500 text-white p-2 rounded">Actualizar Información</button>
      </form>
    </div>

    <!-- Botón de Cerrar Sesión -->
    <div class="bg-white p-4 rounded shadow mb-4">
      <button @click="logout" class="mt-2 bg-red-500 text-white p-2 rounded">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInfoStore } from '../store/info';

const router = useRouter();
const infoStore = useInfoStore();

const userForm = ref({
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: ''
});

const validateUserInfo = () => {
  if (!userForm.value.name || !userForm.value.lastname || !userForm.value.email || !userForm.value.phone || !userForm.value.date) {
    alert('Todos los campos son obligatorios.');
    return false;
  }
  // Validar formato de fecha
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(userForm.value.date)) {
    alert('La fecha debe estar en el formato DD/MM/YYYY.');
    return false;
  }
  return true;
};

const updateUserInfo = async () => {
  if (!validateUserInfo()) {
    return;
  }
  // Lógica para actualizar la información del usuario
  try {
    await infoStore.updateUserProfile(userForm.value);
    alert('Información actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la información del usuario:', error);
    alert('Error al actualizar la información del usuario.');
  }
};

const logout = () => {
  // Lógica para cerrar sesión
  infoStore.clearUserInfo();
  router.push('/login');
};

onMounted(() => {
  // Inicializar userForm con los valores del store
  userForm.value.name = infoStore.name;
  userForm.value.lastname = infoStore.lastname;
  userForm.value.email = infoStore.email;
  userForm.value.phone = infoStore.phone;
  userForm.value.date = infoStore.date;
});
</script>

<style scoped>
/* Agrega tus estilos personalizados aquí */
</style>