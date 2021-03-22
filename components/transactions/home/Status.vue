<template>
  <ul class="states">
    <li
      v-for="(label, status) in states"
      :key="status"
      class="status"
      :class="{
        '-active': status === filters.status,
      }"
      @click="addFilter(status)"
    >
      <span>{{ label }}</span>
    </li>
  </ul>
</template>
<script>
import { states } from '~/constants'
export default {
  name: 'Status',
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      models: {},
      states,
    }
  },
  methods: {
    addFilter(status) {
      this.models = { ...this.filters, ...{ status } }
      this.$emit('input', this.models)
    },
  },
}
</script>
<style lang="scss" scoped>
.states {
  overflow-x: scroll;
  width: 100%;
  overflow-y: hidden;
  white-space: nowrap;
  width: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  margin-left: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.states > .status {
  display: inline-block;
  border-radius: 100px;
  padding: 8px 12px;
  font-size: 12px;
  line-height: 21px;
  background: #f5f6fa;
  font-family: $fontNormal;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 12px;
  }
  &:active {
    outline: none;
  }
}
.states > .status.-active {
  color: #fff;
  background: $colorBrand;
  font-family: $fontMedium;
}
</style>
