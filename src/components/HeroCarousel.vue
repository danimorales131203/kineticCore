<script setup>
const slides = [
  {
    title: 'Comic destacado',
    subtitle: 'Explora historias dinámicas',
  },
  {
    title: 'Modo dinámico',
    subtitle: 'Cada página cobra vida',
  },
  {
    title: 'Nuevos lanzamientos',
    subtitle: 'Descubre nuevos mundos',
  },
]
</script>

<template>
  <section class="hero-carousel">
    <div class="slide-content">
      <h2>{{ slides[0].title }}</h2>
      <p>{{ slides[0].subtitle }}</p>
    </div>

    <div class="carousel-dots">
      <span v-for="(slide, index) in slides" :key="index"></span>
    </div>
  </section>
</template>