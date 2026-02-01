import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  // Configure axios with token
  function setAuthHeader() {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData)
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', token.value)
      setAuthHeader()
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function login(credentials) {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', token.value)
      setAuthHeader()
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProfile() {
    if (!token.value) return
    
    setAuthHeader()
    try {
      const response = await axios.get(`${API_URL}/auth/me`)
      user.value = response.data
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      logout()
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  async function updateProfile(userData) {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.patch(`${API_URL}/auth/profile`, userData)
      user.value = response.data
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Update failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function changePassword(passwords) {
    isLoading.value = true
    error.value = null
    try {
      await axios.post(`${API_URL}/auth/change-password`, passwords)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Password change failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Initialize on store creation
  if (token.value) {
    setAuthHeader()
    fetchProfile()
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
    setAuthHeader
  }
})
