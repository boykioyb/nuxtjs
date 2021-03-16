const auth = () => {
  return {
    cookie: false,
    resetOnError: true,
    watchLoggedIn: true,
    redirect: {
      login: '/auth/login',
      logout: false,
      home: false,
      callback: '/auth/callback',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/authentications/login',
            method: 'post',
          },
          logout: { url: '/authentications/logout', method: 'post' },
          user: { url: '/users/me', method: 'get', propertyName: '' },
        },
        token: {
          property: 'accessToken',
          required: true,
          name: 'x-access-token',
          type: false,
        },
        user: {
          property: '',
        },
      },
    },
  }
}

export default auth
