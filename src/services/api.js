import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3002',
})

export const saveOrder = (patientId, message) => api.post('/orders', { patientId, message })
export const getOrderDetailsAPI = (orderId) => api.get(`/orders/${orderId}`)
export const getPatientsAPI = () => api.get('/patients')
