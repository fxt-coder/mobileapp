<template>
  <div class="login">
    <!-- 导航栏 -->
    <NavBar @onClickLeft="onClickLeft"></NavBar>
    <!-- 主体区域 -->
    <div class="main-box">
      <!-- 标题 -->
      <h2>您好，请登录</h2>
      <!-- 表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
        <!-- 手机号 -->
        <van-row>
          <van-col span="24">
            <van-field
              v-model="mobile"
              name="mobile"
              placeholder="请输入手机号"
              type="tel"
              :rules="[
                {
                  required: true,
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式不对'
                }
              ]"
            >
              <template #left-icon>
                <i class="iconfont iconbianzu1"></i>
              </template>
            </van-field>
          </van-col>
        </van-row>
        <!-- 验证码 -->
        <van-row>
          <van-col span="16">
            <van-field
              v-model="code"
              name="code"
              type="digit"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <template #left-icon>
                <i class="iconfont iconyanzhengma"></i>
              </template> </van-field
          ></van-col>
          <van-col class="btn-col" span="8">
            <span @click="clickCode" class="code-btn van-hairline--left">{{
              btnText
            }}</span>
          </van-col>
        </van-row>
        <!-- 用户协议 -->
        <p class="deal">
          登录既同意<span>《用户使用协议》</span>和<span>《隐私协议》</span>
        </p>
        <div class="submit-box">
          <van-button round block type="danger" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { saveToken } from '@/utils/token.js'
import { getCode, login } from '@/api/login.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      code: '',
      mobile: '18888881111',
      btnText: '获取验证码',
      time: 0
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFO']),
    onClickLeft () {
      console.log('onClickLeft')
    },
    // 表单校验成功之后的回调函数
    onSubmit (value) {
      console.log(value)
      this.$toast.loading({ duration: 500 })
      login(value).then(res => {
        // window.console.log(res)
        // this.$store.state.userInfo = res.data.user
        this.$toast.success('欢迎')
        // this.$notify({
        //   message: '欢迎'
        // })
        // this.$store.commit('SETUSERINFO', res.data.user)
        res.data.user.avatar = process.env.VUE_APP_URL + res.data.user.avatar
        this.SETUSERINFO(res.data.user)
        saveToken(res.data.jwt)
        this.$router.push('/my')
      })
    },
    clickCode () {
      if (this.time !== 0) {
        return
      }
      this.$refs.loginForm.validate('mobile').then(res => {
        this.$toast.loading({ duration: 0 })
        this.time = 60
        this.btnText = `${this.time}S后重试`
        const _interval = setInterval(() => {
          this.time--
          this.btnText = `${this.time}S后重试`
          if (this.time === 0) {
            clearInterval(_interval)
            this.btnText = '获取验证码'
          }
        }, 1000)
        getCode({ mobile: this.mobile }).then(res => {
          // window.console.log(res)
          this.$toast.success(res.data)
        })
      })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100vh;
  background: @white-color;
  .main-box {
    padding: 0 15px;
    h2 {
      margin: 0;
      margin-top: 50px;
      margin-bottom: 63px;
      font-size: 18px;
      font-weight: 600;
    }
    .btn-col {
      height: 45px;
      display: flex;
      align-items: center;
    }
    .code-btn {
      display: inline-block;
      line-height: 29px;
      height: 29px;
      padding-left: 15px;
      font-size: 16px;
      color: #00b8d4;
    }
    .van-row {
      border-bottom: 1px solid #f7f4f5;
    }
    .deal {
      font-size: 12px;
      margin-top: 15px;
      span {
        color: #00b8d4;
      }
    }
    .submit-box {
      margin-top: 44px;
    }
  }
}
</style>
