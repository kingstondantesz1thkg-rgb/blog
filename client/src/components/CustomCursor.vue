<template>
  <div class="cursor-dot" :style="{ transform: `translate(${x}px, ${y}px)` }"></div>
  <div class="cursor-outline" :class="{ 'cursor-hover': isHovering }" :style="{ transform: `translate(${x}px, ${y}px)` }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const isHovering = ref(false)

const updateCursor = (e: MouseEvent) => {
  x.value = e.clientX
  y.value = e.clientY
  
  const target = e.target as HTMLElement
  const computedStyle = window.getComputedStyle(target)
  // Check if hovering over clickable elements
  isHovering.value = 
    computedStyle.cursor === 'pointer' || 
    target.tagName.toLowerCase() === 'a' || 
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') !== null ||
    target.closest('button') !== null
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursor)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor)
})
</script>

<style scoped>
.cursor-dot, .cursor-outline {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: #34d399; /* Light green */
  margin-top: -4px;
  margin-left: -4px;
  /* Add slight glow */
  box-shadow: 0 0 10px 2px rgba(52, 211, 153, 0.5);
  /* Follows mouse exactly */
}

.cursor-outline {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(52, 211, 153, 0.5);
  margin-top: -20px;
  margin-left: -20px;
  /* Add lag to the outline */
  transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.cursor-hover {
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;
  background-color: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.8);
  backdrop-filter: blur(2px);
}
</style>