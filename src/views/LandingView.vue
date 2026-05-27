<script setup>
import AppHeader from '../components/AppHeader.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import BrowseButton from '../components/BrowseButton.vue'
</script>

<template>
  <main class="landing-page">
    <AppHeader />

    <section class="landing-content">
      <HeroCarousel />
      <BrowseButton />
    </section>
  </main>
</template>