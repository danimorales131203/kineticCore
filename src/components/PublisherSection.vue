<script setup>
import { computed, onMounted, ref } from 'vue'
import ComicCard from './ComicCard.vue'
import { getComics } from '../services/comicApi.js'

const emit = defineEmits(['select-comic'])

const comics = ref([])
const selectedPublisher = ref('All')

const publishers = [
  'All',
  'Marvel Comics',
  'DC Comics',
  'Image Comics'
]

onMounted(async () => {
  comics.value = await getComics()
})

const filteredComics = computed(() => {
  if (selectedPublisher.value === 'All') {
    return comics.value
  }

  return comics.value.filter((comic) => {
    return comic.publisher === selectedPublisher.value
  })
})
</script>

<template>
  <section class="publisher-section">
    <h2>By Publisher</h2>

    <div class="publisher-filters">
      <button
        v-for="publisher in publishers"
        :key="publisher"
        class="publisher-filter-button"
        :class="{ active: selectedPublisher === publisher }"
        @click="selectedPublisher = publisher"
      >
        {{ publisher }}
      </button>
    </div>

    <div class="publisher-comic-grid">
      <ComicCard
        v-for="comic in filteredComics"
        :key="comic.id"
        :comic="comic"
        @select-comic="emit('select-comic', comic)"
      />
    </div>
  </section>
</template>