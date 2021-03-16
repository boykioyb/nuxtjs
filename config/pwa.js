const pwa = () => {
  return {
    manifest: {
      name: 'Tikop Partner',
      short_name: 'Tikop Partner',
      background_color: '#fff',
      description: 'Tikop Partner - UI',
      lang: 'en',
    },
    meta: {
      nativeUI: true,
      ogHost: process.env.META_OG_HOST,
    },
  }
}

export default pwa
