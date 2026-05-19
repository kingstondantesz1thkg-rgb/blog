<template>
  <div class="space-y-24 max-w-5xl mx-auto py-10">
    <!-- Header -->
    <header class="text-center space-y-8">
      <div class="relative w-40 h-40 mx-auto">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary animate-spin-slow opacity-50 blur-xl"></div>
        <div class="relative w-full h-full rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shadow-2xl">
          <div class="w-full h-full rounded-full bg-darker flex items-center justify-center overflow-hidden border-4 border-darker">
            <User class="w-20 h-20 text-gray-400" />
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-white">{{ $t('about.name') }}</h1>
        <p class="text-2xl text-primary font-medium mb-6">{{ $t('about.role') }}</p>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {{ $t('about.desc') }}
        </p>
      </div>
    </header>

    <!-- Core Skills -->
    <section class="glass-panel p-8 md:p-12 relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white relative z-10">
        <Code2 class="w-8 h-8 text-primary" />
        {{ $t('about.coreCapabilities') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white border-b border-white/10 pb-4">{{ $t('about.frontend') }}</h3>
          <ul class="space-y-4">
            <li v-for="skill in ['Vue 3 / React', 'TypeScript / JavaScript', 'TailwindCSS / Sass', 'Vite / Webpack']" :key="skill" class="flex items-center gap-3 text-gray-300 text-lg">
              <CheckCircle2 class="w-5 h-5 text-secondary shrink-0" />
              {{ skill }}
            </li>
          </ul>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white border-b border-white/10 pb-4">{{ $t('about.backend') }}</h3>
          <ul class="space-y-4">
            <li v-for="skill in ['Node.js / Express', 'Python / Django', 'Java / Spring Boot', 'RESTful API Design']" :key="skill" class="flex items-center gap-3 text-gray-300 text-lg">
              <CheckCircle2 class="w-5 h-5 text-secondary shrink-0" />
              {{ skill }}
            </li>
          </ul>
        </div>
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white border-b border-white/10 pb-4">{{ $t('about.devops') }}</h3>
          <ul class="space-y-4">
            <li v-for="skill in ['Docker / CI/CD', 'MongoDB / MySQL', 'Redis Caching', 'Linux / Nginx']" :key="skill" class="flex items-center gap-3 text-gray-300 text-lg">
              <CheckCircle2 class="w-5 h-5 text-secondary shrink-0" />
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Project Experience Timeline -->
    <section>
      <h2 class="text-4xl font-bold mb-16 flex items-center gap-4 text-white">
        <Briefcase class="w-10 h-10 text-primary" />
        {{ $t('about.projectExp') }}
      </h2>
      
      <div v-if="loading" class="text-center text-gray-400 py-8">{{ locale === 'en' ? 'Loading project experiences...' : '正在加载项目经历...' }}</div>
      <div v-else-if="error" class="text-center text-rose-400 py-8">{{ error }}</div>
      <div v-else class="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent before:rounded-full">
        
        <div v-for="(exp, index) in experiences" :key="exp._id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-darker bg-gradient-to-br from-primary to-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            <Rocket class="w-5 h-5" v-if="index % 2 === 0" />
            <Building2 class="w-5 h-5" v-else />
          </div>
          <div class="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-panel p-8 hover-glass transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-2">
              <h3 class="font-bold text-2xl text-white">{{ getExperienceName(exp, locale) }}</h3>
              <span class="text-sm font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 whitespace-nowrap">{{ getExperienceDuration(exp, locale) }}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-6" v-if="exp.techStack && exp.techStack.length">
              <span v-for="tech in exp.techStack" :key="tech" class="text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">{{ tech }}</span>
            </div>
            <p class="text-base text-gray-400 mb-6 leading-relaxed">
              {{ getExperienceDescription(exp, locale) }}
            </p>
            <div class="p-4 rounded-xl bg-white/5 border border-white/5" v-if="getExperienceAchievement(exp, locale)">
              <div class="text-sm font-medium text-gray-300 flex items-start gap-3">
                <Trophy class="w-5 h-5 text-yellow-500 shrink-0" />
                <span class="leading-relaxed">{{ getExperienceAchievement(exp, locale) }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Code2, CheckCircle2, Briefcase, Rocket, Building2, Trophy } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { getExperiences } from '../api/content'
import type { Experience } from '../types/content'
import {
  getExperienceAchievement,
  getExperienceDescription,
  getExperienceDuration,
  getExperienceName,
} from '../utils/content'

const { locale } = useI18n()
const experiences = ref<Experience[]>([])
const loading = ref(true)
const error = ref('')

async function loadExperiences() {
  loading.value = true
  error.value = ''
  try {
    experiences.value = await getExperiences()
  } catch (err) {
    console.error(err)
    error.value = locale.value === 'en' ? 'Failed to load experiences' : '经历加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadExperiences)
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
</style>
