<template>
  <ul class="list">
    <li v-for="tran in transactions" :key="tran.id" class="item -status -success">
      <p class="top">
        <span class="code">{{ tran.eid }} <span class="state -created">Mới</span></span>
        <span class="amount"> {{ tran.amount }}{{ tran.currency }} </span>
      </p>
      <p class="bottom">
        <span class="time">{{ tran.createdAt }}</span>
        <span class="user">{{ tran.user.name }}</span>
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'List',
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  margin: 16px;
  height: calc(100% - 250px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.list > .item {
  width: 100%;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  z-index: -1;
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 16px;
  }
}
.list > .item.-status {
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: 2px;
    height: 50px;
  }
}
.list > .item.-status.-success {
  &::before {
    background: $colorBrand;
  }
}
.list > .item.-status.-cancel {
  &::before {
    background: $colorCancel;
  }
}
.list > .item > p {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list > .item > .top {
  font-size: 12px;
  line-height: 18px;
  font-family: $fontMedium;
  color: #333;
  margin-bottom: 8px;
}
.list > .item > .top > .code > .state {
  font-family: $fontMedium;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 4px;
  margin-left: 8px;
}
.list > .item > .top > .code > .state.-created {
  color: #ff9500;
  background: #ffd5993b;
}
.list > .item > .bottom {
  font-size: 12px;
  line-height: 18px;
  color: #858585;
}
</style>
