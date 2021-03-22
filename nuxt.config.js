import { pwa } from './config'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tikop_partner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#000' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main'],
  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },
  tailwindcss: {
    jit: true,
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/models', '~/plugins/axios', '~/plugins/common'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['@nuxtjs/axios'],
    // https://go.nuxtjs.dev/pwa
    ['@nuxtjs/pwa', pwa()],
    ['@nuxtjs/auth-next'],
    '@nuxtjs/style-resources',
  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/partner/login',
            method: 'post',
            propertyName: 'data.data.user.accessToken.token',
          },
          logout: false,
          user: false,
        },
      },
    },
    redirect: {
      login: '/auth/login',
      callback: '/',
      logout: '/auth/login',
      home: '/',
    },
    fullPathRedirect: true,
    plugins: ['~/plugins/axios.js'],
  },
  router: {
    middleware: ['auth'],
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[chunkhash].js'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  publicRuntimeConfig: {
    baseURL: process.env.API_BASE_URL || 'https://nuxtjs.org',
  },
}
