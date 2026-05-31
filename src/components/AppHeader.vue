<script setup>
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
  <header class="app-header">
    <button class="logo-button" @click="emit('go-to-landing')">
      <h1 class="logo">KINETICORE</h1>
    </button>

    <nav class="header-nav">
      <button @click="emit('go-to-landing')">Main</button>
      <button @click="emit('go-to-dashboard')">Home</button>
      <button @click="emit('go-to-my-comics')">My Comics</button>
    </nav>

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