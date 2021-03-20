<template>
  <div class="search">
    <div class="form">
      <img class="icon" :src="searchImg" alt="search" />
      <input type="text" placeholder="Nhập mã giao dịch cần tìm" class="input" />
    </div>
    <img class="icon" :src="filterImg" alt="filter" @click="$emit('openFilter')" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchImg: require('~/assets/img/search.svg'),
      filterImg: require('~/assets/img/filter.svg'),
      filterApplyImg: require('~/assets/img/filter-a.svg'),
    }
  },
}
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
  > .form {
    flex-grow: 3;
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f5f6fa;
    border-radius: 8px;
  }
  > .form > .input {
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    background: none;
    margin-left: 14px;
    font-size: 12px;
    &::placeholder {
      color: #858585;
    }
  }
  > .icon {
    margin-left: 16px;
    cursor: pointer;
  }
}
</style>
