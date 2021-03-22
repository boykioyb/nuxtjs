<template>
  <div class="confirm-code">
    <h2 class="title">Mã xác nhận</h2>
    <div class="box">
      <div class="codes">
        <span v-for="code in confirmCode" :key="Math.random(code)" class="code">{{ code }}</span>
      </div>
    </div>
    <p class="note">Vui lòng cung cấp mã xác nhận cho khách hàng trước khi thu tiền</p>
  </div>
</template>
<script>
export default {
  name: 'ConfirmCode',
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      confirmCode: [],
    }
  },
  created() {
    this.confirmCode = this.detail.confirmCode.split('')
  },
}
</script>
<style lang="scss" scoped>
.confirm-code {
  font-family: $fontNormal;
  > .title {
    font-family: $fontMedium;
    font-size: 14px;
    line-height: 21px;
    color: #333333;
    margin: 16px 0;
  }
  > .box {
    height: 60px;
    background: #f5f6fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .box > .codes {
    color: #2f80ed;
    font-family: $fontBold;
    font-size: 28px;
    line-height: 36px;
    letter-spacing: 0.2em;
  }
  > .note {
    color: #ff9500;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    margin-top: 11px;
  }
}
</style>
