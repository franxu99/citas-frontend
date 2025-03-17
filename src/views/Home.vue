<template>
  <div class="min-h-screen ">
    <main class="container mx-auto p-6">
      <section class="mb-12 text-center">
        <h2 class="text-4xl font-bold text-blue-600 mb-4">Bienvenido a Salud Nova</h2>
        <p class="text-lg text-gray-700">En Salud Nova, nos dedicamos a proporcionar la mejor atención médica a nuestros pacientes. Nuestro equipo de profesionales está aquí para ayudarte con todas tus necesidades de salud.</p>
      </section>
      <section class="mb-12">
        <Carrusel />
      </section>
      <section class="mb-12 flex flex-col items-center">
        <h2 class="text-3xl font-bold text-blue-600 mb-4">Nuestros Servicios</h2>
        <ul class="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>Consultas médicas generales</li>
          <li>Especialidades médicas</li>
          <li>Laboratorio clínico</li>
          <li>Imágenes diagnósticas</li>
          <li>Urgencias 24/7</li>
        </ul>
      </section>
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-blue-600 mb-4">Contáctanos</h2>
        <p class="text-lg text-gray-700">Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto o llamando al (123) 456-7890.</p>
      </section>
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-blue-600 mb-4">Gestión de Citas</h2>
        <div class="flex justify-center space-x-4">
          <button @click="goToAppointmentForm" class="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300">Agendar Cita</button>
          <button @click="goToAppointments" class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">Ver Citas</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useInfoStore } from '../store/info';
import Carrusel from '../components/Carrusel.vue';

const router = useRouter();
const infoStore = useInfoStore();

const goToSettings = () => {
  router.push('/settings');
};

const logout = () => {
  infoStore.clearUserInfo();
  router.push('/login');
};

const goToAppointmentForm = () => {
  router.push('/appointment-form');
};

const goToAppointments = () => {
  router.push('/appointment');
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

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav li {
  margin-right: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
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

button.bg-green-500 {
  background-color: #10b981;
  color: white;
}

button.bg-blue-500 {
  background-color: #3b82f6;
  color: white;
}
</style>