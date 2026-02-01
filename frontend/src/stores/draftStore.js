import { defineStore } from 'pinia'
import { ref } from 'vue'
import { childService } from '../services/api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useDraftStore = defineStore('draft', () => {
  const drafts = ref([])
  const currentDraft = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function saveDraft(formData, currentStep) {
    isLoading.value = true
    error.value = null
    try {
      if (currentDraft.value) {
        // Update existing draft
        const response = await childService.api.patch(`${API_URL}/drafts/${currentDraft.value.id}`, {
          formData,
          currentStep
        })
        currentDraft.value = response.data
      } else {
        // Create new draft
        const response = await childService.api.post(`${API_URL}/drafts`, {
          formData,
          currentStep
        })
        currentDraft.value = response.data
      }
      return currentDraft.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to save draft'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function loadDrafts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await childService.api.get(`${API_URL}/drafts`)
      drafts.value = response.data
      return drafts.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load drafts'
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function loadDraft(id) {
    isLoading.value = true
    error.value = null
    try {
      const response = await childService.api.get(`${API_URL}/drafts/${id}`)
      currentDraft.value = response.data
      return currentDraft.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load draft'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function deleteDraft(id) {
    isLoading.value = true
    error.value = null
    try {
      await childService.api.delete(`${API_URL}/drafts/${id}`)
      drafts.value = drafts.value.filter(d => d.id !== id)
      if (currentDraft.value?.id === id) {
        currentDraft.value = null
      }
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete draft'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function completeDraft(id) {
    isLoading.value = true
    error.value = null
    try {
      await childService.api.patch(`${API_URL}/drafts/${id}/complete`)
      currentDraft.value = null
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to complete draft'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function clearCurrentDraft() {
    currentDraft.value = null
  }

  return {
    drafts,
    currentDraft,
    isLoading,
    error,
    saveDraft,
    loadDrafts,
    loadDraft,
    deleteDraft,
    completeDraft,
    clearCurrentDraft
  }
})
