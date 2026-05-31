<script setup>
import AppHeader from '../components/AppHeader.vue'
import DashboardFooter from '../components/DashboardFooter.vue'
import ComicCard from '../components/ComicCard.vue'

defineProps({
  user: {
    type: Object,
    required: true
  },
  userComics: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'go-to-auth',
  'go-to-landing',
  'go-to-dashboard',
  'go-to-my-comics',
  'go-to-add-comic',
  'select-comic'
])
</script>

<template>
  <main class="my-comics-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
      @go-to-landing="emit('go-to-landing')"
      @go-to-dashboard="emit('go-to-dashboard')"
      @go-to-my-comics="emit('go-to-my-comics')"
    />

    <section class="my-comics-content">
      <h2 class="library-title">
        Librarie
      </h2>

      <div class="my-comics-grid">
        <p v-if="userComics.length === 0" class="empty-library-message">
          Your uploaded comics will appear here.
        </p>

        <ComicCard
          v-for="comic in userComics"
          v-else
          :key="comic.id"
          :comic="comic"
          @select-comic="emit('select-comic', comic)"
        />
      </div>

      <div class="add-comic-container">
        <button
          class="add-comic-button"
          @click="emit('go-to-add-comic')"
        >
          Add Comic
        </button>
      </div>
    </section>

    <DashboardFooter />
  </main>
</template>