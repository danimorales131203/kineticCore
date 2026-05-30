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
    comics.value = await getComics()
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
        @select-comic="emit('select-comic', comic)"
      />
    </div>
  </section>
</template> 