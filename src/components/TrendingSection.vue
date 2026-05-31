<script setup>
import { onMounted, ref } from 'vue'
import ComicCard from './ComicCard.vue'
import { getComics } from '../services/comicApi.js'

const emit = defineEmits(['select-comic'])

const comics = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const allComics = await getComics()

    comics.value = allComics
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((comic, index) => ({
        ...comic,
        rank: index + 1
      }))
  } catch (error) {
    errorMessage.value = 'Could not load comics'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="trending-section">
    <h2>Trending</h2>

    <p v-if="isLoading">Loading comics...</p>

    <p v-else-if="errorMessage">{{ errorMessage }}</p>

    <div v-else class="comic-grid">
      <ComicCard
        v-for="comic in comics"
        :key="comic.id"
        :comic="comic"
        :show-rank="true"
        @select-comic="emit('select-comic', comic)"
      />
    </div>
  </section>
</template>