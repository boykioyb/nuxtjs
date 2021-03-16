<template>
  <v-app>
    <nuxt v-show="$nuxt.isOnline" />
    <div v-show="$nuxt.isOffline">
      <PageOffline />
    </div>
  </v-app>
</template>
<script>
import PageOffline from '~/components/layout/common/PageOffline.vue'

export default {
  name: 'LayoutBlank',
  components: {
    PageOffline,
  },
}
</script>
