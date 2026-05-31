<script setup>
import AppHeader from '../components/AppHeader.vue'
import TrendingSection from '../components/TrendingSection.vue'
import PublisherSection from '../components/PublisherSection.vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-to-auth', 'select-comic'])
</script>

<template>
  <main class="dashboard-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
    />

    <section class="dashboard-content">
      <TrendingSection @select-comic="emit('select-comic', $event)" />

      <PublisherSection @select-comic="emit('select-comic', $event)" />
    </section>
  </main>
</template>