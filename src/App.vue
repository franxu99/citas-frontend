<script setup>
import { useInfoStore } from './store/info';
import Header from './components/header.vue';
import Footer from './components/footer.vue';

const infoStore = useInfoStore();
</script>

<template>
  <div id="app" class="app-background min-h-screen">
    <div class="min-h-[89vh]">
      <Header v-if="infoStore.isAuthenticated" />
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>

.app-background {
  background-image: url('../public/fondo.jpg'); /* Ruta a tu imagen de fondo */
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center; /* Centra la imagen de fondo */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  min-height: 100vh; /* Asegura que el contenedor ocupe al menos el 100% de la altura de la ventana */
  display: flex;
  flex-direction: column;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
