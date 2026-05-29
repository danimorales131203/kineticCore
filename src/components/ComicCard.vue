<script setup>
defineProps({
  comic: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select-comic'])
</script>

<template>
  <article class="comic-card" @click="emit('select-comic', comic)">
    <div class="comic-cover-wrapper">
      <img class="comic-cover" :src="comic.cover" :alt="comic.title" />

      <span class="comic-rank">
        {{ comic.rank }}
      </span>

      <div class="comic-hover">
        <span>View</span>
      </div>
    </div>

    <h3 class="comic-title">
      {{ comic.title }}
    </h3>
  </article>
</template>