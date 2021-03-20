<template>
  <div class="login">
    <h1 class="title">Đăng nhập</h1>
    <form class="form" @submit.prevent="login">
      <div class="form-control">
        <input
          v-model="model.username"
          type="text"
          placeholder=" "
          autocomplete="off"
          required
          class="input"
          @keyup="removeWrong"
        />
        <label for="username" class="label">Tên đăng nhập</label>
        <span class="icon" @click="removeText('username')">
          <img :src="closeImage" alt="Đăng nhập" />
        </span>
      </div>
      <div class="form-control">
        <input
          v-model="model.password"
          type="password"
          placeholder=" "
          autocomplete="off"
          required
          class="input"
          @keyup="removeWrong"
        />
        <label for="password" class="label">Mật khẩu</label>
        <span class="icon" @click="removeText('password')">
          <img :src="closeImage" alt="Đăng nhập" />
        </span>
      </div>
      <p v-if="isWrong" class="wrong">{{ wrongText }}</p>
      <button type="submit" class="btn -submit" :disabled="isSubmit">Xác nhận</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  data() {
    return {
      closeImage: require('~/assets/img/close.svg'),
      isSubmit: false,
      isWrong: false,
      wrongText: '',
      model: {
        username: '0978286920',
        password: '1',
      },
    }
  },
  methods: {
    removeText(field) {
      this.model[field] = ''
    },
    removeWrong() {
      this.isWrong = false
    },
    async login() {
      try {
        this.isSubmit = true
        const { data } = await this.$auth.loginWith('local', { data: this.model })
        console.log(2)
        if (data.success) {
          const accessToken = data.data.user.accessToken.token
          this.$auth.setStrategy('local')
          this.$auth.strategy.token.set(accessToken)
          this.$auth.setUser(data.data.user)
          console.log(1)
          this.$router.push('/')
          return true
        }
        this.isWrong = true
        this.wrongText = data.error.message
      } catch (e) {
        this.isWrong = true
        this.wrongText = e.message
        console.log(e)
      } finally {
        this.loading = false
        this.isSubmit = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  margin-top: 124px;
  padding: 0 28px;
  font-family: $fontNormal;

  > .title {
    font-family: $fontBold;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: $colorText;
  }
  > .form > .form-control {
    border: 1px solid #e6e8e9;
    margin-top: 16px;
    height: 56px;
    border-radius: 8px;
    position: relative;
    padding: 0 16px;
    font-family: iCielHelveticaNowText, sans-serif;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 2px;
      transform: scaleX(0);
      transform-origin: center;
      transition: 0.5s;
    }

    &:focus-within::before {
      transform: scaleX(1);
    }

    > .input {
      padding: 0.5rem 0;
      background: none;
      border: none;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      margin-top: 22px;
      color: #25282b;
      &:focus,
      &:not(:placeholder-shown) {
        ~ label {
          transform: translateY(-110%);
          font-size: 12px;
          top: 30px;
          color: #a0a4a8;
        }
        ~ .icon {
          display: block;
        }
      }
    }
    > .label {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      color: #adadad;
      position: absolute;
      top: 18px;
      left: 16px;
      transition: 0.3s;
      transform-origin: left;
      z-index: -1;
    }
  }
  > .form > .form-control > .icon {
    position: absolute;
    top: 19.5px;
    right: 19.5px;
    display: none;
  }
  > .form > .btn.-submit {
    display: block;
    height: 52px;
    width: 100%;
    text-align: center;
    font-family: iCielHelveticaNowText, sans-serif;
    background: $colorBrand;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #fff;
    border-radius: 8px;
    margin-top: 40px;
    border: none;
  }
  > .form > .wrong {
    margin-top: 20px;
    color: $colorCancel;
    font-size: 14px;
  }
}
</style>
