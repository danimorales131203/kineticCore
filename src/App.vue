<script setup>
import { ref } from 'vue'
import LandingView from './views/LandingView.vue'
import AuthView from './views/AuthView.vue'
import ProfileSetupView from './views/ProfileSetupView.vue'
import ComicsDashboardView from './views/ComicsDashboardView.vue'
import ComicDetailsView from './views/ComicDetailsView.vue'
import ComicReaderView from './views/ComicReaderView.vue'

const currentView = ref('landing')

const user = ref({
  username: '',
  avatar: ''
})

const selectedComic = ref(null)

function goToAuth() {
  currentView.value = 'auth'
}

function goToDashboard() {
  currentView.value = 'dashboard'
}

function handleEmailSubmit() {
  currentView.value = 'profileSetup'
}

function finishProfileSetup(profileData) {
  user.value = profileData
  currentView.value = 'landing'
}

function selectComic(comic) {
  selectedComic.value = comic
  currentView.value = 'comicDetails'
}

function startReading(comic) {
  selectedComic.value = comic
  currentView.value = 'comicReader'
}
</script>

<template>
  <LandingView
    v-if="currentView === 'landing'"
    :user="user"
    @go-to-auth="goToAuth"
    @go-to-dashboard="goToDashboard"
  />

  <AuthView
    v-if="currentView === 'auth'"
    @email-submit="handleEmailSubmit"
  />

  <ProfileSetupView
    v-if="currentView === 'profileSetup'"
    @profile-complete="finishProfileSetup"
  />

  <ComicsDashboardView
    v-if="currentView === 'dashboard'"
    :user="user"
    @go-to-auth="goToAuth"
    @select-comic="selectComic"
  />

  <ComicDetailsView
    v-if="currentView === 'comicDetails' && selectedComic"
    :user="user"
    :comic="selectedComic"
    @go-to-auth="goToAuth"
    @go-back="goToDashboard"
    @start-reading="startReading"
  />

  <ComicReaderView
    v-if="currentView === 'comicReader' && selectedComic"
    :user="user"
    :comic="selectedComic"
    @go-to-auth="goToAuth"
    @go-back="selectComic(selectedComic)"
  />
</template>