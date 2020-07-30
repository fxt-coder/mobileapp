<template>
  <div class="profile">
    <!-- 导航栏 -->
    <NavBar class="navbar" title="我的资料"></NavBar>
    <!-- 资料主体 -->
    <div class="main_box">
      <!-- 头像 -->
      <cell title="头像">
        <template>
          <img class="img" :src="userInfo.avatar" alt="" />
        </template>
      </cell>
      <!-- 昵称 -->
      <cell
        @click="clickNickName"
        title="昵称"
        :value="userInfo.nickname"
      ></cell>
      <!-- 性别 -->
      <cell title="性别" :value="gender" is-link @click="showPopup"> </cell
      ><van-popup position="bottom" v-model="show1">
        <van-picker
          title="性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          :default-index="selectedIndex"
          @cancel="onCancel"
          ref="picker"
        />
      </van-popup>
      <!-- 地区 -->
      <cell title="地区" :value="userArea"></cell>
      <van-popup position="bottom" v-model="show2">
        <van-area title="标题" :area-list="areaList" />
      </van-popup>
      <!-- 个人简历 -->
      <cell title="个人简介" :value="userInfo.intro"></cell>
      <!-- 登出按钮 -->
      <van-button @click="exitLogin" class="btn" type="primary" size="large"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<script>
import { removeToken } from '@/utils/token.js'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      columns: ['未知', '男', '女'],
      selectedIndex: 0,
      show1: false,
      show2: false
    }
  },

  methods: {
    onConfirm () {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.$toast('修改成功')
      this.show1 = false
    },
    onCancel () {
      // 关闭 popUp
      this.show1 = false
      // 通过ref获取picker 还原选中值
      // 参数1 是多少列
      // 参数2 是设置选中的索引
      this.$refs.picker.setColumnIndex(0, 0)
    },
    showPopup () {
      this.show1 = true
    },
    exitLogin () {
      // this.$toast.success('重新登录')
      this.$dialog
        .confirm({
          title: '退出提示'
          // message: '确定退出'
        })
        .then(() => {
          this.$router.push('/login')
          removeToken()
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    clickNickName () {
      this.$router.push('/resetNickname')
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
