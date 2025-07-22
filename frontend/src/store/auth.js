import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as any,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    async logout() {
      await axios.post('/logout')
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    async fetchUser() {
      const res = await axios.get('/me')
      this.user = res.data
    },
  },
})
