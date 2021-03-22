<template>
  <div
    class="transaction-details"
    :class="{
      '-bg': isOpenCancelPopup,
    }"
  >
    <Header>
      <img class="icon" :src="backImg" alt="" @click="$router.back()" />
      <h1 class="title">Chi tiết giao dịch</h1>
    </Header>
    <div v-if="detail" class="detail">
      <Info :detail="detail" />
      <ConfirmCode v-if="detail.confirmCode" :detail="detail" />
    </div>
    <div class="buttons">
      <button v-if="isShowHome" class="btn -home" @click="$router.push('/')">Trang chủ</button>
      <button v-if="!isShowHome" class="btn -confirm" @click="confirmReceived">Xác nhận</button>
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
import { dispatch, get } from 'vuex-pathify'

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
  computed: {
    transactions: get('transaction/transactions'),
    detail() {
      return this.transactions.trans.find(({ eid }) => eid === this.transId)
    },
    transId() {
      return this.$route.params.transId
    },
  },
  created() {
    if (this.detail.status !== 'PROCESSING') {
      this.isShowHome = true
    }
  },
  mounted() {
    if (!this.detail) this.$nuxt.error({ statusCode: 404, message: '' })
  },
  methods: {
    toggleCancelPopup() {
      this.isOpenCancelPopup = !this.isOpenCancelPopup
    },
    async confirmReceived() {
      const confirmed = await dispatch('transaction/confirmReceived', {
        tranId: this.detail.id,
      }).catch(() => this.$toasted.error('Có lỗi xảy ra.'))
      if (confirmed.success) this.isShowHome = true
      if (!confirmed.success) {
        this.$toasted.error(confirmed.error.message)
      }
    },
    async confirmCancel(note) {
      const canceled = await dispatch('transaction/cancel', {
        note,
        tranId: this.detail.id,
      }).catch(() => {
        this.$toasted.error('Có lỗi xảy ra.')
      })
      if (canceled.success) this.isShowHome = true
      if (!canceled.success) {
        this.$toasted.error(canceled.error.message)
      }
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
  > .header > .icon {
    cursor: pointer;
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
