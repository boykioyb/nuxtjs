<template>
  <div class="transactions" :class="{ '-bg': isOpenBg }">
    <Header>
      <h1 class="title">Danh sách giao dịch</h1>
      <img class="icon" :src="logoutImg" alt="" @click="toggleLogoutPopup" />
    </Header>
    <Search @openFilter="toggleOpenFilter" />
    <Status v-model="filters.status" :selected="filters.status" />
    <p class="count">Số lượng giao dịch: 5</p>
    <List :transactions="transactions.trans" />
    <FilterPopup v-if="isOpenFilter" v-model="filters" :filters="filters" @close="toggleOpenFilter" />
    <LogoutPopup v-if="isLogout" @cancel="toggleLogoutPopup" />
  </div>
</template>
<script>
import { get, dispatch } from 'vuex-pathify'
import Header from '~/components/layout/header'
import LogoutPopup from '~/components/layout/header/LogoutPopup'
import Search from '~/components/transactions/home/Search'
import Status from '~/components/transactions/home/Status'
import List from '~/components/transactions/home/List'
import FilterPopup from '~/components/transactions/home/FilterPopup'

export default {
  name: 'Transaction',
  components: { Header, Search, Status, List, FilterPopup, LogoutPopup },
  data() {
    return {
      logoutImg: require('~/assets/img/logout.svg'),
      isOpenFilter: false,
      isOpenBg: false,
      isLogout: false,
      titles: {
        CREATED: 'Giao dịch mới',
      },
      filters: {
        status: 'CREATED',
        startDate: '',
        endDate: '',
      },
    }
  },
  computed: {
    transactions: get('transaction/transactions'),
  },
  async mounted() {
    await dispatch('transaction/getList', {
      status: this.status,
    })
  },
  methods: {
    toggleLogoutPopup() {
      this.isOpenBg = !this.isOpenBg
      this.isLogout = !this.isLogout
    },
    toggleOpenFilter() {
      this.isOpenFilter = !this.isOpenFilter
      this.isOpenBg = !this.isOpenBg
    },
  },
}
</script>
<style lang="scss" scoped>
.transactions {
  font-family: $fontNormal;
  height: inherit;
  &.-bg {
    position: relative;
    z-index: 1;
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
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }
  > .header > .icon {
    cursor: pointer;
  }
  > .count {
    font-size: 16px;
    line-height: 24px;
    font-family: $fontMedium;
    margin-top: 16px;
    margin-left: 16px;
    color: #333333;
  }
}
</style>
