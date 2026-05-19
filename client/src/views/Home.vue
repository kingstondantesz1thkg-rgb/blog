<template>
  <div class="space-y-24">
    <section class="min-h-[calc(100vh-6rem)] flex flex-col">
      <div class="flex-1 flex flex-col justify-center items-start relative pb-10 md:pb-12">
        <button
          type="button"
          @click="goToCooperation"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary text-sm font-medium mb-8 hover-glass transition-transform hover:-translate-y-1"
        >
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          {{ $t('home.status') }}
          <ArrowRight class="w-4 h-4" />
        </button>
        <h1 class="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight mb-6">
          {{ $t('home.greeting') }}
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-teal-400">
            {{ $t('home.name') }}
          </span>
          <br />
          {{ $t('home.role') }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          {{ $t('home.desc') }}
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <router-link
            to="/posts"
            class="px-8 py-4 bg-primary hover:bg-emerald-400 text-darker rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:-translate-y-1 text-lg"
          >
            {{ $t('home.btnBrowsePosts') }}
          </router-link>
          <router-link
            to="/about"
            class="px-8 py-4 glass-panel hover-glass font-semibold hover:-translate-y-1 transition-transform text-lg text-white"
          >
            {{ $t('home.btnExplore') }}
          </router-link>
          <a href="https://github.com/kingstondantesz1thkg-rgb" target="_blank" class="px-8 py-4 glass-panel hover-glass font-semibold flex items-center gap-2 hover:-translate-y-1 transition-transform text-lg text-white">
            <Github class="w-5 h-5" />
            {{ $t('home.btnGithub') }}
          </a>
        </div>
      </div>

      <div
        class="pb-2 md:pb-4 transition-opacity duration-1000 ease-out"
        :class="showScrollDivider ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex items-center gap-4 md:gap-6">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-primary/40"></div>
          <button
            type="button"
            @click="scrollToNextSection"
            class="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_22px_50px_rgba(52,211,153,0.18)]"
            :title="$t('home.scrollNext')"
            :aria-label="$t('home.scrollNext')"
          >
            <span class="absolute inset-0 rounded-full border border-primary/20 opacity-60 group-hover:opacity-100 animate-ping"></span>
            <span class="absolute inset-[6px] rounded-full bg-gradient-to-br from-white/10 to-transparent"></span>
            <img
              :src="scrollDownArrow"
              alt=""
              class="relative z-10 h-5 w-5 rotate-90 opacity-85 transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
          <div class="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-primary/40"></div>
        </div>
        <p class="mt-4 text-center text-sm tracking-[0.3em] text-gray-500 uppercase">
          {{ $t('home.scrollNext') }}
        </p>
      </div>
    </section>

    <section ref="nextSectionRef" class="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-28">
      <div class="glass-panel p-6">
        <div class="text-sm text-gray-400 mb-3">{{ $t('home.apiStatus') }}</div>
        <div class="text-3xl font-bold text-white">{{ meta.status }}</div>
        <div class="text-sm text-gray-400 mt-2">{{ $t('home.apiDesc') }}</div>
      </div>
      <div class="glass-panel p-6">
        <div class="text-sm text-gray-400 mb-3">{{ $t('home.postCount') }}</div>
        <div class="text-3xl font-bold text-white">{{ meta.total }}</div>
        <div class="text-sm text-gray-400 mt-2">{{ $t('home.postCountDesc') }}</div>
      </div>
      <div class="glass-panel p-6">
        <div class="text-sm text-gray-400 mb-3">{{ $t('home.categories') }}</div>
        <div class="text-3xl font-bold text-white">{{ meta.categories }}</div>
        <div class="text-sm text-gray-400 mt-2">{{ $t('home.categoriesDesc') }}</div>
      </div>
    </section>

    <section>
      <div class="flex justify-between items-end mb-10 gap-4">
        <div>
          <h2 class="text-4xl font-bold">{{ $t('home.latestWriting') }}</h2>
          <p class="text-gray-400 mt-3">{{ $t('home.latestWritingDesc') }}</p>
        </div>
        <router-link to="/posts" class="text-primary hover:text-emerald-400 flex items-center gap-1 group font-medium">
          {{ $t('home.viewAll') }}
          <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </router-link>
      </div>

      <div v-if="loading" class="glass-panel p-8 text-gray-300">{{ $t('home.loadingPosts') }}</div>
      <div v-else-if="error" class="glass-panel p-8 text-rose-300">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          v-for="post in posts"
          :key="post._id"
          :to="`/posts/${post._id}`"
          class="glass-panel hover-glass p-8 group flex flex-col justify-between min-h-[240px]"
        >
          <div>
            <div class="flex flex-wrap items-center gap-4 mb-4">
              <span class="text-xs text-primary font-bold tracking-wider uppercase">{{ formatDate(post.createdAt, locale) }}</span>
              <span v-if="getPostCategory(post, locale)" class="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">{{ getPostCategory(post, locale) }}</span>
            </div>
            <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug text-white">
              {{ getPostTitle(post, locale) }}
            </h3>
            <p class="text-gray-400 text-base line-clamp-3 leading-relaxed">
              {{ getPostSummary(post, locale) || summarize(getPostContent(post, locale)) }}
            </p>
          </div>
          <div class="mt-6 flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">
            {{ $t('home.readArticle') }}
            <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Github, ArrowRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getPosts } from '../api/content'
import scrollDownArrow from '../assets/home/scroll-down-arrow.png'
import type { Post } from '../types/content'
import { formatDate } from '../utils/format'
import { getPostCategory, getPostSummary, getPostContent, getPostTitle } from '../utils/content'

const { t, locale } = useI18n()
const router = useRouter()
const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')
const nextSectionRef = ref<HTMLElement | null>(null)
const showScrollDivider = ref(false)
let scrollDividerTimer: number | undefined

const meta = computed(() => {
  const categories = new Set(
    posts.value.map((item) => getPostCategory(item, locale.value)).filter(Boolean)
  )

  return {
    status: error.value ? t('home.apiError') : t('home.apiOnline'),
    total: posts.value.length,
    categories: categories.size,
  }
})

function summarize(content: string) {
  return content.replace(/[#*_`>\-\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120) || t('home.noSummary')
}

function goToCooperation() {
  router.push('/cooperation')
}

function scrollToNextSection() {
  if (nextSectionRef.value) {
    nextSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
}

async function loadPosts() {
  loading.value = true
  error.value = ''

  try {
    const result = await getPosts({ page: 1, limit: 4 })
    posts.value = result.data
  } catch (err) {
    console.error(err)
    error.value = t('home.loadPostsError')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadPosts()
  scrollDividerTimer = window.setTimeout(() => {
    showScrollDivider.value = true
  }, 5200)
})

onBeforeUnmount(() => {
  if (scrollDividerTimer) {
    window.clearTimeout(scrollDividerTimer)
  }
})
</script>
