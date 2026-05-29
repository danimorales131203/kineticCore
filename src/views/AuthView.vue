<script setup>
import AuthForm from '../components/AuthForm.vue'

const emit = defineEmits(['email-submit'])

function handleEmailSubmit(email) {
  emit('email-submit', email)
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <h1 class="auth-logo">KINETICORE</h1>
      <h2>Log In or Sign Up</h2>
      <p>Enter a world of fantasy</p>

      <AuthForm @email-submit="handleEmailSubmit" />
    </section>
  </main>
</template>