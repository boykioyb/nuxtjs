export const getList = ({ $axios }, payload) => {
  return $axios.get('/partner/transactions', { params: payload })
}

export function confirmReceived({ $axios }, payload) {
  return $axios.post('/partner/transactions/confirm-received', payload)
}
export function updateCancel({ $axios }, payload) {
  return $axios.post('/partner/transactions/cancel', payload)
}
