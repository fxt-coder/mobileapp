<template>
  <van-nav-bar
    class="NavBar"
    :title="title"
    :left-text="left_text"
    :right-text="right_text"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <i class="iconfont iconbtn_nav_back"></i>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  name: 'NavBar',
  props: ['title', 'left_text', 'right_text'],
  methods: {
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>
<style lang="less">
.NavBar {
  background-color: #fff;
  .iconbtn_nav_back:before {
    font-size: 50px;
    padding-top: 26px;
  }
  .van-nav-bar__left {
    padding-left: 0;
  }
}
</style>
