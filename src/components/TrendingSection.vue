<script setup>
import { onMounted, ref } from 'vue'
import ComicCard from './ComicCard.vue'
import { getTrendingComics } from '../services/internetArchiveApi.js'

const emit = defineEmits(['select-comic'])

const comics = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    comics.value = await getTrendingComics()
  } catch (error) {
    errorMessage.value = 'Could not load trending comics'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="trending-section">
    <h2>Trending</h2>

    <p v-if="isLoading">Searching readable comics...</p>

    <p v-else-if="errorMessage">{{ errorMessage }}</p>

    <div v-else class="comic-grid">
      <ComicCard
        v-for="comic in comics"
        :key="comic.id"
        :comic="comic"
        @select-comic="emit('select-comic', comic)"
      />
    </div>
  </section>
</template>