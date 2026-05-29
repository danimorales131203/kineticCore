<script setup>
import { ref } from 'vue'

const emit = defineEmits(['email-submit'])

const email = ref('')
const errorMessage = ref('')

function submitEmail() {
  if (!email.value.trim()) {
    errorMessage.value = 'Please enter an email address'
    return
  }

  errorMessage.value = ''
  emit('email-submit', email.value)
}
</script>

<template>
  <form class="auth-form" @submit.prevent="submitEmail">
    <button type="button" class="auth-provider-btn">Continue with Google</button>
    <button type="button" class="auth-provider-btn">Continue with Apple</button>
    <button type="button" class="auth-provider-btn">Continue with Phone</button>

    <div class="auth-divider">
      <span></span>
      <p>Or</p>
      <span></span>
    </div>

    <input
      v-model="email"
      class="auth-input"
      type="email"
      placeholder="Email Address"
    />

    <p v-if="errorMessage" class="auth-error">
      {{ errorMessage }}
    </p>

    <button type="submit" class="auth-continue-btn">
      Continue
    </button>
  </form>
</template>