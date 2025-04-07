<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <div class="max-w-xl mx-auto">
      <!-- App Header -->
      <header class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-100">Mini Quiz App</h1>
        <div class="flex justify-center space-x-4 mt-3">
          <button
            @click="switchMode(QuizModes.tap)"
            :class="[
              'px-4 py-2 rounded cursor-pointer',
              quizMode === 'tap' ? 'bg-blue-500 text-white' : 'bg-gray-200',
            ]"
          >
            Tap-to-Reveal
          </button>
          <button
            @click="switchMode(QuizModes.swipe)"
            :class="[
              'px-4 py-2 rounded cursor-pointer',
              quizMode === 'swipe' ? 'bg-blue-500 text-white' : 'bg-gray-200',
            ]"
          >
            Swipe Mode
          </button>
        </div>
      </header>

      <!-- Tap-to-Reveal UI -->
      <template v-if="quizMode === 'tap'" class="space-y-4">
        <div class="text-center mb-2">
          <p class="text-gray-300 text-sm">Tap on a card to reveal the answer</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Quiz Questions -->
          <FlipCard
            v-for="(card, index) in questions as TapCard[]"
            :key="card.question"
            :card="card"
            @click="flipCard(index)"
          />
        </div>
      </template>

      <!-- Swipe UI -->
      <template v-if="quizMode === 'swipe'" class="space-y-4">
        <!-- Quiz Questions -->
        <template v-if="!swipeModuleComplete">
          <div class="text-center mb-4">
            <p class="text-gray-300 text-sm">
              Is this statement true or false? Tap the arrows below to swipe the cards to True or
              False.
            </p>
          </div>

          <div class="flex justify-between items-center">
            <p class="text-white">&larr; False</p>
            <p class="text-white">True &rarr;</p>
          </div>

          <SwipeCard />
        </template>

        <!-- Completion Screen for Swipe -->
        <template v-else class="grid place-items-center mt-6">
          <SwipeQuizEnd
            :correctAnswers="correctAnswersInSwipeModule"
            :totalQuestions="questions.length"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlipCard from './components/FlipCard.vue'
import SwipeQuizEnd from './components/SwipeQuizEnd.vue'
import SwipeCard from './components/SwipeCard.vue'
import type TapCard from './types/TapCard'
import { QuizModes } from '@/types/QuizModes'

import { useQuiz } from './stores/quiz'
import { storeToRefs } from 'pinia'
const { quizMode, questions, swipeModuleComplete, correctAnswersInSwipeModule } =
  storeToRefs(useQuiz())

const { switchMode, answerQuestion, flipCard } = useQuiz()
</script>

<style>
/* Card flip effects */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.swipe-card-container {
  transition: transform 0.3s ease-in-out;
}

.swipe-left {
  transform: translateX(-100%);
}

.swipe-right {
  transform: translateX(100%);
}
</style>
