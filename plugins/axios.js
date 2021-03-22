export default function ({ $axios, redirect, $config }) {
  $axios.setBaseURL($config.baseURL)
  $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      console.log(code)
    }
    if (code === 401) {
      console.log(code)
      redirect('/auth/login')
    }
    if (code === 403) {
      console.log(code)
      redirect('/auth/login')
    }
    if (code === 404) {
      console.log(code)
    }
    if (code === 500) {
      console.log(code)
    }
  })
  $axios.interceptors.response.use((response) => {
    if (response.data && !response.data.success && response.data.error && response.data.error.code === 1200) {
      redirect('/auth/logout')
      return false
    }
    return response
  })
}
