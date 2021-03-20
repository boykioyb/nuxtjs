<template>
  <div class="filter-popup">
    <div class="head">
      <h3 class="title">Bộ lọc</h3>
      <img :src="closeImg" alt="close" @click="$emit('close')" />
    </div>
    <div class="body">
      <p class="title">Theo trạng thái</p>
      <ul class="states">
        <li
          v-for="(label, status) in states"
          :key="status"
          class="status"
          :status="models.status"
          :status-id="models.status"
          :class="{
            '-active': status === models.status,
          }"
          @click="addFilter(status)"
        >
          {{ label }}
        </li>
      </ul>
      <p class="title">Theo Thời gian</p>
      <transition name="fade">
        <div v-if="models.minDate && models.maxDate" class="range">
          <span class="date"><b>Từ </b>{{ models.minDate }}</span>
          <span class="date"><b>Đến </b>{{ models.maxDate }}</span>
        </div>
      </transition>
      <VueDatePicker v-model="currentDate" :max-date="date" no-header inline range fullscreen-mobile :color="color" />
      <div class="buttons">
        <button type="button" class="btn -reset" @click="reset">Xóa</button>
        <button type="button" class="btn -apply" @click="apply">Áp dụng bộ lọc</button>
      </div>
    </div>
  </div>
</template>
<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import moment from 'moment'
import { states } from '~/constants'
export default {
  components: {
    VueDatePicker,
  },
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      closeImg: require('~/assets/img/close-o.svg'),
      date: new Date(),
      currentDate: new Date(),
      color: '#00b14f',
      models: {
        status: '',
      },
      states,
    }
  },
  watch: {
    'currentDate.start'(newVal) {
      this.models.minDate = moment(newVal).format('DD/MM/YYYY')
    },
    'currentDate.end'(newVal) {
      this.models.maxDate = moment(newVal).format('DD/MM/YYYY')
    },
  },
  created() {
    this.models.status = this.filters.status
    this.models.minDate = this.filters.startDate
    this.models.maxDate = this.filters.endDate
    if (this.filters.startDate && this.filters.endDate) {
      this.currentDate.start = moment(this.filters.startDate).format('YYYY-MM-DD')
      this.currentDate.end = moment(this.filters.endDate).format('YYYY-MM-DD')
    }
    console.log(this.currentDate)
  },
  methods: {
    formatDate(date) {
      if (!date) return date
      const format = date.split('-')
      return format[2] + '/' + format[1] + '/' + format[0]
    },
    reset() {
      this.models = {}
      this.currentDate = new Date()
    },
    addFilter(status) {
      this.models.status = status
    },
    apply() {
      this.models.startDate = this.models.minDate
      this.models.endDate = this.models.maxDate
      this.models = { ...this.filters, ...this.models }
      this.$emit('input', this.models)
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.filter-popup {
  position: absolute;
  width: 100%;
  height: calc(100% - 65px);
  bottom: 0;
  background: #fff;
  border-radius: 8px 8px 0 0;
  font-family: $fontNormal;
  animation: filter-slide-in 0.5s ease-in-out;
  z-index: 2;
  &.-open {
    animation: slide-in 0.6s ease-in-out;
  }
  > .head {
    display: flex;
    align-items: center;
    padding: 12px;
  }
  > .head > .title {
    flex-grow: 3;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }
  > .body {
    display: flex;
    flex-direction: column;
  }
  > .body > .title {
    font-family: $fontBold;
    font-size: 16px;
    margin-top: 28px;
    margin: 0 12px;
  }
  > .body > .states {
    display: grid;
    grid-gap: 12px;
    margin: 12px;
    grid-template-columns: repeat(auto-fit, minmax(103px, 108px));
  }
  > .body > .states > .status {
    float: left;
    font-size: 12px;
    line-height: 18px;
    border-radius: 8px;
    text-align: center;
    padding: 12px 0;
    height: 42px;
    color: #5c5c5c;
    background: #f5f6fa;
  }
  > .body > .states > .status.-active {
    background: $colorBrand;
    color: #ffffff;
  }
  > .body > .range {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #ebeced;
    border-bottom: 1px solid #ebeced;
    margin-top: 16px;
  }
  > .body > .range > .date {
    padding: 12px 35px;
    position: relative;
    font-size: 14px;
    &:first-child::after {
      content: '';
      position: absolute;
      right: -14px;
      top: 13px;
      width: 1px;
      height: 19px;
      background: #ebeced;
    }
  }
  > .body > .range > .date > b {
    font-style: normal;
    font-weight: normal;
    color: $colorBrand;
  }
  > .body > .buttons {
    display: flex;
    margin: auto 12px 16px 12px;
  }
  > .body > .buttons > .btn {
    border-radius: 8px;
    height: 48px;
    display: block;
    text-align: center;
    font-family: $fontBold;
    cursor: pointer;
  }
  > .body > .buttons > .btn.-reset {
    width: 40%;
    margin-right: 12px;
    color: $colorBrand;
    background: #ebfaf2;
  }
  > .body > .buttons > .btn.-apply {
    width: 60%;
    background: $colorBrand;
    color: #fff;
  }
}
</style>
