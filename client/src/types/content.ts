export interface LocalizedText {
  zh?: string
  en?: string
}

export type LocalizedValue = string | LocalizedText

export interface Post {
  _id: string
  title: LocalizedValue
  content: LocalizedValue
  summary: LocalizedValue
  category: LocalizedValue
  tags: string[]
  coverImage: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Experience {
  _id: string
  projectName: LocalizedValue
  techStack: string[]
  description: LocalizedValue
  achievement: LocalizedValue
  duration: LocalizedValue
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface PostListResponse {
  total: number
  data: Post[]
  page: number
  limit: number
}

export interface AdminSummary {
  postCount: number
  experienceCount: number
  latestPosts: Post[]
  latestExperiences: Experience[]
}

export interface LoginResponse {
  token: string
  message: string
}

export interface PostPayload {
  title: LocalizedValue
  content: LocalizedValue
  summary?: LocalizedValue
  category?: LocalizedValue
  tags?: string[] | string
  coverImage?: string
  isPublished?: boolean
}

export interface ExperiencePayload {
  projectName: LocalizedValue
  techStack?: string[] | string
  description: LocalizedValue
  achievement?: LocalizedValue
  duration?: LocalizedValue
  sortOrder?: number
}
