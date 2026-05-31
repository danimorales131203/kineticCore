<script setup>
const emit = defineEmits(['go-to-my-comics'])
</script>

<template>
  <section class="my-comics-cta-section">
    <button class="my-comics-cta" @click="emit('go-to-my-comics')">
      My Comics
    </button>
  </section>
</template>