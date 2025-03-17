<template>
  <div class="carousel-container">
    <Carousel :value="images" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="3000">
      <template #item="slotProps">
        <div class="carousel-item">
          <img :src="slotProps.data" alt="Image" class="w-full h-auto" />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Carousel from 'primevue/carousel';

const images = ref([
  '../../public/image1.jpeg',
  '../../public/image2.jpeg',
  '../../public/image3.jpeg',
  '../../public/image4.jpeg'
]);
</script>

<style scoped>
.carousel-container {
  width: 33.33%; /* Ancho 1/3 de la pantalla */
  margin: 0 auto; /* Centrar el carrusel horizontalmente */
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Ajusta la altura según tus necesidades */
  overflow: hidden;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ajusta la imagen para cubrir el contenedor */
}
</style>