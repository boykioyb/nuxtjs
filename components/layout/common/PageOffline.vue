<template>
  <div class="page-offline container h-screen flex items-center justify-center sm:text-center">
    <div class="-mt-32">
      <div class="font-weight-bold text-3xl sm:text-5xl">Opps, you are offline!</div>
      <p class="text-md">Reconnect to the internet and try again.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageOffline',
}
</script>

<style scoped>
.page-offline img {
  width: 300px;
}
</style>
