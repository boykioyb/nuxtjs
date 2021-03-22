<template>
  <div class="transactions" :class="{ '-bg': isOpenBg }">
    <Header>
      <h1 class="title">Danh sách giao dịch</h1>
      <img class="icon" :src="logoutImg" alt="" @click="toggleLogoutPopup" />
    </Header>
    <Search v-model="filters" :filters="filters" @openFilter="toggleOpenFilter" />
    <Status v-model="filters" :filters="filters" />
    <p class="count">
      Số lượng giao dịch: {{ transactions.meta && transactions.meta.total ? transactions.meta.total : 0 }}
    </p>
    <Loading v-if="isLoading" />
    <List :transactions="transactions" :filters="filters" />
    <FilterPopup v-if="isOpenFilter" v-model="filters" :filters="filters" @close="toggleOpenFilter" />
    <LogoutPopup v-if="isLogout" @cancel="toggleLogoutPopup" />
  </div>
</template>
<script>
import { get, sync, dispatch } from 'vuex-pathify'
import Header from '~/components/layout/header'
import LogoutPopup from '~/components/layout/header/LogoutPopup'
import Search from '~/components/transactions/home/Search'
import Status from '~/components/transactions/home/Status'
import List from '~/components/transactions/home/List'
import FilterPopup from '~/components/transactions/home/FilterPopup'
import Loading from '~/components/layout/common/Loading'
export default {
  name: 'Transaction',
  components: { Header, Search, Status, List, FilterPopup, LogoutPopup, Loading },
  data() {
    return {
      logoutImg: require('~/assets/img/logout.svg'),
      isOpenFilter: false,
      isOpenBg: false,
      isLogout: false,
      isLoading: false,
    }
  },
  computed: {
    transactions: get('transaction/transactions'),
    filters: sync('transaction/filters'),
  },
  watch: {
    async filters() {
      await this.getTransList()
    },
  },
  async mounted() {
    await this.getTransList()
  },
  methods: {
    async getTransList() {
      this.isLoading = true
      await dispatch('transaction/getList', this.filters).catch(() => {
        this.isLoading = false
        this.$toasted.error('Có lỗi xảy ra.')
      })
      this.isLoading = false
    },
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
