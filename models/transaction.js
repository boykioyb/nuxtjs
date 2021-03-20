export const getList = ({ $axios }, payload) => {
  return $axios.get('/partner/transactions', { params: payload })
}
