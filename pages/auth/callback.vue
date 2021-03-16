<template>
  <div></div>
</template>

<script>
export default {
  name: 'AuthCallback',
  layout: 'blank',
  async asyncData({ $axios, $auth, redirect }) {
    try {
      const { accessToken, status } = await $axios.$post(
        'authentications/login/google',
        {},
        { progress: false }
      )
      $auth.setStrategy('local')
      $auth.strategy.token.set(accessToken)
      const user = await $axios.$get('/users/me', {
        progress: false,
      })
      $auth.setUser(user)
      if (status === 2) {
        redirect('/setting/profile')
      } else {
        redirect('/')
      }
    } catch (e) {
      $auth.logout()
      redirect('/auth/login')
    }
  },
}
</script>
