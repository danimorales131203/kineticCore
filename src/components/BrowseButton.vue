<script setup>
const emit = defineEmits(['browse'])
</script>

<template>
  <button class="browse-button" @click="emit('browse')">
    Browse
  </button>
</template>