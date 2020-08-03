<template>
  <div class="interview-search-container">
    <!-- 顶部 -->
    <div class="top-box">
      <NavBar title="面经分享搜索" @onClickLeft="$router.go(-1)"></NavBar>
      <van-search
        @keydown.enter="onSearch"
        shape="round"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
      >
        <template #left-icon>
          <i class="iconfont iconicon_search"></i>
        </template>
      </van-search>
    </div>
    <!-- 搜索选项 -->
    <div v-if="value === ''" class="option-box">
      <!-- 热搜区域 -->
      <div class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
          <li
            @click="clickSearch(item)"
            v-for="(item, index) in shareTopList"
            :key="index"
            class="tag"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 历史记录区域 -->
      <div class="section">
        <div class="title">历史记录 <span @click="remove">清空</span></div>
        <div class="tags">
          <span
            @click="clickSearch(item)"
            v-for="(item, index) in history"
            :key="index"
            class="tag"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div v-else class="search-list">
      <ShareList
        v-for="item in shareList"
        :key="item.id"
        :item="item"
      ></ShareList>
    </div>
  </div>
</template>

<script>
import { shareTopSearch, shareList } from '@/api/find.js'
import { saveHistory, getHistory, removeHistory } from '@/utils/ShareList.js'
export default {
  data () {
    return {
      value: '',
      // 热搜词
      shareTopList: [],
      history: getHistory(),
      shareList: []
    }
  },
  created () {
    shareTopSearch().then(res => {
      // window.console.log(res)
      this.shareTopList = res.data
    })
  },
  methods: {
    remove () {
      removeHistory()
      this.history = []
    },
    clickSearch (item) {
      // window.console.log('点了历史搜索一次')
      // window.console.log(this.history)
      this.value = item
      this.onSearch()
    },
    onSearch () {
      if (this.value !== '') {
        // unshift数组头插法  shift数组头删法
        // pop数组尾删法
        this.history.unshift(this.value)
        // Set方法数组去重
        this.history = [...new Set(this.history)]
        if (this.history.length > 5) {
          this.history.pop()
        }
        saveHistory(this.history)
        shareList({ q: this.value }).then(res => {
          // window.console.log(res)
          res.data.list.forEach(v => {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
            v.title = v.title.replace(this.value, `<span>${this.value}</span>`)
          })
          this.shareList = res.data.list
        })
      }
    }
  }
}
</script>

<style lang="less">
.interview-search-container {
  .top-box {
    padding-bottom: 11px;
    background: @white-color;
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 0.02667rem;
    }
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-search__content {
      background: #f7f4f5;
      font-size: 14px;
      color: #b3b3b3;
      .iconfont {
        font-size: 19px;
        color: #b3b3b3;
      }
    }
  }
  // 搜索选项
  .option-box {
    padding: 15px;

    .section {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
          color: #545671;
        }
      }
      .tags {
        margin-top: 18px;
        display: flex;
        .tag {
          margin-right: 10px;
          margin-bottom: 11px;
          padding: 6px;
          border-radius: 4px;
          font-size: 12px;
          color: @subdominant-font-color;
          background-color: #eceaea;
        }
      }
    }
  }
  .result-box {
    padding: 15px;
  }
  .search-list {
    padding: 0 15px;
  }
}
</style>
