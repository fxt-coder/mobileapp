<template>
  <div class="find">
    <!-- 导航栏 -->
    <NavBar class="title" :showBack="false" title="发现"></NavBar>
    <!-- 缓存组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 面试技巧区域 -->
      <div class="technic-container">
        <cell title="面试技巧" value="查看更多" @click="toTechnicList"></cell>
        <!-- 列表项 -->
        <div class="technic-list" @click="toTechnicDetails">
          <!-- 有图片 -->
          <div class="item" v-for="item in technicList" :key="item.id">
            <div class="left">
              <h3>
                {{ item.title }}
              </h3>
              <div class="detail-box">
                <div class="time">{{ item.created_at | formatTime }}</div>
                <div class="read">
                  <i class="iconfont iconicon_liulanliang"></i>
                  {{ item.read }}
                </div>
                <div class="star">
                  <i class="iconfont iconicon_dianzanliang"></i>
                  {{ item.star }}
                </div>
              </div>
            </div>
            <div v-if="item.cover" class="cover">
              <img :src="item.cover" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 市场数据区域 -->
      <div class="data-container">
        <cell title="市场数据" value="查看更多" @click="toDataList"></cell>
        <div class="data-content">
          <div class="tags">
            <span class="tag">{{ hotDataList.city }}</span>
            <span class="tag">{{ hotDataList.position }}</span>
          </div>
          <!-- 列表 -->
          <div @click="toDataDetails">
            <div
              class="data-list"
              v-for="(item, index) in hotData"
              :key="index"
            >
              <!-- 箭头上 -->
              <div class="item">
                <div class="time">{{ item.year }}</div>
                <div class="process">
                  <div
                    class="step"
                    :style="{
                      width:
                        ((item.salary / hotDataList.topSalary) * 100).toFixed(
                          1
                        ) + '%'
                    }"
                  >
                    {{ item.salary }}
                  </div>
                </div>
                <div class="arrow-box">
                  <i
                    class="iconfont "
                    :class="{
                      iconicon_shangsheng: item.percent > 0,
                      iconicon_xiajiang: item.percent < 0
                    }"
                  ></i>
                  <span v-if="item.percent"> {{ item.percent }}% </span>
                  <i v-else>--</i>
                </div>
              </div>
            </div>
          </div>
          <!-- 更多 -->
          <div class="more" @click="toggleData">
            展开更多
            <i class="iconfont iconicon_zhankai" :class="{ rotate: isAll }"></i>
          </div>
        </div>
      </div>
      <!-- 面经分享 -->
      <div class="share-container">
        <cell title="面经分享" value="查看更多" @click="toShareList"> </cell>
        <div class="share-content">
          <div class="list" @click="toShareDetails">
            <ShareList
              v-for="item in shareList"
              :key="item.id"
              :item="item"
            ></ShareList>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入api
