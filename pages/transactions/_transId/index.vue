<template>
  <div
    class="transaction-details"
    :class="{
      '-bg': isOpenCancelPopup,
    }"
  >
    <Header>
      <img class="icon" :src="backImg" alt="" />
      <h1 class="title">Chi tiết giao dịch</h1>
    </Header>
    <div class="detail">
      <Info />
      <ConfirmCode />
    </div>
    <div class="buttons">
      <button v-if="isShowHome" class="btn -home">Trang chủ</button>
      <button v-if="!isShowHome" class="btn -confirm">Xác nhận</button>
      <button v-if="!isShowHome" class="btn -cancel" @click="toggleCancelPopup">Hủy giao dịch</button>
    </div>
    <CancelPopup
      v-show="isOpenCancelPopup"
      :class="{ '-open': isOpenCancelPopup }"
      @close="toggleCancelPopup"
      @confirm="confirmCancel"
    />
  </div>
</template>
<script>
import Header from '~/components/layout/header'
import Info from '~/components/transactions/detail/Info'
import ConfirmCode from '~/components/transactions/detail/ConfirmCode'
import CancelPopup from '~/components/transactions/detail/CancelPopup'
export default {
  components: { Header, Info, ConfirmCode, CancelPopup },
  data() {
    return {
      backImg: require('~/assets/img/back.svg'),
      isOpenCancelPopup: false,
      isShowHome: false,
    }
  },
  methods: {
    toggleCancelPopup() {
      this.isOpenCancelPopup = !this.isOpenCancelPopup
    },
    confirmCancel() {
      this.isShowHome = true
      this.toggleCancelPopup()
    },
  },
}
</script>
<style lang="scss" scoped>
.transaction-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  &.-bg {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #333;
      opacity: 0.4;
    }
  }
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
    font-size: 18px;
    line-height: 26px;
  }
  > .detail {
    margin: 16px;
    flex-grow: 3;
  }
  > .buttons {
    margin-top: auto;
    margin: 0 16px;
    margin-bottom: 16px;
  }
  > .buttons > .btn {
    width: 100%;
    height: 52px;
    display: block;
    font-family: $fontBold;
    border-radius: 8px;
    font-size: 18px;
    line-height: 26px;
    outline: none;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  > .buttons > .btn.-confirm,
  > .buttons > .btn.-home {
    background: #00b14f;
    color: #fff;
    margin-top: 35px;
  }
  > .buttons > .btn.-cancel {
    background: #ccefdc7a;
    color: $colorBrand;
    margin-top: 16px;
  }
}
</style>
