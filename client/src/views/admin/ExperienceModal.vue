<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="glass-panel w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ isEditMode ? '编辑经历' : '新增经历' }}</h2>
          <p class="text-sm text-gray-400 mt-1">支持中英双语内容，前台会随语言切换自动展示。</p>
        </div>
        <button
          @click="close"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">项目名称（中文）*</label>
            <input
              v-model="form.projectName.zh"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Project Name (English)</label>
            <input
              v-model="form.projectName.en"
              type="text"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">时间周期（中文）</label>
            <input
              v-model="form.duration.zh"
              type="text"
              placeholder="如：2023 - 2024"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Duration (English)</label>
            <input
              v-model="form.duration.en"
              type="text"
              placeholder="e.g. 2023 - 2024"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">技术栈 (逗号分隔)</label>
          <input
            v-model="techStackStr"
            type="text"
            placeholder="如：Vue, Node.js, MongoDB"
            class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">项目描述（中文）*</label>
            <textarea
              v-model="form.description.zh"
              required
              rows="4"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Description (English)</label>
            <textarea
              v-model="form.description.en"
              rows="4"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">主要成就（中文）</label>
            <textarea
              v-model="form.achievement.zh"
              rows="3"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Achievement (English)</label>
            <textarea
              v-model="form.achievement.en"
              rows="3"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">排序 (数字越小越靠前)</label>
          <input
            v-model.number="form.sortOrder"
            type="number"
            class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

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
            {{ submitting ? '保存中...' : isEditMode ? '更新' : '保存' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Experience, ExperiencePayload, LocalizedText } from '../../types/content'
import { createExperience, updateExperience } from '../../api/content'
import { createEmptyLocalizedText, toLocalizedText } from '../../utils/content'

const props = defineProps<{
  modelValue: boolean
  experience?: Experience | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved', experience: Experience): void
}>()

const submitting = ref(false)
const techStackStr = ref('')
const isEditMode = computed(() => Boolean(props.experience?._id))

interface ExperienceFormState {
  projectName: LocalizedText
  description: LocalizedText
  achievement: LocalizedText
  duration: LocalizedText
  sortOrder: number
  techStack?: string[]
}

function createEmptyForm(): ExperienceFormState {
  return {
    projectName: createEmptyLocalizedText(),
    description: createEmptyLocalizedText(),
    achievement: createEmptyLocalizedText(),
    duration: createEmptyLocalizedText(),
    sortOrder: 0,
  }
}

const form = ref<ExperienceFormState>(createEmptyForm())

watch(() => props.modelValue, (val) => {
  if (val) {
    if (props.experience) {
      form.value = {
        projectName: toLocalizedText(props.experience.projectName),
        description: toLocalizedText(props.experience.description),
        achievement: toLocalizedText(props.experience.achievement),
        duration: toLocalizedText(props.experience.duration),
        sortOrder: props.experience.sortOrder ?? 0,
        techStack: [...(props.experience.techStack || [])],
      }
      techStackStr.value = (props.experience.techStack || []).join(', ')
    } else {
      form.value = createEmptyForm()
      techStackStr.value = ''
    }
  }
})

function close() {
  emit('update:modelValue', false)
}

async function handleSubmit() {
  const hasProjectName = Boolean(toLocalizedText(form.value.projectName).zh?.trim())
  const hasDescription = Boolean(toLocalizedText(form.value.description).zh?.trim())

  if (!hasProjectName || !hasDescription) {
    alert('请至少填写中文项目名称和中文项目描述')
    return
  }

  submitting.value = true
  try {
    const payload: ExperiencePayload = {
      ...form.value,
      projectName: toLocalizedText(form.value.projectName),
      description: toLocalizedText(form.value.description),
      achievement: toLocalizedText(form.value.achievement),
      duration: toLocalizedText(form.value.duration),
    }

    if (techStackStr.value) {
      payload.techStack = techStackStr.value.split(',').map(s => s.trim()).filter(Boolean)
    }

    const savedExp = props.experience?._id
      ? await updateExperience(props.experience._id, payload)
      : await createExperience(payload)

    emit('saved', savedExp)
    close()
  } catch (err) {
    console.error(err)
    alert('保存失败，请检查控制台或网络状态')
  } finally {
    submitting.value = false
  }
}
</script>
