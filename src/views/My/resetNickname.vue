<template>
  <div class="resetNickname">
    <NavBar class="NavBar" title="修改昵称" right_text="保存"></NavBar>
    <van-field v-model="text" />
  </div>
</template>
<script>
export default {
  name: 'resetNickname',
  data () {
    return {
      text: ''
    }
  }
}
</script>
<style lang="less">
.resetNickname {
  .NavBar {
    .van-nav-bar__text {
      color: @black-color;
    }
    .van-nav-bar__title {
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
    }
  }
}
</style>
