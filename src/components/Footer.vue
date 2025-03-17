<template>
  <footer class="bg-blue-600 text-white h-[11vh] p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h2 class="text-lg font-bold">Salud Nova</h2>
        <p class="text-sm">© 2025 Salud Nova. Todos los derechos reservados.</p>
      </div>
      <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/" class="hover:underline">Inicio</router-link></li>
          <li><router-link to="/services" class="hover:underline">Servicios</router-link></li>
          <li><router-link to="/about" class="hover:underline">Acerca de</router-link></li>
          <li><router-link to="/contact" class="hover:underline">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
</script>

<style scoped>
footer {
  background-color: #3b82f6; /* Color de fondo similar al header */
  color: white;
}

footer h2 {
  margin-bottom: 0.5rem;
}

footer p {
  margin: 0;
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
</style>