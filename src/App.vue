<template>
  <div class="app">
    <router-view></router-view>
    <van-tabbar
      v-if="$route.meta.showTabbar"
      active-color="#E40137"
      inactive-color="#B4B4BD"
      v-model="active"
      route
      placeholder
    >
      <van-tabbar-item to="/Company"
        ><span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_nor"></i> </template
      ></van-tabbar-item>
      <van-tabbar-item to="/Question">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_st_sel"></i> </template
      ></van-tabbar-item>
      <van-tabbar-item to="/Find"
        ><span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_fx_nor"></i> </template
      ></van-tabbar-item>
      <van-tabbar-item to="/My"
        ><span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_sel"></i> </template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  created () {
    window.console.log(this)
  }
}
</script>

<style lang="less">
.app {
  background-color: #f9f9f9;
  .iconfont {
    font-size: 28px;
  }
}
</style>
