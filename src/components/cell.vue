<template>
  <van-cell class="cell" @click="cellClick" :title="title" :value="value">
    <!-- 后备插槽 -->
    <template>
      <slot>{{ value }}</slot>
    </template>
    <template #icon>
      <i class="iconfont" :class="icon"></i>
    </template>
    <template #right-icon>
      <i class="iconfont iconicon_more"></i>
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'cell',
  // props: ['title', 'value', 'icon'],
  props: {
    title: String,
    value: [Number, String, Object],
    icon: String
  },
  methods: {
    cellClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less">
.cell {
  height: 55px;
  align-items: center;
  .van-cell__title {
    margin-left: 13px;
  }
  .iconfont {
    padding-right: 8px;
    font-size: 20px;
  }
  .iconicon_more {
    padding-left: 8px;
    font-size: 12px;
  }
}
</style>
