<template>
  <div class="list-container">
    <div class="top-box">
      <van-sticky class="background" :offset-top="0">
        <NavBar title="面经分享" @onClickLeft="$router.push('/find')"></NavBar>
        <div class="search-box" @click="$router.push('/search')">
          <i class="iconfont iconicon_search"></i>请输入关键词
        </div>
      </van-sticky>
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onload"
      >
        <ShareList
          @click="toShareDetails(item)"
          :item="item"
          v-for="item in shareList"
          :key="item.id"
        ></ShareList>
      </van-list>
    </div>
  </div>
</template>
<script>
import { shareList } from '@/api/find.js'
export default {
  name: 'shareList',
  data () {
    return {
      shareList: [],
      loading: false,
      finished: false,
      // 起始索引
      start: 0,
      // 每页有多少条
      limit: 5
    }
  },
  methods: {
    onload () {
      shareList({ start: this.start, limit: this.limit }).then(res => {
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
        })
        this.shareList.push(...res.data.list)
        this.start += this.limit
        if (this.shareList.length >= res.data.total) {
          this.finished = true
        }
        this.loading = false
      })
    },
    toShareDetails (item) {
      this.$router.push(`/share/${item.id}`)
    }
  }
}
</script>
<style lang="less">
.list-container {
  .top-box {
    .van-sticky {
      background-color: @white-color;
    }
    .search-box {
      margin: 0 20px;
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      background-color: @bg-color;
      border-radius: 8px;
      .iconicon_search:before {
        font-size: 16px;
      }
    }
  }
  .list {
    padding: 0 15px;
  }
}
</style>
