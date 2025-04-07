import { ref, computed } from 'vue'
import type TapCard from '../types/TapCard'
import type SwipeCard from '../types/SwipeCard'
import { QuizModes } from '@/types/QuizModes'
import { defineStore } from 'pinia'

type Card = TapCard | SwipeCard

export const useQuiz = defineStore('quiz', () => {
  const quizMode = ref<QuizModes>(QuizModes.tap)

  const switchMode = (mode: QuizModes) => {
    quizMode.value = mode
  }

  // Tap-to-reveal cards
  const tapCards = ref<TapCard[]>([
    { question: 'What is the capital of France?', answer: 'Paris', flipped: false },
    { question: 'What is 2 + 2?', answer: '4', flipped: false },
    { question: 'What is 5 - 6?', answer: '-1', flipped: false },
    { question: 'What planet is known as the Red Planet?', answer: 'Mars', flipped: false },
  ])

  // Swipe cards (true/false questions)
  const swipeCards = ref<SwipeCard[]>([
    {
      question: 'The Earth is flat.',
      answer: false,
      userAnswer: null,
    },
    {
      question: 'Water boils at 100°C at sea level.',
      answer: true,
      userAnswer: null,
    },
    {
      question: 'Humans have walked on Mars.',
      answer: false,
      userAnswer: null,
    },
    {
      question: 'The capital of Australia is Sydney.',
      answer: false,
      userAnswer: null,
    },
    {
      question: 'JavaScript is a compiled programming language.',
      answer: false,
      userAnswer: null,
    },
  ])

  const questions = computed<Card[]>(() => {
    return quizMode.value === 'tap' ? tapCards.value : swipeCards.value
  })

  const flipCard = (index: number) => {
    const card = questions.value[index]
    if ('flipped' in card) {
      card.flipped = !card.flipped
    }
  }

  // swipe mode
  const swipeModuleComplete = ref(false)
  const currentSwipeModuleIndex = ref(0)

  const correctAnswersInSwipeModule = computed(() => {
    if ('userAnswer' in questions.value[0]) {
      return (questions.value as SwipeCard[]).filter((card) => card.userAnswer === card.answer)
        .length
    }
    return 0
  })

  const triggerSwipeAnimation = (direction: 'right' | 'left') => {
    const cardElement = document.querySelector('.swipe-card-container')
    if (cardElement) {
      const swipeClass = direction === 'right' ? 'swipe-right' : 'swipe-left'
      cardElement.classList.add(swipeClass)
      setTimeout(() => {
        cardElement.classList.remove(swipeClass)
      }, 500) // Match the animation duration
    }
  }

  const answerQuestion = (answer: boolean) => {
    if (currentSwipeModuleIndex.value >= questions.value.length) {
      swipeModuleComplete.value = true
      return
    }

    const card = questions.value[currentSwipeModuleIndex.value]
    if ('userAnswer' in card) {
      card.userAnswer = answer
    }

    const direction = answer ? 'right' : 'left'
    triggerSwipeAnimation(direction)

    setTimeout(() => {
      currentSwipeModuleIndex.value++
      // Check if we've completed all questions
      if (currentSwipeModuleIndex.value >= questions.value.length) {
        swipeModuleComplete.value = true
      }
    }, 500) // Match the animation duration
  }

  const resetSwipe = () => {
    // Reset all cards
    if ('userAnswer' in questions.value[0]) {
      (questions.value as SwipeCard[]).forEach((card) => {
        card.userAnswer = null
      })
    }
    currentSwipeModuleIndex.value = 0
    swipeModuleComplete.value = false
  }

  return {
    quizMode,
    switchMode,
    questions,
    flipCard,
    swipeModuleComplete,
    currentSwipeModuleIndex,
    answerQuestion,
    correctAnswersInSwipeModule,
    resetSwipe,
  }
})
