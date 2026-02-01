<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo-section">
        <img src="@/assets/anayi-logo.jpg" alt="Anayi Logo" class="logo-image">
   
      </div>

      <div class="auth-form">
        <h2>Create Account</h2>
        <p class="subtitle">Join us to help children in need</p>

        <div v-if="authStore.error" class="alert alert-error">
          {{ authStore.error }}
        </div>

        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input v-model="firstName" type="text" required class="form-control">
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input v-model="lastName" type="text" required class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input v-model="email" type="email" required placeholder="you@example.com" class="form-control">
          </div>

          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" required placeholder="Minimum 6 characters" class="form-control">
          </div>

          <div class="form-group">
            <label>Phone (Optional)</label>
            <input v-model="phone" type="tel" class="form-control" placeholder="+229 XX XX XX XX">
          </div>

          <div class="form-group">
            <label>Organization (Optional)</label>
            <input v-model="organization" type="text" class="form-control" placeholder="Your organization">
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const organization = ref('')

async function handleRegister() {
  const success = await authStore.register({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    phone: phone.value || undefined,
    organization: organization.value || undefined
  })
  
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; }
.auth-card { background: #fff; border-radius: 12px; padding: 3rem; max-width: 500px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
.logo-section { text-align: center; margin-bottom: 2rem; }
.logo-image { height: 64px; width: auto; margin-bottom: 1rem; border-radius: 8px; }
.logo-section h1 { font-size: 2rem; font-weight: 700; color: #2D3748; margin-top: 0.5rem; }
.auth-form h2 { font-size: 1.5rem; font-weight: 700; color: #1A202C; margin-bottom: 0.5rem; }
.subtitle { color: #718096; font-size: 0.875rem; margin-bottom: 2rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-size: 0.875rem; font-weight: 600; color: #2D3748; margin-bottom: 0.5rem; }
.form-control { width: 100%; padding: 0.75rem; border: 1px solid #CBD5E0; border-radius: 6px; font-size: 0.875rem; }
.form-control:focus { outline: none; border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
.btn-block { width: 100%; }
.btn-primary { background: #FF6B35; color: #fff; padding: 0.875rem; border: none; border-radius: 6px; font-weight: 600; font-size: 0.875rem; transition: all 0.2s; }
.btn-primary:hover:not(:disabled) { background: #E55A2B; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-footer { text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: #718096; }
.auth-footer a { color: #FF6B35; font-weight: 600; text-decoration: none; }
.alert { padding: 0.875rem; border-radius: 6px; margin-bottom: 1.5rem; font-size: 0.875rem; }
.alert-error { background: #FED7D7; color: #C53030; }
@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>
