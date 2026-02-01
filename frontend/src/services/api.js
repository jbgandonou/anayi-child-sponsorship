import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const childService = {
  // Create a new child record
  async create(childData) {
    const response = await api.post('/children', childData)
    return response.data
  },

  // Upload files
  async uploadFiles(files) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const response = await api.post('/children/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get all children
  async getAll() {
    const response = await api.get('/children')
    return response.data
  },

  // Get one child
  async getOne(id) {
    const response = await api.get(`/children/${id}`)
    return response.data
  },

  // Update child
  async update(id, data) {
    const response = await api.patch(`/children/${id}`, data)
    return response.data
  },

  // Update status
  async updateStatus(id, status) {
    const response = await api.patch(`/children/${id}/status`, { status })
    return response.data
  },

  // Delete child
  async delete(id) {
    const response = await api.delete(`/children/${id}`)
    return response.data
  },

  // Get by status
  async getByStatus(status) {
    const response = await api.get(`/children/status/${status}`)
    return response.data
  },
}

export default api
