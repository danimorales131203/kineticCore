<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-to-auth'])
</script>

<template>
  <header class="app-header">
    <h1 class="logo">KINETICORE</h1>

    <button class="user-button" @click="emit('go-to-auth')">
      <span>{{ user.username || 'User' }}</span>

      <div class="user-avatar">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="User avatar"
        />
      </div>
    </button>
  </header>
</template>