<template>
  <div class="profile">
    <!-- 导航栏 -->
    <NavBar class="navbar" title="我的资料"></NavBar>
    <!-- 资料主体 -->
    <div class="main_box">
      <!-- 头像 -->
      <cell title="头像" @click="toEdit('avatar')">
        <template>
          <img class="img" :src="userInfo.avatar" alt="" />
        </template>
      </cell>
      <!-- 昵称 -->
      <cell
        @click="toEdit('nickname')"
        title="昵称"
        :value="userInfo.nickname"
      ></cell>
      <!-- 性别 -->
      <cell title="性别" :value="gender" is-link @click="show1 = true"> </cell>
      <!-- 性别弹出层 -->
      <van-popup position="bottom" @close="onCancel" v-model="show1">
        <van-picker
          title="性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          :default-index="userInfo.gender"
          @cancel="onCancel"
          ref="picker"
        />
      </van-popup>
      <!-- 地区 -->
      <cell title="地区" :value="userArea" @click="show2 = true"></cell>
      <!-- 地区弹出层 -->
      <van-popup position="bottom" v-model="show2">
        <van-area
          :value="userInfo.area"
          title="地区"
          :area-list="area"
          :columns-num="2"
          :default-index="userInfo.userArea"
          @confirm="onAreaConfirm"
          @cancel="onAreaCancel"
          ref="area"
        />
      </van-popup>
      <!-- 个人简历 -->
      <cell
        @click="toEdit('intro')"
        title="个人简介"
        :value="userInfo.intro"
      ></cell>
      <!-- 登出按钮 -->
      <van-button @click="exitLogin" class="btn" type="primary" size="large"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<script>
import area from '@/utils/area.js'
import { removeToken } from '@/utils/token.js'
import { editUserInfo } from '@/api/profile'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      columns: ['未知', '男', '女'],
      show1: false,
      show2: false,
      area
    }
  },

  methods: {
    ...mapMutations(['SETUSERINFO', 'SETLOGIN', 'SETPROPVALUE']),
    // 地区事件
    onAreaConfirm (value) {
      window.console.log(value)
      this.$toast.loading({ duration: 0 })
      editUserInfo({ area: value[1].code }).then(res => {
        window.console.log(res)
        this.$toast.success('修改成功')
        this.show2 = false
        this.SETPROPVALUE({
          propName: 'area', // 此处对应到接口字段
          propValue: value[1].code
        })
      })
    },
    onAreaCancel () {
      this.$refs.area.reset('110100')
      this.show2 = false
    },
    // 性别事件
    onConfirm (value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.$toast.loading({ duration: 0 })
      editUserInfo({ gender: index }).then(res => {
        window.console.log(res)
        this.$toast.success('修改成功')
        this.show1 = false
        this.SETPROPVALUE({
          propName: 'gender',
          propValue: index
        })
      })
    },
    onCancel () {
      this.$refs.picker.setColumnIndex(0, this.userInfo.gender)
      this.show1 = false
    },
    // 编辑页面
    // 通过地址传入的prop来判断去往哪个页面
    toEdit (prop) {
      this.$router.push(`/editInfo?prop=${prop}`)
    },
    // 退出登录
    exitLogin () {
      // this.$toast.success('重新登录')
      this.$dialog
        .confirm({
          title: '退出提示'
          // message: '确定退出'
        })
        .then(() => {
          // 退出成功
          // 删除token
          removeToken()
          // 删除用户信息
          this.SETUSERINFO('')
          // 将登录状态还原
          this.SETLOGIN(false)
          this.$router.push('/find')
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['gender', 'userArea'])
    // gender () {
    //   //   if (this.userInfo.gender === 0) {
    //   //     return '未知'
    //   //   } else if (this.userInfo.gender === 1) {
    //   //     return '男'
    //   //   } else {
    //   //     return '女'
    //   //   }
    //   // 对象取值
    //   const gender = { 0: '未知', 1: '男', 2: '女' }
    //   return gender[this.userInfo.gender]
    // }
  }
}
</script>
<style lang="less">
.profile {
  .van-nav-bar__title {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    // text-align: left;
  }
  .main_box {
    padding: 15px;
    .van-cell__title {
      margin: 0;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      // text-align: left;
    }
    .img {
      padding-top: 7px;
      width: 40px;
      height: 40px;
      align-items: center;
      border-radius: 50%;
    }
    .btn {
      margin-top: 10px;
      border-radius: 8px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 700;
      color: @main-color;
    }
    .van-button--primary {
      background-color: @white-color;
      border: 0.02667rem solid @white-color;
    }
  }
}
</style>
