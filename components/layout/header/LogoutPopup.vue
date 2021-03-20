<template>
  <div class="logout">
    <h3 class="title">Đăng xuất</h3>
    <p class="message">Bạn có muốn đăng xuất không?</p>
    <div class="buttons">
      <button class="btn -out" @click="logout">Đăng Xuất</button>
      <button class="btn -cancel" @click="$emit('cancel')">Không</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LogoutPopup',
  methods: {
    logout() {
      this.$router.push('/auth/logout')
    },
  },
}
</script>
<style lang="scss" scoped>
.logout {
  position: absolute;
  top: 34vh;
  left: 0;
  margin: 0 auto;
  right: 0;
  text-align: center;
  border-radius: 8px;
  width: calc(100% - 40px);
  background: #fff;
  padding: 20px;
  animation: show 0.5s ease-in-out;
  > .title {
    font-family: $fontBold;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  > .message {
    font-family: $fontNormal;
    font-size: 14px;
    line-height: 20px;
    margin: 24px 0;
  }
  > .buttons {
    display: flex;
    flex: 1;
  }
  > .buttons > .btn {
    border-radius: 8px;
    font-weight: 500;
    display: block;
    padding: 10px 0;
    flex: 1;
    font-size: 14px;
    font-family: $fontMedium;
    cursor: pointer;
  }
  > .buttons > .btn.-out {
    border: 0.5px solid #717981;
    margin-right: 6px;
    color: #5c5c5c;
  }
  > .buttons > .btn.-cancel {
    background: #f46666;
    color: #fff;
    margin-left: 6px;
  }
}
</style>
