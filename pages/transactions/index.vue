<template>
  <div class="transactions">
    <Header>
      <h1 class="title">Danh sách giao dịch</h1>
      <img class="icon" :src="logoutImg" alt="" />
    </Header>
    <div class="search">
      <img class="icon" :src="searchImg" alt="search" />
      <input type="text" placeholder="Nhập mã giao dịch hoặc tên khách hàng" class="input" />
    </div>
    <ul class="states">
      <li class="status">
        <span>Thành công</span>
        <span>(200)</span>
      </li>
      <li class="status">
        <span>Mới</span>
        <span>(200)</span>
      </li>
      <li class="status">
        <span>Đã thu tiền </span>
        <span>(200)</span>
      </li>
      <li class="status">
        <span>Thành công</span>
        <span>(200)</span>
      </li>
      <li class="status">
        <span>Thành công</span>
        <span>(200)</span>
      </li>
      <li class="status">
        <span>Thành công</span>
        <span>(200)</span>
      </li>
    </ul>
    <ul class="list">
      <li v-for="i in 10" :key="i" class="item -status -success">
        <p class="top">
          <span class="code">TIK121345</span>
          <span class="amount"> 10.000€ </span>
        </p>
        <p class="bottom">
          <span class="time">19:00, 08/03/2020</span>
          <span class="user">Nguyễn Hà Phương</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import Header from '~/components/layout/header'
export default {
  components: { Header },
  data() {
    return {
      logoutImg: require('~/assets/img/logout.svg'),
      searchImg: require('~/assets/img/search.svg'),
    }
  },
}
</script>
<style lang="scss" scoped>
.transactions {
  font-family: $fontNormal;
  > .header {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > .header > .title {
    flex-grow: 3;
    text-align: center;
    font-family: $fontBold;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }

  > .search {
    display: flex;
    align-items: center;
    padding: 14px;
    background: #f5f6fa;
    border-radius: 8px;
    margin: 16px;
  }
  > .search > .input {
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    background: none;
    margin-left: 14px;
    font-size: 14px;
    &::placeholder {
      color: #858585;
    }
  }
  > .states {
    overflow-x: scroll;
    width: 100%;
    overflow-y: hidden;
    white-space: nowrap;
    width: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > .states > .status {
    display: inline-block;
  }
  .list {
    margin: 16px;
  }
  .list > .item {
    width: 100%;
    background: #f5f6fa;
    border-radius: 8px;
    padding: 12px;
    position: relative;
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
  .list > .item.-status {
    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
      width: 2px;
      height: 46px;
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
  }
  .list > .item > .bottom {
    font-size: 12px;
    line-height: 18px;
    color: #858585;
  }
}
</style>
