<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const slides = [
  '/kineticCore/landingCarousel/slide1.jpg',
  '/kineticCore/landingCarousel/slide2.jpg',
  '/kineticCore/landingCarousel/slide3.jpg'
]

const currentSlide = ref(0)
let intervalId = null

function goToSlide(index) {
  currentSlide.value = index
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 3500)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <section class="hero-carousel">
    <img
      class="hero-slide-image"
      :src="slides[currentSlide]"
      alt="Featured comic"
    />

    <div class="carousel-dots">
      <button
        v-for="(slide, index) in slides"
        :key="slide"
        class="carousel-dot"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </section>
</template>