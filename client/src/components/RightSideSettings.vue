<template>
  <transition-group
    name="stack"
    tag="div"
    class="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3"
  >
      <div
        v-if="themeNotice"
        key="theme-notice"
        class="max-w-xs rounded-2xl glass-panel px-4 py-3 text-sm shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
      >
        <p class="font-semibold text-primary">{{ themeNotice.titleZh }}</p>
        <p class="mt-1 text-gray-300 leading-relaxed">{{ themeNotice.bodyZh }}</p>
        <p class="mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">{{ themeNotice.titleEn }}</p>
        <p class="mt-1 text-gray-400 leading-relaxed">{{ themeNotice.bodyEn }}</p>
      </div>

    <!-- Menu Items -->
      <div v-if="isOpen" key="settings-menu" class="flex flex-col items-end gap-3">
        <!-- Theme Toggle -->
        <div class="relative">
          <transition name="hint-fade">
            <div
              v-if="showThemeHint"
              class="pointer-events-none absolute right-14 top-1/2 w-56 -translate-y-1/2 rounded-2xl glass-panel px-3 py-2 text-xs leading-relaxed shadow-[0_10px_28px_rgba(15,23,42,0.2)]"
            >
              <p class="text-primary font-medium">点击此按钮可以切换颜色模式</p>
              <p class="mt-1 text-gray-400">Tap this button to switch color mode.</p>
            </div>
          </transition>

          <button 
            @click="toggleTheme" 
            class="w-10 h-10 rounded-full glass-panel hover-glass flex items-center justify-center text-gray-300 hover:text-primary transition-colors group"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Moon v-if="!isDark" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <Sun v-else class="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <!-- Read Mode Toggle -->
        <button 
          @click="toggleReadMode" 
          class="w-10 h-10 rounded-full glass-panel hover-glass flex items-center justify-center text-gray-300 hover:text-primary transition-colors group"
          :title="isReadMode ? 'Exit Read Mode' : 'Enter Read Mode'"
        >
          <BookOpen class="w-5 h-5 group-hover:scale-110 transition-transform" :class="{'text-primary': isReadMode}" />
        </button>

        <!-- Custom Background Color (New Feature) -->
        <div class="relative group">
          <button 
            @click="showColorPicker = !showColorPicker" 
            class="w-10 h-10 rounded-full glass-panel hover-glass flex items-center justify-center text-gray-300 hover:text-primary transition-colors"
            title="Adjust Background Color"
          >
            <Palette class="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <!-- Color Palette Popup -->
          <transition name="fade">
            <div v-if="showColorPicker" class="absolute right-12 top-0 glass-panel p-2 flex gap-2 w-max">
              <button 
                v-for="color in bgColors" 
                :key="color.value"
                @click="changeBgColor(color.value)"
                class="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              ></button>
              <button 
                @click="changeBgColor('')"
                class="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform flex items-center justify-center text-xs"
                title="Reset"
              >↺</button>
            </div>
          </transition>
        </div>

        <!-- Scroll to Top -->
        <button 
          @click="scrollToTop" 
          class="w-10 h-10 rounded-full glass-panel hover-glass flex items-center justify-center text-gray-300 hover:text-primary transition-colors group"
          title="Scroll to Top"
        >
          <ArrowUp class="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

    <!-- Main Toggle Button -->
    <button 
      key="main-toggle"
      @click="isOpen = !isOpen" 
      class="w-12 h-12 rounded-full bg-primary hover:bg-emerald-400 text-darker shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center justify-center transition-all hover:scale-105 z-50"
    >
      <Settings class="w-6 h-6 transition-transform duration-300" :class="{ 'rotate-90': isOpen }" />
    </button>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, watch } from 'vue'
import { Settings, Moon, Sun, BookOpen, Palette, ArrowUp } from 'lucide-vue-next'

const isOpen = ref(false)
const isDark = ref(false)
const isReadMode = ref(false)
const showColorPicker = ref(false)
const themeNotice = ref<{
  titleZh: string
  bodyZh: string
  titleEn: string
  bodyEn: string
} | null>(null)
const showThemeHint = ref(false)
let themeNoticeTimer: number | undefined
let themeHintTimer: number | undefined
const THEME_HINT_SEEN_KEY = 'right-settings-theme-hint-seen'

