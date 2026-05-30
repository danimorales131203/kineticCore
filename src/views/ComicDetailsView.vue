<script setup>
import AppHeader from '../components/AppHeader.vue'

defineProps({
  user: {
    type: Object,
    required: true
  },
  comic: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-to-auth', 'go-back', 'start-reading'])
</script>

<template>
  <main class="comic-details-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
    />

    <section class="comic-details-content">
      <button class="back-button" @click="emit('go-back')">
        Back
      </button>

      <div class="comic-details-card">
        <img
          class="comic-details-cover"
          :src="comic.cover"
          :alt="comic.title"
        />

        <div class="comic-details-info">
          <p class="comic-details-label">
            {{ comic.issue }} · Trending #{{ comic.rank }}
          </p>

          <h2>{{ comic.title }}</h2>

          <p>
            {{ comic.description }}
          </p>

          <button class="read-button" @click="emit('start-reading', comic)">
            Read
          </button>
        </div>
      </div>
    </section>
  </main>
</template>