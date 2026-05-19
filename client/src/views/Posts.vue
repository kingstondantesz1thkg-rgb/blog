<template>
  <div class="space-y-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-white">{{ $t('posts.title') }}</h1>
      <p class="text-xl text-gray-400">{{ $t('posts.subtitle') }}</p>
    </header>

    <div v-if="loading" class="glass-panel p-8 text-center text-gray-300">
      {{ $t('home.loadingPosts') }}
    </div>
    <div v-else-if="error" class="glass-panel p-8 text-center text-rose-400">
      {{ error }}
    </div>
    <div v-else-if="posts.length === 0" class="glass-panel p-8 text-center text-gray-400">
      {{ $t('posts.noPosts') }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        v-for="post in posts"
        :key="post._id"
        :to="`/posts/${post._id}`"
        class="glass-panel hover-glass p-8 group flex flex-col justify-between min-h-[240px]"
      >
        <div>
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <span class="text-xs text-primary font-bold tracking-wider uppercase">
              {{ formatDate(post.createdAt, locale) }}
            </span>
            <span v-if="getPostCategory(post, locale)" class="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
              {{ getPostCategory(post, locale) }}
            </span>
          </div>
          <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug text-white">
            {{ getPostTitle(post, locale) }}
          </h3>
          <p class="text-gray-400 text-base line-clamp-3 leading-relaxed">
            {{ getPostSummary(post, locale) || summarize(getPostContent(post, locale)) }}
          </p>
        </div>
        <div class="mt-6 flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">
          {{ $t('posts.readMore') }}
          <ArrowRight class="w-4 h-4" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { getPosts } from '../api/content'
import type { Post } from '../types/content'
import { formatDate } from '../utils/format'
import { getPostCategory, getPostContent, getPostSummary, getPostTitle } from '../utils/content'

const { t, locale } = useI18n()
const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')

function summarize(content: string) {
  return content.replace(/[#*_`>\-\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120) || t('home.noSummary')
}

async function loadPosts() {
  loading.value = true
  error.value = ''
  try {
    const result = await getPosts({ limit: 100 }) // Load up to 100 for now
    posts.value = result.data
  } catch (err) {
    console.error(err)
    error.value = t('home.loadPostsError')
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)
</script>
