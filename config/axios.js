const axios = () => {
  return {
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000,
  }
}

export default axios
