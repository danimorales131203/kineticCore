<script setup>
import AppHeader from '../components/AppHeader.vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'go-to-auth',
  'go-to-landing',
  'go-to-dashboard',
  'go-to-my-comics'
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
      <h2>My Comics</h2>

      <div class="my-comics-placeholder">
        <p>
          Here users will be able to upload JPG pages and create their own
          digital comics.
        </p>
      </div>
    </section>
  </main>
</template>