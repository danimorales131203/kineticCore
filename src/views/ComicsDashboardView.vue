<script setup>
import AppHeader from '../components/AppHeader.vue'
import TrendingSection from '../components/TrendingSection.vue'
import PublisherSection from '../components/PublisherSection.vue'
import MyComicsButton from '../components/MyComicsButton.vue'
import DashboardFooter from '../components/DashboardFooter.vue'

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
  'go-to-my-comics',
  'select-comic'
])
</script>

<template>
  <main class="dashboard-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
      @go-to-landing="emit('go-to-landing')"
      @go-to-dashboard="emit('go-to-dashboard')"
      @go-to-my-comics="emit('go-to-my-comics')"
    />

    <section class="dashboard-content">
      <TrendingSection @select-comic="emit('select-comic', $event)" />

      <PublisherSection @select-comic="emit('select-comic', $event)" />

      <MyComicsButton @go-to-my-comics="emit('go-to-my-comics')" />
    </section>

    <DashboardFooter />
  </main>
</template>