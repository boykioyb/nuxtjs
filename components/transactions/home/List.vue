<template>
  <ul class="list">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
      <li
        v-for="tran in transactions.trans"
        :key="Math.random(tran.id)"
        class="item -status"
        :class="status[tran.status].class || ''"
        @click="transDetail(tran.eid)"
      >
        <p class="top">
          <span class="code"
            >{{ tran.eid }}
            <span class="state" :class="status[tran.status].class || ''">{{
              status[tran.status].label || ''
            }}</span></span
          >
          <span class="amount"> {{ tran.amount }}{{ tran.currency }} </span>
        </p>
        <p class="bottom">
          <span class="time">{{ tran.createdAt }}</span>
          <span class="user">{{ tran.user.name }}</span>
        </p>
      </li>
    </div>
  </ul>
</template>
<script>
import { dispatch } from 'vuex-pathify'

import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'List',
  directives: { infiniteScroll },
  props: {
    transactions: {
      type: Object,
      default: () => {},
    },
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      limit: 10,
      busy: false,
      status: {
        PROCESSING: {
          label: 'Mới',
          class: '-processing',
        },
        RECEIVED: {
          label: 'Đã thu tiền',
          class: '-received',
        },
        CANCEL: {
          label: 'Hủy',
          class: '-cancel',
        },
        SUCCESS: {
          label: 'Thành công',
          class: '-success',
        },
      },
    }
  },
  methods: {
    transDetail(id) {
      this.$router.push(`/transactions/${id}`)
    },
    async loadMore() {
      this.busy = true
      if (!Object.keys(this.transactions).length) {
        this.busy = false
        return
      }
      const currentPage = this.transactions.meta.current_page
      const lastPage = this.transactions.meta.last_page
      if (currentPage === lastPage) {
        return false
      }
      const filters = {
        ...this.filters,
        ...{
          page: currentPage + 1,
        },
      }
      await dispatch('transaction/lazyLoadingList', filters).catch(() => {
        this.$toasted.error('Có lỗi xảy ra.')
      })
      this.busy = false
    },
  },
}
</script>
<style lang="scss" scoped>
.transactions.-bg .list .item {
  z-index: -1;
}
.list {
  margin: 16px;
  height: calc(100% - 250px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.list .item {
  width: 100%;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 16px;
  }
}
.list .item.-status {
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: 2px;
    height: 50px;
  }
}
.list .item.-status.-processing {
  &::before {
    background: #ff9500;
  }
}
.list .item.-status.-cancel {
  &::before {
    background: $colorCancel;
  }
}
.list .item.-status.-received {
  &::before {
    background: #2f80ed;
  }
}
.list .item.-status.-success {
  &::before {
    background: $colorBrand;
  }
}
.list .item > p {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list .item > .top {
  font-size: 12px;
  line-height: 18px;
  font-family: $fontMedium;
  color: #333;
  margin-bottom: 8px;
}
.list .item > .top > .code > .state {
  font-family: $fontMedium;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 4px;
  margin-left: 8px;
}
.list .item > .top > .code > .state.-processing {
  color: #ff9500;
  background: #ffd5993b;
}
.list .item > .top > .code > .state.-received {
  color: #2f80ed;
  background: #2f80ed3b;
}
.list .item > .top > .code > .state.-cancel {
  color: #f46666;
  background: #f466663b;
}
.list .item > .top > .code > .state.-success {
  color: #00b14f;
  background: #00b14f3b;
}
.list .item > .bottom {
  font-size: 12px;
  line-height: 18px;
  color: #858585;
}
</style>
