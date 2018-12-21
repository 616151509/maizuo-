<template>
  <div class="web-login">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png">
    </div>
    <div class="login-form">
      <div>
        <form>
          <div class="form-group">
            <input type="tel" maxlength="13" placeholder="手机号" class="input-control" v-model="inputPhone" name="userName">
            <div
              class="getSmsCode sms-code disable"
              style="position: absolute; right: 0px; top: 13px;"
            >获取验证码</div>
          </div>
          <div class="form-group">
            <input placeholder="验证码" class="input-control" v-model="inputName" name="verifCation">
          </div>
          <!---->
          <!---->
          <div class="button" @click="handleLogin" :disabled="isDisabled">
               登录
          </div>
        </form>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      inputName: '',
      inputPhone: ''
    }
  },
  computed: {
    isDisabled () {
      if (this.inputName && this.inputPhone) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleLogin () {
      axios.get('/static/api/user.json', {
        params: {
          phone: this.inputPhone,
          code: this.inputName
        }
      }).then(res => {
        var result = res.data;
        // for (var i = 0; i <= result.length; i++) {
        //   if (result[i].phone === this.inputPhone && result[i].code === this.inputName) {
        //     console.log('登录成功');
        //     // 写入 本地存储
        //     localStorage.setItem('userName', '张三');
        //     console.log(localStorage)
        //     let redirect = this.$route.query.redirect;
        //     this.$router.replace(redirect);
        //   } else {
        //     console.log('手机号或验证码错误');
        //   }
        // }
        if (result.phone === this.inputPhone && result.code === this.inputName) {
          console.log('登录成功');
          // 写入 本地存储
          localStorage.setItem('userName', '张三');
          let redirect = this.$route.query.redirect;
          if (redirect !== undefined) {
            this.$router.replace(redirect);
          }
          this.$router.replace('/center')
        } else {
          console.log('手机号或验证码错误');
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";

.web-login{
  font-size: px2rem(15);
  .logo {
      margin: px2rem(79) auto px2rem(40);
      text-align: center;
      height: px2rem(60);
      line-height: px2rem(60);
      img {
        height: px2rem(60);
      }
  }
  .login-form {
    width: 100%;
    position: relative;
      .form-group {
      line-height: px2rem(55);
      margin: 0 px2rem(25);
      position: relative;
        .input-control {
        height: px2rem(15);
        line-height: px2rem(15);
        padding: px2rem(20) 0;
        width: 100%;
        font-size: px2rem(15);
        color: #191a1b;
        border: 0;
        outline-width: 0;
        }
        .disable {
        color: #bdc0c5;
        }
    }
    .button {
    width: 100%;
    padding: 0 px2rem(25) 0;
    margin-top: 70px;
    line-height: px2rem(45);
    font-size: px2rem(16);
    margin: px2rem(70) 0 0;
    border-radius: px2rem(3);
    text-align: center;
    height: px2rem(44);
    color: #fff;
    border: none;
    background-color: #ff5f16;
    &[disabled]{
      background: #ccc;
    }
    }
  }
}
//伪类添加下划线
.form-group:after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ededed;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    border-bottom: 1px solid #ededed;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
</style>
