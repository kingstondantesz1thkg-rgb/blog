import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '../api/content'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('admin-token') || '')
  const username = ref(localStorage.getItem('admin-username') || 'admin')

  const isAuthenticated = computed(() => Boolean(token.value))

  function setSession(nextToken: string, nextUsername = 'admin') {
    token.value = nextToken
    username.value = nextUsername
    localStorage.setItem('admin-token', nextToken)
    localStorage.setItem('admin-username', nextUsername)
  }

  async function signIn(form: { username: string; password: string }) {
    const result = await login(form.username, form.password)
    setSession(result.token, form.username)
    return result
  }

  function signOut() {
    token.value = ''
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-username')
  }

  return {
    token,
    username,
    isAuthenticated,
    signIn,
    signOut,
    setSession,
  }
})
