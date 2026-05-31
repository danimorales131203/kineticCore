<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'

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
  'go-to-my-comics',
  'create-user-comic'
])

const title = ref('')
const issue = ref('')
const publisher = ref('')
const description = ref('')
const coverFile = ref(null)
const pageFiles = ref([])

const publishers = [
  'Marvel Comics',
  'DC Comics',
  'Image Comics',
  'Original Content'
]

function handleFiles(event) {
  const files = Array.from(event.target.files)

  if (files.length === 0) return

  coverFile.value = files[0]
  pageFiles.value = files.slice(1)
}

function startConversion() {
  if (
    !title.value.trim() ||
    !issue.value.trim() ||
    !publisher.value ||
    !description.value.trim() ||
    !coverFile.value ||
    pageFiles.value.length === 0
  ) {
    alert('Please add a cover, at least one page, and complete all fields.')
    return
  }

  const simulatedComic = {
    id: `user-comic-${Date.now()}`,
    title: title.value,
    issue: issue.value,
    publisher: publisher.value,
    description: description.value,
    cover: '/kineticCore/comicDB/comic_8/cover8.png',
    pages: [
      '/kineticCore/comicDB/comic_8/page1.png',
      '/kineticCore/comicDB/comic_8/page2.png',
      '/kineticCore/comicDB/comic_8/page3.png',
      '/kineticCore/comicDB/comic_8/page4.png',
      '/kineticCore/comicDB/comic_8/page5.png',
      '/kineticCore/comicDB/comic_8/page6.png',
      '/kineticCore/comicDB/comic_8/page7.png',
      '/kineticCore/comicDB/comic_8/page8.png',
      '/kineticCore/comicDB/comic_8/page9.png'
    ],
    isUserComic: true
  }

  emit('create-user-comic', simulatedComic)
}
</script>

<template>
  <main class="add-comic-page">
    <AppHeader
      :user="user"
      @go-to-auth="emit('go-to-auth')"
      @go-to-landing="emit('go-to-landing')"
      @go-to-dashboard="emit('go-to-dashboard')"
      @go-to-my-comics="emit('go-to-my-comics')"
    />

    <section class="add-comic-content">
      <label class="file-drop-area">
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          @change="handleFiles"
        />

        <span>Add File</span>
      </label>

      <div v-if="coverFile" class="file-info">
        <p>Cover: {{ coverFile.name }}</p>
        <p>Pages: {{ pageFiles.length }}</p>
      </div>

      <form class="add-comic-form" @submit.prevent="startConversion">
        <div class="form-row">
          <input
            v-model="title"
            type="text"
            placeholder="Name"
            required
          />

          <input
            v-model="issue"
            type="text"
            placeholder="Issue"
            required
          />
        </div>

        <select v-model="publisher" required>
          <option value="" disabled>
            Publisher
          </option>

          <option
            v-for="option in publishers"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>

        <textarea
          v-model="description"
          class="comic-description-input"
          placeholder="Description"
          required
        ></textarea>

        <button type="submit" class="start-conversion-button">
          Start Conversion
        </button>
      </form>
    </section>
  </main>
</template>