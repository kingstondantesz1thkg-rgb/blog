<template>
  <div class="max-w-4xl mx-auto py-8">
    <div v-if="loading" class="glass-panel p-8 text-center text-gray-300">
      {{ $t('home.loadingPosts') }}
    </div>
    <div v-else-if="error" class="glass-panel p-8 text-center text-rose-400">
      {{ error }}
    </div>
    <div v-else-if="post" class="space-y-8">
      <router-link to="/posts" class="inline-flex items-center gap-2 text-primary hover:text-emerald-400 transition-colors">
        <ArrowLeft class="w-4 h-4" /> {{ $t('posts.backToList') }}
      </router-link>

      <header class="space-y-4 border-b border-white/10 pb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight">{{ getPostTitle(post, locale) }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
          <span>{{ formatDate(post.createdAt, locale) }}</span>
          <span v-if="getPostCategory(post, locale)" class="px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
            {{ getPostCategory(post, locale) }}
          </span>
        </div>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 pt-2">
          <span v-for="tag in post.tags" :key="tag" class="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
            #{{ tag }}
          </span>
        </div>
      </header>

      <div class="prose prose-invert prose-emerald max-w-none">
        <div v-html="parsedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { getPostById } from '../api/content'
import type { Post } from '../types/content'
import { formatDate } from '../utils/format'
import { getPostCategory, getPostContent, getPostTitle } from '../utils/content'
import { renderMarkdown } from '../utils/markdown'

const route = useRoute()
const { t, locale } = useI18n()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref('')

const parsedContent = computed(() => {
  if (!post.value?.content) return ''
  return renderMarkdown(getPostContent(post.value, locale.value))
})

async function loadPost() {
  const id = route.params.id as string
  if (!id) return
  
  loading.value = true
  error.value = ''
  try {
    post.value = await getPostById(id)
  } catch (err) {
    console.error(err)
    error.value = t('posts.postNotFound')
  } finally {
    loading.value = false
  }
}

onMounted(loadPost)
</script>

