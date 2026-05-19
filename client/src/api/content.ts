import api from './http'
import type {
  AdminSummary,
  Experience,
  ExperiencePayload,
  LoginResponse,
  Post,
  PostListResponse,
  PostPayload,
} from '../types/content'

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResponse>('/auth/login', { username, password })
  return data
}

export async function getPosts(params?: { page?: number; limit?: number; category?: string }) {
  const { data } = await api.get<PostListResponse>('/posts', { params })
  return data
}

export async function getPostById(id: string) {
  const { data } = await api.get<Post>(`/posts/${id}`)
  return data
}

export async function createPost(payload: PostPayload) {
  const { data } = await api.post<Post>('/posts', payload)
  return data
}

export async function updatePost(id: string, payload: Partial<PostPayload>) {
  const { data } = await api.put<Post>(`/posts/${id}`, payload)
  return data
}

export async function deletePost(id: string) {
  const { data } = await api.delete<{ message: string }>(`/posts/${id}`)
  return data
}

export async function getExperiences() {
  const { data } = await api.get<Experience[]>('/experiences')
  return data
}

export async function createExperience(payload: ExperiencePayload) {
  const { data } = await api.post<Experience>('/experiences', payload)
  return data
}

export async function updateExperience(id: string, payload: Partial<ExperiencePayload>) {
  const { data } = await api.put<Experience>(`/experiences/${id}`, payload)
  return data
}

export async function deleteExperience(id: string) {
  const { data } = await api.delete<{ message: string }>(`/experiences/${id}`)
  return data
}

export async function getAdminSummary() {
  const { data } = await api.get<AdminSummary>('/admin/summary')
  return data
}
