<template>
  <div>
    <nuxt v-show="$nuxt.isOnline" />
    <div v-show="$nuxt.isOffline">
      <PageOffline />
    </div>
  </div>
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
