<template>
  <div class="cancel-popup">
    <div class="head">
      <h3 class="title">Lý do hủy</h3>
      <img :src="closeImg" alt="close" @click="$emit('close')" />
    </div>
    <div class="body">
      <label class="cell">
        <span class="note">Không liên lạc được với khách hàng</span>
        <input type="radio" class="check" name="radAnswer" />
        <span class="checkmark"></span>
      </label>
      <label class="cell">
        <span class="note">Khách hàng từ chối đưa tiền</span>
        <input type="radio" class="check" name="radAnswer" />
        <span class="checkmark"></span>
      </label>
      <label class="cell">
        <span class="note">Khách hàng thao tác nhầm</span>
        <input type="radio" class="check" name="radAnswer" />
        <span class="checkmark"></span>
      </label>
      <label class="cell">
        <span class="note">Khách hàng yêu cầu hủy</span>
        <input type="radio" class="check" name="radAnswer" />
        <span class="checkmark"></span>
      </label>
      <label class="cell">
        <span class="note">Lý do khác</span>
        <input type="radio" class="check" name="radAnswer" />
        <span class="checkmark"></span>
      </label>
      <button class="btn -confirm -active" @click="$emit('confirm')">Xác nhận</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closeImg: require('~/assets/img/close-o.svg'),
    }
  },
}
</script>
<style lang="scss" scoped>
.cancel-popup {
  position: absolute;
  width: 100%;
  height: 385px;
  bottom: 0;
  background: #fff;
  border-radius: 8px 8px 0 0;
  font-family: $fontNormal;
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
    margin: 0 12px;
  }
  > .body > .cell {
    margin: 0 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:last-child {
      border-bottom: none;
    }
  }
  > .body > .cell > .note {
    color: #2f80ed;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
  }
  > .body > .cell > .check {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  > .body > .cell > input:checked ~ .checkmark {
    border: 2px solid #2f80ed;
  }
  > .body > .cell > .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  > .body > .cell > input:checked ~ .checkmark:after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    background: #2f80ed;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .checkmark {
    position: absolute;
    top: 14px;
    right: 0;
    height: 20px;
    width: 20px;
    border: 2px solid #c2c6c9;
    border-radius: 50%;
  }
  > .body > .btn {
    width: 100%;
    height: 52px;
    display: block;
    border-radius: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    font-family: $fontBold;
    outline: none;
    cursor: pointer;
  }

  > .body > .btn.-confirm {
    background: #c2c6c9;
    color: #fff;
    margin-top: 35px;
  }
  > .body > .btn.-active {
    background: #00b14f;
  }
}
</style>
