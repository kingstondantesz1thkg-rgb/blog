<template>
  <header class="fixed top-0 left-0 right-0 glass-panel !rounded-none !border-x-0 !border-t-0 border-b border-white/10 z-50 transition-all duration-300" :class="{ 'py-3': scrolled, 'py-5': !scrolled }">
    <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
        ZHD.<span class="text-white">Dev</span>
      </router-link>
      
      <nav class="flex gap-6 items-center">
        <router-link to="/" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
          {{ $t('nav.home') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        <router-link to="/posts" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
          {{ $t('nav.posts') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        <router-link to="/about" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
          {{ $t('nav.about') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        <router-link to="/cooperation" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
          {{ $t('nav.cooperation') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        <router-link to="/sponsor" class="text-sm font-medium text-primary hover:text-emerald-400 transition-colors relative group flex items-center gap-1">
          {{ $t('nav.sponsor') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        
        <div class="h-4 w-px bg-white/20 mx-2"></div>
        
        <button @click="toggleLanguage" class="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-primary transition-colors group">
          <Languages class="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>{{ $t('nav.toggleLang') }}</span>
        </button>

        <router-link to="/admin" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
          {{ isAuthenticated ? $t('nav.dashboard') : $t('nav.admin') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>

        <button
          v-if="isAuthenticated"
          @click="logout"
          class="text-sm font-medium text-gray-300 hover:text-rose-300 transition-colors"
        >
          {{ $t('nav.logout') }}
        </button>

        <a href="https://github.com/kingstondantesz1thkg-rgb/zhd.git" target="_blank" class="p-2 glass-panel hover-glass !rounded-full ml-2">
          <Github class="w-4 h-4" />
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Github, Languages } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const { locale } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const scrolled = ref(false)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('user-lang', locale.value)
}

const logout = async () => {
  authStore.signOut()
  await router.push('/admin/login')
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
