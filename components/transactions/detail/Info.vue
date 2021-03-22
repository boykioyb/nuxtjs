<template>
  <div class="info">
    <div class="transaction">
      <h2 class="title">Thông tin giao dịch</h2>
      <div class="body">
        <div class="cell">
          <span class="label">Mã giao dịch</span>
          <span class="value">{{ detail.eid }}</span>
        </div>
        <div class="cell">
          <span class="label">Số tiền thu hộ</span>
          <span class="value -amount">
            <span>{{ detail.amount }}</span>
            <span>{{ detail.currency }}</span>
          </span>
        </div>
        <div class="cell">
          <span class="label">Trạng thái</span>
          <span class="value -status" :class="status[detail.status].class"> {{ status[detail.status].label }}</span>
        </div>
        <div class="line"></div>
        <p class="customer">Thông tin khách hàng</p>
        <div class="cell -customer">
          <div class="avatar">
            <img :src="require('~/assets/img/user.png')" alt="user" />
          </div>
          <span class="name">{{ detail.user.name }}</span>
          <a :href="`tel:` + detail.user.phone" class="icon"> <img :src="callImg" alt="call" /></a>
        </div>
        <div class="cell -customer">
          <img :src="callOImg" alt="call-o" class="icon" />
          <span class="label -phone">Số điện thoại</span>
          <span class="value">{{ detail.user.phone }}</span>
        </div>
        <div class="cell -customer">
          <img class="icon" :src="homeImg" alt="home" />
          <span class="label -address">Địa chỉ</span>
          <span class="value">{{ detail.user.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      callImg: require('~/assets/img/call.svg'),
      callOImg: require('~/assets/img/call-o.svg'),
      homeImg: require('~/assets/img/home.svg'),
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
}
</script>
<style lang="scss" scoped>
.info {
  font-family: $fontNormal;
}

.info > .transaction > .title {
  font-size: 16px;
  width: 100%;
  padding: 12px;
  color: #fff;
  line-height: 24px;
  background: $colorBrand;
  border-radius: 8px 8px 0 0;
  font-family: $fontBold;
}

.info > .transaction > .body {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
}
.info > .transaction > .body > .line {
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
}
.info > .transaction > .body > .customer {
  margin: 16px 16px 0 12px;
  font-family: $fontMedium;
  font-size: 14px;
  line-height: 21px;
  color: #333;
}
.info > .transaction > .body > .cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 12px;
  > .label {
    color: #858585;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
  }
  > .label.-phone,
  > .label.-address,
  > .name {
    margin-left: 12px;
    flex: 2;
  }
  > .value {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #333333;
  }
  > .value.-amount {
    color: $colorBrand;
    font-weight: 500;
    font-family: $fontMedium;
  }
  > .value.-status {
    padding: 6px 12px;
    border-radius: 4px;
  }
  > .value.-status.-processing {
    color: #ff9500;
    background: #ffd5993b;
  }
  > .value.-status.-received {
    color: #2f80ed;
    background: #2f80ed3b;
  }
  > .value.-status.-cancel {
    color: #f46666;
    background: #f466663b;
  }
  > .value.-status.-success {
    color: #00b14f;
    background: #00b14f3b;
  }
  &.-customer {
    justify-content: unset;
  }
  > .avatar {
    border-radius: 100px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    object-fit: cover;
  }
  > .name {
    color: #333;
    font-family: $fontMedium;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
}
</style>
