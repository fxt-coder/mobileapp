<template>
  <div class="profile">
    <NavBar class="navbar" title="我的资料"></NavBar>
    <div class="main_box">
      <cell title="头像">
        <template>
          <img class="img" :src="userInfo.avatar" alt="" />
        </template>
      </cell>
      <cell
        @click="clickNickName"
        title="昵称"
        :value="userInfo.nickname"
      ></cell>
      <cell title="性别" :value="gender" is-link @click="showPopup"> </cell
      ><van-popup position="bottom" v-model="show">
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
      <cell title="地区" :value="userInfo.area"></cell>
      <cell title="个人简介" :value="userInfo.intro"></cell>
      <van-button @click="exitLogin" class="btn" type="primary" size="large"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<script>
import cell from '@/components/cell'
import { removeToken } from '@/utils/token.js'
import { mapState } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      columns: ['未知', '男', '女'],
      selectedIndex: 0,
      show: false
    }
  },
  components: {
    cell
  },
  methods: {
    onConfirm () {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.$toast('修改成功')
      this.show = false
    },
    onCancel () {
      // 关闭 popUp
      this.show = false
      // 通过ref获取picker 还原选中值
      // 参数1 是多少列
      // 参数2 是设置选中的索引
      this.$refs.picker.setColumnIndex(0, 0)
    },
    showPopup () {
      this.show = true
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
      // .catch(() => {
      //   // on cancel
      // })
    },
    clickNickName () {
      this.$router.push('/resetNickname')
    }
  },
  computed: {
    ...mapState(['userInfo']),
    gender () {
      //   if (this.userInfo.gender === 0) {
      //     return '未知'
      //   } else if (this.userInfo.gender === 1) {
      //     return '男'
      //   } else {
      //     return '女'
      //   }
      // 对象取值
      const map = { 0: '未知', 1: '男', 2: '女' }
      return map[this.userInfo.gender]
    }
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
