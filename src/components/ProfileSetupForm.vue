<script setup>
import { ref } from 'vue'

const emit = defineEmits(['profile-complete'])

const username = ref('')
const selectedAvatar = ref('')
const errorMessage = ref('')

const avatars = [
  '/kineticCore/avatar-1.jpg',
  '/kineticCore/avatar-2.jpg',
  '/kineticCore/avatar-3.jpg'
]

function completeProfile() {
  if (!username.value.trim()) {
    errorMessage.value = 'Please enter a username'
    return
  }

  if (!selectedAvatar.value) {
    errorMessage.value = 'Please select a profile picture'
    return
  }

  emit('profile-complete', {
    username: username.value,
    avatar: selectedAvatar.value
  })
}
</script>

<template>
  <form class="profile-form" @submit.prevent="completeProfile">
    <input
      v-model="username"
      class="auth-input"
      type="text"
      maxlength="15"
      placeholder="Username"
    />

    <p class="character-count">
      {{ username.length }}/15
    </p>

    <div class="avatar-options">
      <button
        v-for="avatar in avatars"
        :key="avatar"
        type="button"
        class="avatar-option"
        :class="{ active: selectedAvatar === avatar }"
        @click="selectedAvatar = avatar"
      >
        <img :src="avatar" alt="Profile option" />
      </button>
    </div>

    <p v-if="errorMessage" class="auth-error">
      {{ errorMessage }}
    </p>

    <button type="submit" class="auth-continue-btn">
      Finish
    </button>
  </form>
</template>