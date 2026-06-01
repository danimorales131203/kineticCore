<script setup>
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'

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

const emit = defineEmits([
  'go-to-auth',
  'go-to-landing',
  'go-to-dashboard',
  'go-to-my-comics',
  'go-back'
])

const currentPage = ref(0)
const readingMode = ref('static')
const animationType = ref('pageFlip')
const animationKey = ref(0)

const pages = computed(() => props.comic.pages || [])
const currentPageImage = computed(() => pages.value[currentPage.value])

function triggerAnimation() {
  animationKey.value++
}

function nextPage() {
  if (currentPage.value < pages.value.length - 1) {
    currentPage.value++
    triggerAnimation()
  }
}

function previousPage() {
  if (currentPage.value > 0) {
    currentPage.value--
    triggerAnimation()
  }
}

function getAnimationClass() {
  if (readingMode.value !== 'dynamic') {
    return ''
  }

  return animationType.value
}
</script>

<template>
  <main class="reader-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
      @go-to-landing="emit('go-to-landing')"
      @go-to-dashboard="emit('go-to-dashboard')"
      @go-to-my-comics="emit('go-to-my-comics')"
    />

    <section class="comic-reader-layout">
      <div class="comic-page-display">
        <button
          class="page-side-arrow page-side-arrow-left"
          @click="previousPage"
        >
          ‹
        </button>

        <p v-if="pages.length === 0">
          No pages found for this comic.
        </p>

        <img
          v-else
          :key="`${currentPageImage}-${animationKey}`"
          :src="currentPageImage"
          :alt="`${comic.title} page ${currentPage + 1}`"
          :class="getAnimationClass()"
        />

        <button
          class="page-side-arrow page-side-arrow-right"
          @click="nextPage"
        >
          ›
        </button>
      </div>

      <div class="comic-reader-controls">
        <button class="reader-close" @click="emit('go-back')">
          Close
        </button>

        <div class="reader-info">
          <span>{{ comic.title }}</span>
          <span>{{ comic.issue }}</span>
          <span>Page {{ currentPage + 1 }} / {{ pages.length }}</span>
        </div>

        <div class="reader-animation-controls">
          <button
            :class="{ active: readingMode === 'static' }"
            @click="readingMode = 'static'"
          >
            Static
          </button>

          <button
            :class="{ active: readingMode === 'dynamic' }"
            @click="readingMode = 'dynamic'"
          >
            Dynamic
          </button>

          <select
            v-model="animationType"
            :disabled="readingMode !== 'dynamic'"
          >
            <option value="pageFlip">Page Flip</option>
            <option value="speedDash">Speed Dash</option>
            <option value="webSwing">Web Swing</option>
          </select>
        </div>
      </div>
    </section>
  </main>
</template>