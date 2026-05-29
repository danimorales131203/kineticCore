<script setup>
import AppHeader from '../components/AppHeader.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import BrowseButton from '../components/BrowseButton.vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-to-auth', 'go-to-dashboard'])
</script>

<template>
  <main class="landing-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
    />

    <section class="landing-content">
      <HeroCarousel />
      <BrowseButton @browse="emit('go-to-dashboard')" />
    </section>
  </main>
</template>