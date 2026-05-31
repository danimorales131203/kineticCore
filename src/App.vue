<script setup>
import { ref } from 'vue'
import LandingView from './views/LandingView.vue'
import AuthView from './views/AuthView.vue'
import ProfileSetupView from './views/ProfileSetupView.vue'
import ComicsDashboardView from './views/ComicsDashboardView.vue'
import ComicDetailsView from './views/ComicDetailsView.vue'
import ComicReaderView from './views/ComicReaderView.vue'
import MyComicsView from './views/MyComicsView.vue'

const currentView = ref('landing')

const user = ref({
  username: '',
  avatar: ''
})

const selectedComic = ref(null)

function goToAuth() {
  currentView.value = 'auth'
}

function goToLanding() {
  currentView.value = 'landing'
}

function goToDashboard() {
  currentView.value = 'dashboard'
}

function goToMyComics() {
  currentView.value = 'myComics'
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
    @go-to-landing="goToLanding"
    @go-to-dashboard="goToDashboard"
    @go-to-my-comics="goToMyComics"
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
    @go-to-landing="goToLanding"
    @go-to-dashboard="goToDashboard"
    @go-to-my-comics="goToMyComics"
    @select-comic="selectComic"
  />

  <ComicDetailsView
    v-if="currentView === 'comicDetails' && selectedComic"
    :user="user"
    :comic="selectedComic"
    @go-to-auth="goToAuth"
    @go-to-landing="goToLanding"
    @go-to-dashboard="goToDashboard"
    @go-to-my-comics="goToMyComics"
    @go-back="goToDashboard"
    @start-reading="startReading"
  />

  <ComicReaderView
    v-if="currentView === 'comicReader' && selectedComic"
    :user="user"
    :comic="selectedComic"
    @go-to-auth="goToAuth"
    @go-to-landing="goToLanding"
    @go-to-dashboard="goToDashboard"
    @go-to-my-comics="goToMyComics"
    @go-back="selectComic(selectedComic)"
  />

  <MyComicsView
    v-if="currentView === 'myComics'"
    :user="user"
    @go-to-auth="goToAuth"
    @go-to-landing="goToLanding"
    @go-to-dashboard="goToDashboard"
    @go-to-my-comics="goToMyComics"
  />
</template>