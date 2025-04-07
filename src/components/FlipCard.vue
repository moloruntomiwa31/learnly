<template>
  <div class="cursor-pointer">
    <div class="relative h-50 w-auto">
      <!-- Card container with 3D effect -->
      <div
        class="absolute inset-0 transition-transform duration-500 preserve-3d"
        :class="{ 'rotate-y-180': card.flipped }"
      >
        <!-- Front side -->
        <div
          class="absolute inset-0 grid place-content-center text-center p-4 bg-gray-500 rounded-lg shadow-md border-4 border-blue-400"
        >
          <p class="text-xl font-medium text-white">{{ card.question }}</p>
        </div>
        <!-- Back side -->
        <div
          class="absolute inset-0 grid place-content-center text-center p-4 backface-hidden rotate-y-180 bg-white rounded-lg shadow-md border-4 border-blue-400"
        >
          <p class="text-xl text-gray-800">{{ card.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type TapCard from '../types/TapCard'
defineProps<{
  card: TapCard
}>()
</script>
