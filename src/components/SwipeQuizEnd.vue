<template>
  <div class="bg-white grid gap-6 text-center rounded-lg shadow-md p-6">
    <div>
      <h2 class="text-3xl font-bold text-green-600">Great Job!</h2>
      <p class="text-xl font-medium text-gray-700">You've completed the quiz!</p>
    </div>

    <div>
      <p>You answered {{ correctAnswers }} out of {{ totalQuestions }} questions correctly.</p>
    </div>

    <button
      @click="resetSwipe"
      class="w-full px-3 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from '../stores/quiz'
const { resetSwipe } = useQuiz()
defineProps<{
  correctAnswers: number
  totalQuestions: number
}>()
</script>
