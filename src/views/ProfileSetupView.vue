<script setup>
import ProfileSetupForm from '../components/ProfileSetupForm.vue'

const emit = defineEmits(['profile-complete'])

function handleProfileComplete(profileData) {
  emit('profile-complete', profileData)
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <h1 class="auth-logo">KINETICORE</h1>
      <h2>Create your profile</h2>
      <p>Choose your comic reader identity</p>

      <ProfileSetupForm @profile-complete="handleProfileComplete" />
    </section>
  </main>
</template>