const bgColors = [
  { name: 'Dark Blue', value: '#0f172a' },
  { name: 'Deep Purple', value: '#170f2a' },
  { name: 'Forest Green', value: '#0f2a1a' },
  { name: 'Charcoal', value: '#1a1a1a' },
  { name: 'Midnight', value: '#000000' },
  { name: 'Warm Sand', value: '#fdfbf7' },
  { name: 'Light Gray', value: '#f1f5f9' },
  { name: 'Mint White', value: '#f0fdf4' }
]

const applyTheme = (theme: 'dark' | 'light') => {
  isDark.value = theme === 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const showAutoThemeNotice = (period: 'day' | 'night', theme: 'dark' | 'light') => {
  const isNight = period === 'night'
  themeNotice.value = {
    titleZh: '智能主题提醒',
    bodyZh: `当前是${isNight ? '天黑' : '天亮'}，已为您切换至${theme === 'dark' ? '深色' : '浅色'}模式。`,
    titleEn: 'Auto Theme Notice',
    bodyEn: `It is ${isNight ? 'nighttime' : 'daytime'}, so the blog has been switched to ${theme} mode.`,
  }

  if (themeNoticeTimer) {
    window.clearTimeout(themeNoticeTimer)
  }

  themeNoticeTimer = window.setTimeout(() => {
    themeNotice.value = null
  }, 5200)
}

const showThemeToggleHint = () => {
  showThemeHint.value = true

  if (themeHintTimer) {
    window.clearTimeout(themeHintTimer)
  }

  themeHintTimer = window.setTimeout(() => {
    showThemeHint.value = false
  }, 3200)
}

const getAutoTheme = () => {
  const hour = new Date().getHours()
  const isNight = hour < 6 || hour >= 18

  return {
    period: isNight ? 'night' : 'day',
    theme: isNight ? 'dark' : 'light',
  } as const
}

const toggleTheme = () => {
  showThemeHint.value = false
  applyTheme(isDark.value ? 'light' : 'dark')

  // If we toggle theme, reset custom background
  changeBgColor('')
}

const toggleReadMode = () => {
  isReadMode.value = !isReadMode.value
  if (isReadMode.value) {
    document.body.classList.add('read-mode')
  } else {
    document.body.classList.remove('read-mode')
  }
}

const isLightColor = (color: string) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

const changeBgColor = (color: string) => {
  if (color) {
    const isLight = isLightColor(color)
    document.documentElement.style.setProperty('--bg-color', color)
    document.documentElement.style.setProperty('--text-color', isLight ? '#1e293b' : '#e5e7eb')
    
    if (isLight) {
      applyTheme('light')
    } else {
      applyTheme('dark')
    }
    
    localStorage.setItem('custom-bg', color)
  } else {
    document.documentElement.style.removeProperty('--bg-color')
    document.documentElement.style.removeProperty('--text-color')
    applyTheme(isDark.value ? 'dark' : 'light')
    localStorage.removeItem('custom-bg')
  }
  showColorPicker.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const { period, theme } = getAutoTheme()
  applyTheme(theme)
  showAutoThemeNotice(period, theme)
  
  // Initialize Custom Background
  const savedBg = localStorage.getItem('custom-bg')
  if (savedBg) {
    changeBgColor(savedBg)
  }
})

watch(isOpen, (open) => {
  if (open) {
    const hasSeenThemeHint = localStorage.getItem(THEME_HINT_SEEN_KEY) === '1'

    if (!hasSeenThemeHint) {
      showThemeToggleHint()
      localStorage.setItem(THEME_HINT_SEEN_KEY, '1')
    }

    return
  }

  showThemeHint.value = false
})

onBeforeUnmount(() => {
  if (themeNoticeTimer) {
    window.clearTimeout(themeNoticeTimer)
  }

  if (themeHintTimer) {
    window.clearTimeout(themeHintTimer)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.stack-move,
.stack-enter-active,
.stack-leave-active {
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease;
}
.stack-enter-from,
.stack-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: all 0.25s ease;
}
.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateX(10px) translateY(-50%) scale(0.98);
}
</style>
