<template>
  <div class="company-container">
    <div class="top-box">
      <span>公司</span>
      <!-- 搜索 -->
      <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>
    <!-- 图片 -->
    <div v-if="!showPop" class="banner-box">
      <img src="../../assets/157844.jpg" alt="" />
    </div>
    <!-- 筛选区域 -->
    <div class="filter-box">
      <span class="recommend">推荐</span>
      <span class="distance"
        >距离
        <span class="arrow-box">
          <i class="iconfont iconicon_xuanze_nor rotate"></i>
          <i class="iconfont iconicon_xuanze_nor "></i>
        </span>
      </span>
      <span class="grade"
        >评分
        <span class="arrow-box">
          <i class="iconfont iconicon_xuanze_nor rotate"></i>
          <i class="iconfont iconicon_xuanze_nor "></i>
        </span>
      </span>
      <span class="filter">筛选</span>
    </div>
    <!-- 主体区域 -->
    <div class="main-box">
      <div class="item van-hairline--bottom">
        <div class="cover">
          <img src="../../assets/157844.jpg" alt="" />
        </div>
        <div class="content-box">
          <div class="top">
            <div class="left">
              <span class="name">传智播客</span>
              <span class="sub">昌平区 1km</span>
            </div>
            <div class="score">5.0分</div>
          </div>
          <div class="tags">
            <span class="tag">医疗健康</span>
            <span class="tag">B轮</span>
            <span class="tag">100-499</span>
          </div>
          <div class="bottom">
            在招职位: <span>50</span> / 最后更新时间: 1小时前
          </div>
        </div>
      </div>
      <div class="item van-hairline--bottom">
        <div class="cover">
          <img src="../../assets/157844.jpg" alt="" />
        </div>
        <div class="content-box">
          <div class="top">
            <div class="left">
              <span class="name">传智播客</span>
              <span class="sub">昌平区 1km</span>
            </div>
            <div class="score">5.0分</div>
          </div>
          <div class="tags">
            <span class="tag">医疗健康</span>
            <span class="tag">B轮</span>
            <span class="tag">100-499</span>
          </div>
          <div class="bottom">
            在招职位: <span>50</span> / 最后更新时间: 1小时前
          </div>
        </div>
      </div>
      <div class="item van-hairline--bottom">
        <div class="cover">
          <img src="../../assets/157844.jpg" alt="" />
        </div>
        <div class="content-box">
          <div class="top">
            <div class="left">
              <span class="name">传智播客</span>
              <span class="sub">昌平区 1km</span>
            </div>
            <div class="score">5.0分</div>
          </div>
          <div class="tags">
            <span class="tag">医疗健康</span>
            <span class="tag">B轮</span>
            <span class="tag">100-499</span>
          </div>
          <div class="bottom">
            在招职位: <span>50</span> / 最后更新时间: 1小时前
          </div>
        </div>
      </div>
      <div class="item van-hairline--bottom">
        <div class="cover">
          <img src="../../assets/157844.jpg" alt="" />
        </div>
        <div class="content-box">
          <div class="top">
            <div class="left">
              <span class="name">传智播客</span>
              <span class="sub">昌平区 1km</span>
            </div>
            <div class="score">5.0分</div>
          </div>
          <div class="tags">
            <span class="tag">医疗健康</span>
            <span class="tag">B轮</span>
            <span class="tag">100-499</span>
          </div>
          <div class="bottom">
            在招职位: <span>50</span> / 最后更新时间: 1小时前
          </div>
        </div>
      </div>
      <div class="item van-hairline--bottom">
        <div class="cover">
          <img src="../../assets/157844.jpg" alt="" />
        </div>
        <div class="content-box">
          <div class="top">
            <div class="left">
              <span class="name">传智播客</span>
              <span class="sub">昌平区 1km</span>
            </div>
            <div class="score">5.0分</div>
          </div>
          <div class="tags">
            <span class="tag">医疗健康</span>
            <span class="tag">B轮</span>
            <span class="tag">100-499</span>
          </div>
          <div class="bottom">
            在招职位: <span>50</span> / 最后更新时间: 1小时前
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      showPop: false,
      value: ''
    }
  }
}
</script>

<style lang="less">
.company-container {
  background-color: @white-color;

  .top-box {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    background-color: @white-color;
    .van-search {
      padding-right: 0;
      flex: 1;
    }
    .van-search__content {
      border-radius: 16px;
    }
    span {
      font-size: 18px;
      font-weight: 600;
      margin-right: 19px;
    }
  }
  .search-box {
    width: 345px;
    flex: 1;
    margin: 0 auto;
    height: 34px;
    background: @bg-color;
    border-radius: 17px;
    font-size: 14px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 19px;
    }
  }
  .banner-box {
    padding: 0px 15px 0px;
    img {
      width: 100%;
    }
  }
  .filter-box {
    padding: 0 15px 0;
    display: flex;
    align-items: center;
    background-color: white;
    span:not(.arrow-box) {
      font-size: 14px;
      margin-right: 40px;
      font-weight: normal;
      display: flex;
      align-items: center;
      line-height: 20px;
      letter-spacing: 0px;
      i {
        font-size: 15px;
        color: #b4b4bc;
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-box {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        .rotate {
          transform: rotate(180deg);
        }
      }
    }
    span.filter {
      flex: 1;
      justify-content: flex-end;
      margin: 0;
    }
  }
  .main-box {
    padding: 0 15px;
    .item {
      display: flex;
      height: 156px;
      padding-top: 24px;
      .cover {
        margin-right: 15px;
        img {
          width: 66px;
          height: 66px;
        }
      }
      .content-box {
        flex: 1;
        .top {
          display: flex;
          align-items: center;
          .left {
            flex: 1;
            span {
              display: block;
            }
            .name {
              font-size: 18px;
              color: #19232b;
              margin-bottom: 5px;
            }
            .sub {
              font-size: 12px;
              color: #545671;
            }
          }
          .score {
            font-size: 12px;
            color: #545671;
          }
        }
        .tags {
          margin-top: 13px;
          display: flex;
          .tag {
            display: block;
            font-size: 12px;
            color: #b4b4bd;
            padding: 2px 7px;
            background: #f7f4f5;
            margin-right: 7px;
          }
        }
        .bottom {
          margin-top: 16px;
          font-size: 12px;
          color: #b4b4bd;
          span {
            color: #53b5d1;
          }
        }
      }
    }
  }
}
</style>
