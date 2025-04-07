<template>
  <div class="flex justify-between items-center">
    <button
      @click="answerQuestion(false)"
      class="bg-blue-200 px-3 py-4 rounded-lg cursor-pointer z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="#000"
          d="M19.5 13H7.914l4.5 4.5L11 18.914L4.086 12L11 5.086L12.414 6.5l-4.5 4.5H19.5z"
        />
      </svg>
    </button>
    <div
      class="swipe-card-container bg-white rounded-lg shadow-md p-6 h-56 w-56 flex items-center justify-center mt-6"
    >
      <p class="text-xl font-medium text-center">{{ currentQuestion }}</p>
    </div>
    <button
      @click="answerQuestion(true)"
      class="bg-blue-200 px-3 py-4 rounded-lg cursor-pointer z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
        <path
          fill="#000"
          d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.042-.018a.75.75 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06"
        />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useQuiz } from '../stores/quiz'
import { storeToRefs } from 'pinia'
const { currentSwipeModuleIndex, questions } = storeToRefs(useQuiz())
const { answerQuestion } = useQuiz()
const currentQuestion = computed(() => questions.value[currentSwipeModuleIndex.value].question)
</script>
