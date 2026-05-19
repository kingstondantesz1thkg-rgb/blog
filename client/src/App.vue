<template>
  <CustomCursor />
  <div class="relative min-h-screen flex flex-col selection:bg-primary/30 selection:text-white">
    <!-- Background ambient effects -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000"></div>
    </div>

    <Navbar class="z-50" />
    
    <main class="flex-grow z-10 pt-24 px-6 max-w-6xl mx-auto w-full">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <RightSideSettings />

    <Footer class="z-10" />
  </div>
</template>

<script setup lang="ts">
import CustomCursor from './components/CustomCursor.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import RightSideSettings from './components/RightSideSettings.vue'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>