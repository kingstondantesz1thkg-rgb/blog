<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="glass-panel w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ isEditMode ? '编辑文章' : '新增文章' }}</h2>
          <p class="text-sm text-gray-400 mt-1">支持中英双语标题、分类、摘要和正文内容。</p>
        </div>
        <button
          @click="close"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">标题（中文）*</label>
            <input
              v-model="form.title.zh"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Title (English)</label>
            <input
              v-model="form.title.en"
              type="text"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">分类（中文）</label>
            <input
              v-model="form.category.zh"
              type="text"
              placeholder="如：前端、随笔、架构"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Category (English)</label>
            <input
              v-model="form.category.en"
              type="text"
              placeholder="e.g. Frontend, Notes, Architecture"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">摘要（中文）</label>
            <textarea
              v-model="form.summary.zh"
              rows="3"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Summary (English)</label>
            <textarea
              v-model="form.summary.en"
              rows="3"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">标签 (逗号分隔)</label>
          <input
            v-model="tagsText"
            type="text"
            placeholder="Vue, TypeScript, Node.js"
            class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">封面图 URL</label>
          <input
            v-model="form.coverImage"
            type="url"
            placeholder="https://example.com/cover.jpg"
            class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">正文（中文）*</label>
            <textarea
              v-model="form.content.zh"
              rows="14"
              required
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Content (English)</label>
            <textarea
              v-model="form.content.en"
              rows="14"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
        </div>

        <label class="inline-flex items-center gap-3 text-sm text-gray-300">
          <input v-model="form.isPublished" type="checkbox" class="accent-emerald-400" />
          立即发布
        </label>

        <div class="sticky bottom-0 z-10 -mx-6 mt-2 flex justify-end gap-3 border-t border-white/10 bg-[rgba(2,6,23,0.82)] px-6 py-4 backdrop-blur-md">
          <button
            type="button"
            @click="close"
            class="inline-flex min-h-11 min-w-[112px] items-center justify-center rounded-lg border border-white/10 px-5 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex min-h-11 min-w-[132px] items-center justify-center rounded-lg bg-primary px-5 py-2 text-darker font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {{ submitting ? '保存中...' : isEditMode ? '更新文章' : '保存文章' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createPost, updatePost } from '../../api/content'
import type { LocalizedText, Post, PostPayload } from '../../types/content'
import { createEmptyLocalizedText, toLocalizedText } from '../../utils/content'

const props = defineProps<{
  modelValue: boolean
  post?: Post | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved', post: Post): void
}>()

interface PostFormState {
  title: LocalizedText
  content: LocalizedText
  summary: LocalizedText
  category: LocalizedText
  coverImage: string
  isPublished: boolean
  tags?: string[]
}

const submitting = ref(false)
const tagsText = ref('')
const isEditMode = computed(() => Boolean(props.post?._id))

function createEmptyForm(): PostFormState {
  return {
    title: createEmptyLocalizedText(),
    content: createEmptyLocalizedText(),
    summary: createEmptyLocalizedText(),
    category: createEmptyLocalizedText(),
    coverImage: '',
    isPublished: true,
    tags: [],
  }
}

const form = ref<PostFormState>(createEmptyForm())

function resetForm() {
  form.value = createEmptyForm()
  tagsText.value = ''
}

function syncFormWithPost() {
  if (props.post) {
    form.value = {
      title: toLocalizedText(props.post.title),
      content: toLocalizedText(props.post.content),
      summary: toLocalizedText(props.post.summary),
      category: toLocalizedText(props.post.category),
      coverImage: props.post.coverImage || '',
      isPublished: props.post.isPublished ?? true,
      tags: [...(props.post.tags || [])],
    }
    tagsText.value = (props.post.tags || []).join(', ')
    return
  }

  resetForm()
}

watch([() => props.modelValue, () => props.post], ([isOpen]) => {
  if (!isOpen) return
  syncFormWithPost()
})

function close() {
  resetForm()
  emit('update:modelValue', false)
}

async function handleSubmit() {
  const hasTitle = Boolean(toLocalizedText(form.value.title).zh?.trim())
  const hasContent = Boolean(toLocalizedText(form.value.content).zh?.trim())

  if (!hasTitle || !hasContent) {
    alert('请至少填写中文标题和中文正文')
    return
  }

  submitting.value = true

  try {
    const payload: PostPayload = {
      title: toLocalizedText(form.value.title),
      content: toLocalizedText(form.value.content),
      summary: toLocalizedText(form.value.summary),
      category: toLocalizedText(form.value.category),
      coverImage: form.value.coverImage.trim(),
      isPublished: form.value.isPublished,
    }

    if (tagsText.value.trim()) {
      payload.tags = tagsText.value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }

    const savedPost = props.post?._id
      ? await updatePost(props.post._id, payload)
      : await createPost(payload)

    emit('saved', savedPost)
    close()
  } catch (error) {
    console.error(error)
    alert('文章保存失败，请检查接口或网络状态')
  } finally {
    submitting.value = false
  }
}
</script>
