<template>
  <div class="my">
    <div class="info">
      <div class="top">
        <div class="left">
          <p class="title">{{ userInfo.nickname }}</p>
          <p class="tips">{{ userInfo.intro }}</p>
        </div>
        <div class="right">
          <img
            @click="toProfile"
            style="width:50px"
            class="avatar"
            :src="userInfo.avatar"
            alt=""
          />
        </div>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <p class="num">{{ userInfo.submitNum }}</p>
            <p class="tips">累计答题</p>
          </li>
          <li>
            <p class="num">{{ userInfo.collectQuestions.length }}</p>
            <p class="tips">收藏题目</p>
          </li>
          <li>
            <p class="num">{{ userInfo.errorNum }}</p>
            <p class="tips">我的错题</p>
          </li>
          <li>
            <p class="num">
              <span>{{ correctPersent }}</span
              ><span class="tips1">%</span>
            </p>
            <p class="tips">正确率</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tag">
      <div class="data_box">
        <cell
          @click="clickCell"
          class="topcell"
          :value="userInfo.position"
          title="我的岗位"
          icon="iconicon_mine_gangwei"
        ></cell>
        <div class="title">面经数据</div>
        <ul>
          <li>
            <p>
              昨日阅读<span class="data_num1"
                >+{{ userInfo.shareData.read.yesterday }}</span
              >
            </p>
            <p class="data_num2">{{ userInfo.shareData.read.total }}</p>
            <p>阅读总数</p>
          </li>
          <li>
            <p>
              昨日获赞<span class="data_num1"
                >+{{ userInfo.shareData.star.yesterday }}</span
              >
            </p>
            <p class="data_num2">{{ userInfo.shareData.star.total }}</p>
            <p>获赞总数</p>
          </li>
          <li>
            <p>
              昨日新增<span class="data_num1"
                >+{{ userInfo.shareData.comment.yesterday }}</span
              >
            </p>
            <p class="data_num2">{{ userInfo.shareData.comment.total }}</p>
            <p>评论总数</p>
          </li>
        </ul>
      </div>
      <div class="bottomcell">
        <cell
          value="22"
          title="我的面经分享"
          icon="iconicon_mine_mianjing"
        ></cell>
        <cell
          :value="userInfo.systemMessages"
          title="我的消息"
          icon="iconicon_mine_xiaoxi"
        ></cell>
        <cell
          :value="userInfo.collectQuestions.length"
          title="收藏的题库"
          icon="iconicon_mine_tikushoucang"
        ></cell>
        <cell
          value="22"
          title="收藏的企业"
          icon="iconicon_mine_qiyeshoucang"
        ></cell>
        <cell
          :value="userInfo.errorNum"
          title="我的错题"
          icon="iconicon_mine_cuoti"
        ></cell>
        <cell
          value="22"
          title="收藏的面试经验"
          icon="iconbtn_shoucang_nor"
        ></cell>
      </div>
    </div>
  </div>
</template>
<script>
// import cell from '@/components/cell'
import { mapState } from 'vuex'
export default {
  name: 'my',
  // components: {
  //   cell
  // },
  computed: {
    ...mapState(['userInfo']),
    // userInfo () {
    //   return this.$store.state.userInfo
    // },
    correctPersent () {
      return (
        ((this.userInfo.submitNum - this.userInfo.errorNum) /
          this.userInfo.submitNum) *
        100
      ).toFixed(1)
    }
  },
  methods: {
    clickCell () {
      window.console.log('我是产品')
    },
    toProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>
<style lang="less">
.my {
  // background-color: orange;
  .info {
    height: 206px;
    padding: 10px 30px 0 10px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .top {
      padding-top: 21px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .title {
          margin: 0;
          height: 30px;
          font-size: 21px;
          color: @white-color;
        }
        .tips {
          height: 17px;
          margin: 4px 0;
          opacity: 0.7;
          font-size: 12px;
          color: @white-color;
        }
      }
      .right {
        .avatar {
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.38);
          border-radius: 50%;
        }
      }
    }
    .bottom {
      padding: 31px 0 0 23px;
      ul {
        display: flex;
        justify-content: space-between;
        .num {
          height: 24px;
          margin: 0;
          text-align: center;
          font-size: 21px;
          color: @white-color;
          .tips1 {
            height: 17px;
            margin: 4px 0;
            font-size: 12px;
            color: @white-color;
          }
        }
        .tips {
          height: 17px;
          margin: 4px 0;
          opacity: 0.7;
          font-size: 12px;
          color: @white-color;
        }
      }
    }
  }
  .tag {
    background-color: @bg-color;
    margin: 0 15px;
    padding-top: 27px;
    padding-bottom: 10px;
    position: relative;
    .data_box {
      // background-color: #f9f9f9;
      background-color: @white-color;
      .title {
        padding-left: 30px;
        padding-top: 18px;
        height: 20px;
        font-size: 15px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #181a39;
        line-height: 20px;
        letter-spacing: 0px;
      }
      .data_num2 {
        padding-top: 10px;
        margin: 0;
        height: 24px;
        font-size: 21px;
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-around;
        p {
          &:first-child {
            margin: 0;
            padding-top: 18px;
            height: 14px;
            font-size: 10px;
          }
          &:last-child {
            padding-top: 10px;
            margin: 0;
            height: 17px;
            font-size: 12px;
            text-align: center;
          }
        }
      }
      .data_num1 {
        color: @assist-color;
      }
    }
    .topcell {
      position: absolute;
      top: -40px;
      border-radius: 8px;
    }
    .bottomcell {
      border-radius: 8px;
      margin-top: 10px;
    }
  }
}
</style>
