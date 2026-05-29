<script setup>
import { computed, onMounted, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { getComicPages } from '../services/internetArchiveApi.js'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  comic: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-to-auth', 'go-back'])

const currentPage = ref(0)
const readingMode = ref('static')
const pages = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const currentPageImage = computed(() => pages.value[currentPage.value])

onMounted(async () => {
  try {
    pages.value = await getComicPages(props.comic.id)
  } catch (error) {
    errorMessage.value = 'Could not load comic pages'
  } finally {
    isLoading.value = false
  }
})

function nextPage() {
  if (currentPage.value < pages.value.length - 1) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}
</script>

<template>
  <main class="reader-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
    />

    <section class="comic-reader-layout">
      <div class="comic-page-display">
        <p v-if="isLoading">Loading pages...</p>

        <p v-else-if="errorMessage">
          {{ errorMessage }}
        </p>

        <p v-else-if="pages.length === 0">
          No readable pages were found for this comic.
        </p>

        <img
          v-else
          :key="currentPageImage"
          :src="currentPageImage"
          :alt="`${comic.title} page ${currentPage + 1}`"
          :class="{ dynamic: readingMode === 'dynamic' }"
        />
      </div>

      <div class="comic-reader-controls">
        <button class="reader-arrow" @click="previousPage">
          ←
        </button>

        <button class="reader-close" @click="emit('go-back')">
          Close
        </button>

        <div class="reader-info">
          <span>{{ comic.title }}</span>
          <span>Page {{ currentPage + 1 }} / {{ pages.length }}</span>
          <span>{{ readingMode }}</span>
        </div>

        <button class="reader-mode-toggle" @click="readingMode = readingMode === 'static' ? 'dynamic' : 'static'">
          {{ readingMode === 'static' ? 'Dynamic' : 'Static' }}
        </button>

        <button class="reader-arrow" @click="nextPage">
          →
        </button>
      </div>
    </section>
  </main>
</template>