import { technicList, hotData, shareList } from '@/api/find.js'
// 导入moment
import moment from 'moment'
export default {
  name: 'find',
  data () {
    return {
      // 面试经验列表
      hotData: [],
      technicList: [],
      // 默认显示数据存在单独的变量中
      hotDataList: {},
      shareList: [],
      isAll: false,
      isLoading: false
      // dataList: {}
    }
  },
  // 过滤器
  filters: {
    // 格式化日期
    formatTime (value) {
      // 处理数据 并返回
      // return moment(value).format('YYYY年MM月DD日')
      moment.locale('zh-cn')
      return moment(value).fromNow()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 跳转详情页面
    toDataDetails () {
      this.$router.push('/marketData')
    },
    toTechnicDetails () {
      this.$router.push('/technic')
    },
    toShareDetails () {
      this.$router.push('/share')
    },
    // 跳转到列表页面
    toDataList () {
      this.$router.push('/marketDataList')
    },
    toTechnicList () {
      this.$router.push('/technicList')
    },
    toShareList () {
      this.$router.push('/shareList')
    },
    // 下拉刷新
    onRefresh () {
      // this.$toast.loading({ duration: 0 })
      setTimeout(() => {
        this.getData()
        // this.$toast.clear()
        // 关闭loading
        this.isLoading = false
      }, 2000)
    },
    getData () {
      // 获取面试经验
      technicList().then(res => {
        // console.log(res)
        // 拼接基地址
        res.data.list.forEach(v => {
          // 存在封面采取拼接基地址
          if (v.cover) {
            v.cover = process.env.VUE_APP_URL + v.cover
          }
        })
        // 数据处理完毕
        this.technicList = res.data.list
      })
      // 获取市场数据
      hotData().then(res => {
        // window.console.log('hotDataList', res)
        this.hotDataList = res.data
        this.hotDataList.yearSalary.reverse()
        this.hotData = this.hotDataList.yearSalary.slice(0, 4)
      })
      // 获取面经分享
      shareList().then(res => {
        window.console.log(res)
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.cover
          }
        })
        this.shareList = res.data.list
      })
    },
    toggleData () {
      window.console.log('点我展示全部')
      this.isAll = !this.isAll
      if (this.isAll === true) {
        this.hotData = this.hotDataList.yearSalary
      } else {
        this.hotData = this.hotDataList.yearSalary.slice(0, 4)
      }
    }
  }
}
</script>

<style lang="less">
.find {
  .van-nav-bar__title {
    font-weight: 700;
    font-size: 18px;
  }
  // 全部设置cell左侧标题
  .van-cell__title span {
    font-size: 16px;
    font-weight: 700;
  }

  // 面试技巧
  .technic-container {
    margin-bottom: 10px;
    .technic-list {
      padding: 0 14px;
      background: @white-color;
      .item {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          h3 {
            font-weight: 600;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .detail-box {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: @minor-font-color;
            .time {
              flex: 1;
            }
            .read {
              margin-right: 20px;
              display: flex;
              align-items: center;
              i {
                margin-right: 10px;
                font-size: 14px;
              }
            }
            .star {
              display: flex;
              align-items: center;
              i {
                margin-right: 10px;
                font-size: 14px;
              }
            }
          }
        }
        .cover {
          margin-left: 20px;
          img {
            display: block;
            width: 113px;
            height: 73px;
            border-radius: 8px;
          }
        }
      }
    }
  }
  // 市场数据
  .data-container {
    background: @white-color;
    margin: 10px;
    .data-content {
      padding: 0 15px 0 8px;
    }
    .tags {
      margin-bottom: 20px;
      .tag {
        background: @minor-font-color;
        color: @subdominant-font-color;
        font-size: 12px;
        padding: 5px;
        margin-right: 10px;
        border-radius: 8px;
      }
    }
    // 列表
    .data-list {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .time {
          font-size: 12px;
          color: @subdominant-font-color;
          margin-right: 15px;
        }
        .process {
          height: 12px;
          background: @minor-font-color;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 15px;
          flex: 1;
          .step {
            height: 100%;
            width: 50%;
            background: @error-color;
            color: @white-color;
            text-align: right;
            font-size: 12px;
            padding-right: 5px;
            border-radius: 8px;
          }
        }
        .arrow-box {
          display: flex;
          text-align: center;
          align-items: center;
          font-size: 12px;
          width: 30px;
          i {
            font-size: 16px;
            // 箭头下
            &.iconicon_xiajiang {
              color: @error-color;
            }
            // 箭头上
            &.iconicon_shangsheng {
              color: @success-color;
            }
          }
        }
      }
    }
    // 更多
    .more {
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: @subdominant-font-color;
      align-items: center;
      i {
        color: @minor-font-color;
        font-size: 14px;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }

  // 面经分享
  .share-container {
    margin-bottom: 20px;
    background: @white-color;
    .share-content {
      padding: 0 15px;
    }
  }
}
</style>
