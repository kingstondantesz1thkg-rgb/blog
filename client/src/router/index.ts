import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Posts from '../views/Posts.vue'
import PostDetail from '../views/PostDetail.vue'
import Sponsor from '../views/Sponsor.vue'
import Cooperation from '../views/Cooperation.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/sponsor',
      name: 'Sponsor',
      component: Sponsor
    },
    {
      path: '/cooperation',
      name: 'Cooperation',
      component: Cooperation
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const isAuthenticated = Boolean(localStorage.getItem('admin-token'))

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: '/admin/login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (to.path === '/admin/login' && isAuthenticated) {
    return '/admin'
  }
})

export default router
