<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center border-b border-white/10 pb-6">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">后台管理面板</h1>
        <p class="text-gray-400 text-sm">管理您的博客内容与项目经历</p>
      </div>
      <button @click="logout" class="inline-flex min-h-11 items-center justify-center rounded-lg bg-rose-500/20 px-5 py-2 text-sm text-rose-400 hover:bg-rose-500/30 transition-colors">
        退出登录
      </button>
    </header>

    <div class="flex gap-4 border-b border-white/10">
      <button 
        @click="activeTab = 'posts'" 
        :class="['pb-3 px-4 font-medium transition-colors border-b-2', activeTab === 'posts' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white']"
      >
        文章管理
      </button>
      <button 
        @click="activeTab = 'experiences'" 
        :class="['pb-3 px-4 font-medium transition-colors border-b-2', activeTab === 'experiences' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white']"
      >
        经历管理
      </button>
    </div>

    <!-- Posts Tab -->
    <div v-if="activeTab === 'posts'" class="space-y-6">
      <div class="flex justify-end">
        <button @click="openCreatePost" class="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2 text-darker font-bold hover:bg-emerald-400 transition-colors">
          + 新增文章
        </button>
      </div>
      <div v-if="loadingPosts" class="text-center text-gray-400 py-8">加载中...</div>
      <div v-else class="glass-panel overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-white/5 border-b border-white/10">
            <tr>
              <th class="p-4 text-gray-300 font-semibold">标题</th>
              <th class="p-4 text-gray-300 font-semibold">分类</th>
              <th class="p-4 text-gray-300 font-semibold">日期</th>
              <th class="p-4 text-gray-300 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="post in posts" :key="post._id" class="hover:bg-white/5 transition-colors">
              <td class="p-4 text-white font-medium">{{ getPostTitle(post, locale) }}</td>
              <td class="p-4 text-gray-400">{{ getPostCategory(post, locale) }}</td>
              <td class="p-4 text-gray-400">{{ formatDate(post.createdAt, locale) }}</td>
              <td class="p-4">
                <div class="flex flex-wrap gap-2">
                  <button @click="openEditPost(post)" class="inline-flex min-h-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-primary hover:text-emerald-400 hover:border-primary/40 transition-colors">
                    编辑
                  </button>
                  <button @click="handleDeletePost(post._id)" class="inline-flex min-h-10 items-center justify-center rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-rose-400 hover:text-rose-300 hover:border-rose-400/40 transition-colors">
                    删除
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!posts.length">
              <td colspan="4" class="p-8 text-center text-gray-400">暂无文章</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Experiences Tab -->
    <div v-if="activeTab === 'experiences'" class="space-y-6">
      <div class="flex justify-end">
        <button @click="openCreateExp" class="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2 text-darker font-bold hover:bg-emerald-400 transition-colors">
          + 新增经历
        </button>
      </div>
      <div v-if="loadingExps" class="text-center text-gray-400 py-8">加载中...</div>
      <div v-else class="glass-panel overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-white/5 border-b border-white/10">
            <tr>
              <th class="p-4 text-gray-300 font-semibold">项目名称</th>
              <th class="p-4 text-gray-300 font-semibold">时间周期</th>
              <th class="p-4 text-gray-300 font-semibold">排序</th>
              <th class="p-4 text-gray-300 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="exp in experiences" :key="exp._id" class="hover:bg-white/5 transition-colors">
              <td class="p-4 text-white font-medium">{{ getExperienceName(exp, locale) }}</td>
              <td class="p-4 text-gray-400">{{ getExperienceDuration(exp, locale) }}</td>
              <td class="p-4 text-gray-400">{{ exp.sortOrder }}</td>
              <td class="p-4">
                <div class="flex flex-wrap gap-2">
                  <button @click="openEditExp(exp)" class="inline-flex min-h-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-primary hover:text-emerald-400 hover:border-primary/40 transition-colors">
                    编辑
                  </button>
                  <button @click="handleDeleteExp(exp._id)" class="inline-flex min-h-10 items-center justify-center rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-rose-400 hover:text-rose-300 hover:border-rose-400/40 transition-colors">
                    删除
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!experiences.length">
              <td colspan="4" class="p-8 text-center text-gray-400">暂无经历</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <PostModal
      :model-value="showPostModal"
      :post="editingPost"
      @update:model-value="handlePostModalChange"
      @saved="onPostSaved"
    />

    <ExperienceModal
      v-model="showExpModal"
      :experience="editingExperience"
      @saved="onExpSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getPosts, deletePost, getExperiences, deleteExperience } from '../../api/content'
import type { Post, Experience } from '../../types/content'
import { formatDate } from '../../utils/format'
import {
  getExperienceDuration,
  getExperienceName,
  getPostCategory,
  getPostTitle,
} from '../../utils/content'
import PostModal from './PostModal.vue'
import ExperienceModal from './ExperienceModal.vue'

const router = useRouter()
const { locale } = useI18n()
const activeTab = ref<'posts' | 'experiences'>('posts')

const posts = ref<Post[]>([])
const loadingPosts = ref(true)
const showPostModal = ref(false)
const editingPost = ref<Post | null>(null)

const experiences = ref<Experience[]>([])
const loadingExps = ref(true)
const showExpModal = ref(false)
const editingExperience = ref<Experience | null>(null)

function sortExperiences() {
  experiences.value.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

async function loadPostsData() {
  try {
    loadingPosts.value = true
    const pRes = await getPosts({ limit: 100 })
    posts.value = pRes.data
  } catch (err) {
    console.error(err)
  } finally {
    loadingPosts.value = false
  }
}

async function loadExperiencesData() {
  try {
    loadingExps.value = true
    experiences.value = await getExperiences()
    sortExperiences()
  } catch (err) {
    console.error(err)
  } finally {
    loadingExps.value = false
  }
}

function handlePostModalChange(value: boolean) {
  showPostModal.value = value

  if (!value) {
    editingPost.value = null
  }
}

async function onPostSaved(savedPost: Post) {
  const index = posts.value.findIndex((item) => item._id === savedPost._id)

  if (index === -1) {
    posts.value.unshift(savedPost)
  } else {
    posts.value[index] = savedPost
  }

  handlePostModalChange(false)
  await loadPostsData()
}

function onExpSaved(savedExp: Experience) {
  const index = experiences.value.findIndex((item) => item._id === savedExp._id)

  if (index === -1) {
    experiences.value.push(savedExp)
  } else {
    experiences.value[index] = savedExp
  }

  sortExperiences()
  editingExperience.value = null
}

function openCreateExp() {
  editingExperience.value = null
  showExpModal.value = true
}

function openCreatePost() {
  editingPost.value = null
  showPostModal.value = true
}

function openEditPost(post: Post) {
  editingPost.value = post
  showPostModal.value = true
}

function openEditExp(experience: Experience) {
  editingExperience.value = experience
  showExpModal.value = true
}

async function loadData() {
  await loadPostsData()
  await loadExperiencesData()
}

async function handleDeletePost(id: string) {
  if (!confirm('确定要删除这篇文章吗？')) return
  try {
    await deletePost(id)
    posts.value = posts.value.filter(p => p._id !== id)
  } catch (err) {
    alert('删除失败')
  }
}

async function handleDeleteExp(id: string) {
  if (!confirm('确定要删除这段经历吗？')) return
  try {
    await deleteExperience(id)
    experiences.value = experiences.value.filter(e => e._id !== id)
  } catch (err) {
    alert('删除失败')
  }
}

function logout() {
  localStorage.removeItem('admin-token')
  router.push('/admin/login')
}

onMounted(loadData)
</script>
