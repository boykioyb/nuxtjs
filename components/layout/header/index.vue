<template>
  <div class="header">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 48px;
  padding: 0 16px;
}
</style>
