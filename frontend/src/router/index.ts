import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Upload from '../views/Upload.vue'
import Profile from '../views/Profile.vue'
import { useAuthStore } from '../store/auth'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:username',
    name: 'Profile',
    component: Profile,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
