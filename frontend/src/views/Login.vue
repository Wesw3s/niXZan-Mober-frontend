<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="entrar">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const entrar = async () => {
  try {
    await auth.login(email.value, password.value)
    await auth.fetchUser()
    router.push('/')
  } catch (e) {
    alert('Erro ao fazer login')
  }
}
</script>
