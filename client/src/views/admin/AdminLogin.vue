<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="glass-panel p-10 max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">后台登录</h1>
        <p class="text-gray-400">请输入管理员账号和密码</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">用户名</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="admin"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">密码</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-rose-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary hover:bg-emerald-400 text-darker font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../../api/content'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''
  
  try {
    const res = await login(username.value, password.value)
    localStorage.setItem('admin-token', res.token)
    
    const redirect = route.query.redirect as string || '/admin'
    router.push(redirect)
  } catch (err: any) {
    console.error(err)
    error.value = err.response?.data?.message || '登录失败，请检查账号密码'
  } finally {
    loading.value = false
  }
}
</script>