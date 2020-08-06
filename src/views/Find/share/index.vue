<template>
  <div class="experience-detail-container">
    <!-- 导航栏 -->
    <NavBar title="面经分享" @onClickLeft="$router.go(-1)"></NavBar>
    <van-skeleton title avatar :row="20" v-if="shareInfo === ''" />
    <!-- 顶部 -->
    <template v-else>
      <div class="top-box">
        <div class="title">
          {{ shareInfo.title }}
        </div>
        <div class="info-box">
          <img :src="shareInfo.author.avatar" alt="" />
          <div class="name-box">
            <span class="name">{{ shareInfo.author.nickname }}</span>
            <span class="time">{{ shareInfo.created_at | formateTime }}</span>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="experience-content" v-html="shareInfo.content"></div>
    </template>
    <!-- 评论 -->
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">评论 <span class="num">68</span></div>
      <!-- 每一项 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in commentList" :key="item.id" class="comment">
          <!-- 姓名 点赞区域 -->
          <div class="info-box">
            <img :src="item.author.avatar" alt="" />
            <div class="name-box">
              <span class="name">{{ item.author.nickname }}</span>
              <span class="time">{{ item.created_at | formateTime }}</span>
            </div>
            <div class="zan-box">
              <span>{{ item.star }}</span>
              <i class="iconfont iconbtn_dianzan_small_nor"></i>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="content-box">
            <div class="content" @click="popUp(item)">
              {{ item.content }}
            </div>
            <div class="reply-box" v-if="item.children_comments.length > 0">
              <div
                class="reply"
                v-for="item1 in item.children_comments"
                :key="item1.id"
                @click="popUp(item1)"
              >
                <span class="name">{{ item1.author }}:</span>
                {{ item1.content }}
              </div>
            </div>
          </div>
          <!-- 回复评论 -->
        </div>
      </van-list>

      <!-- 底部盒子 -->
      <div class="bottom-box">
        <div class="input" @click="show = true">我来补充两句</div>
        <div class="shoucang">
          <i class="iconfont iconbtn_shoucang_nor"></i>
          {{ shareInfo.collect }}
        </div>
        <div class="star" @click="clickStarArticles">
          <i
            class="iconfont iconbtn_dianzan_small_nor"
            :class="{ actived: isStar }"
          ></i>
          {{ shareInfo.star }}
        </div>
        <div class="share" @click="clickShare">
          <i class="iconfont iconbtn_share"></i>
          {{ shareInfo.share }}
        </div>
      </div>
      <!-- 底部回复弹出层 -->
      <van-popup
        class="input-pop"
        v-model="show"
        position="bottom"
        :style="{ height: '24%' }"
      >
        <van-field
          autosize
          type="textarea"
          autofocus
          v-model="value"
          :placeholder="placeholder"
          rows="4"
        />
        <span @click="subComment">发送</span>
      </van-popup>
      <!-- 分享弹出层 -->
      <van-popup v-model="showShare">
        <div v-if="!imgUrl" class="share-box" ref="shareBox">
          <div class="text">
            长按图片下载并分享
          </div>
          <div class="share-content-box">
            <div class="title">
              {{ shareInfo.title }}
            </div>
            <div class="user-box">
              <img :src="shareInfo && shareInfo.author.avatar" alt="" />
              <span>{{ shareInfo && shareInfo.author.nickname }}</span>
            </div>
            <div class="content" v-html="shareInfo.content"></div>
            <img class="logo" src="@/assets/img_share_logo@2x.png" alt="" />
            <img class="code" :src="codeUrl" alt="" />
            <div class="direction">长按识别二维码查看原文</div>
          </div>
        </div>
        <img v-else :src="imgUrl" alt="" class="shareImg" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  shareInfo,
  shareComments,
  sendComment,
  starArticles
} from '@/api/find.js'
import { mapMutations, mapState } from 'vuex'
import { getToken } from '@/utils/token.js'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      show: false,
      showShare: false,
      value: '',
      shareInfo: '',
      limit: 4,
      start: 0,
      finished: false,
      loading: false,
      commentList: [],
      placeholder: '请输入评论',
      // 回复评论数据对象   此处利用对象来动态添加对象属性进行axios接口数据交互
      parentComment: '',
      codeUrl: '',
      imgUrl: ''
    }
  },
  created () {
    window.console.log(this.$route.params.id)
    if (getToken()) {
      this.$checkLogin()
    }
    shareInfo(this.$route.params.id).then(res => {
      window.console.log('详情', res)
      if (res.data.author.avatar) {
        res.data.author.avatar =
          process.env.VUE_APP_URL + res.data.author.avatar
      }
      this.shareInfo = res.data
    })
  },
  computed: {
    // 合并用户信息
    ...mapState(['userInfo']),
    isStar () {
      // 通过用户信息来判断是否登录了
      if (this.userInfo) {
        const id = +this.$route.params.id // 字符串变数字类型
        const isStar = this.userInfo.starArticles.includes(id)
        window.console.log(isStar)
        return isStar
      } else {
        return false
      }
    }
  },
  // DOM树渲染完成后
  mounted () {
    QRCode.toDataURL(window.location.href)
      .then(url => {
        console.log('url', url)
        this.codeUrl = url
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    ...mapMutations(['SETPROPVALUE']),
    clickStarArticles () {
      // window.console.log('谢谢点赞')
      this.$toast.loading({ duration: 0 })
      this.$checkLogin()
        .then(() => {
          starArticles({ article: this.$route.params.id }).then(res => {
            window.console.log(res)
            this.SETPROPVALUE({
              propName: 'starArticles',
              propValue: res.data.list
            })
            this.shareInfo.star = res.data.num
            window.console.log(res.data.num)
            this.$toast.clear()
          })
        })
        .catch(err => {
          window.console.log(err)
        })
    },
    // 评论发送
    subComment () {
      // 校验登录
      this.$checkLogin()
        .then(res => {
          // console.log('登陆啦')

          // 判断是发给谁的评论
          const data = {
            content: this.value
          }
          // 根据是否有parentComment 动态生成数据对象 根据控制点击部分来确定post的数据携带的id
          if (this.parentComment) {
            // 回复评论
            data.parent = this.parentComment.id
          } else {
            // 发表评论 给文章
            data.article = this.$route.params.id
          }
          // 发表评论
          sendComment(data).then(res => {
            console.log(res)
            if (res.data.parent) {
              // 回复评论
              // 添加到父评论中
              this.parentComment.children_comments.push(res.data)
              // 清空父评论
              this.parentComment = ''
            } else {
              // 文章评论
              if (res.data.author.avatar) {
                res.data.author.avatar =
                  process.env.VUE_APP_URL + res.data.author.avatar
              }
              // 追加到数组的顶端
              this.commentList.unshift(res.data)
            }

            // if (res.data.author.avatar) {
            //   res.data.author.avatar =
            //     process.env.VUE_APP_URL + res.data.author.avatar
            // }
            // // 追加到数组的顶端
            // this.commentList.unshift(res.data)
            // 提示用户成功
            this.$toast.success('发表成功')
            // 关闭框框
            this.show = false
            // 清空输入框
            this.value = ''
          })
        })
        .catch(err => {
          console.log(err)
          console.log('没有登陆')
        })
    },
    // 文章评论弹窗
    popUp (item) {
      window.console.log(item)
      this.parentComment = item
      if (item.author.nickname) {
        this.placeholder = `回复：@${item.author.nickname}`
      } else if (item.author) {
        this.placeholder = `回复：@${item.author}`
      } else {
        this.placeholder = '说点什么吧！'
      }
      this.show = true
    },
    // 点击分享
    clickShare () {
      // await this.$checkLogin()
      // this.showShare = true
      // window.scrollTo(0, 0)
      // this.$nextTick(async () => {
      //   const canvas = await html2canvas(this.$refs.shareBox, {
      //     allowTaint: true,
      //     useCORS: true
      //   })
      //   const imgUrl = canvas.toDataURL()
      //   this.imgUrl = imgUrl
      // })
      this.$checkLogin()
      this.showShare = true
      window.scrollTo(0, 0)
      this.$nextTick(() => {
        html2canvas(this.$refs.shareBox, {
          allowTaint: true,
          useCORS: true
        }).then(canvas => {
          window.console.log('canvas', canvas)
          // 尝试转换为 URL地址
          const imgUrl = canvas.toDataURL()
          // 设置src地址
          this.imgUrl = imgUrl
        })
      })
    },
    // 评论回复弹窗
    // replyPopUp (item1) {
    //   if (item1) {
    //     this.placeholder = `回复：@${item1.author}`
    //   } else {
    //     this.placeholder = '说点什么吧！'
    //   }
    //   this.show = true
    // },
    onLoad () {
      shareComments({
        id: this.$route.params.id,
        limit: this.limit,
        start: this.start
      }).then(res => {
        window.console.log('评论', res)
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
        })
        this.commentList.push(...res.data.list)
        this.loading = false
        this.start += this.limit
        if (this.commentList.length >= res.data.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="less">
.experience-detail-container {
  background-color: @white-color;
  .van-nav-bar__left {
    padding-left: 0;
  }
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .top-box {
    background-color: @white-color;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: @subdominant-font-color;
      }
      .time {
        font-size: 12px;
        color: @minor-font-color;
      }
    }
    .zan-box {
      span {
        color: @minor-font-color;
        font-size: 12px;
      }
      .iconfont {
        color: @minor-font-color;
        font-size: 24px;
      }
    }
  }
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: @main-font-color;
    background-color: @white-color;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: @white-color;
    padding: 26px 15px;
    overflow: hidden;
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: @minor-font-color;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
      }
    }
    .content-box {
      padding-left: 44px;
      .content {
        margin-top: 11px;
        font-size: 16px;
        color: @main-font-color;
        line-height: 27px;
      }
      .reply-box {
        margin-top: 5px;
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 12px;
        background: @border-color;
        .reply {
          font-size: 14px;
          color: @subdominant-font-color;
          word-break: break-all;
          &:not(:first-child) {
            margin-top: 15px;
          }
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    text-align: center;
    padding: 10px 15px 0;
    background-color: @white-color;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: @border-color;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: @subdominant-font-color;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: @subdominant-font-color;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
    }
    .star {
      margin-right: 24px;
      .actived {
        color: @main-color;
      }
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    box-sizing: border-box;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: @border-color;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: @subdominant-font-color;
      float: right;
      margin-top: 11px;
    }
  }
  .shareImg {
    width: 326px;
    height: 569px;
    display: block;
  }
  // 底部弹出层
  .share-box {
    width: 311px;
    height: 553px;
    background-size: 100% 100%;
    background-position-x: 0;
    background-position-y: 0;
    padding: 0 15px 15px;
    background-image: url('../../../assets/157844.jpg');
    display: flex;
    flex-direction: column;

    .text {
      text-align: center;
      font-size: 12px;
      color: @white-color;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: @white-color;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        font-size: 16px;
        margin-top: 20px;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          bottom: 0;
          left: 0;
          height: 25px;
          background-color: @white-color;
          opacity: 0.9;
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: @minor-font-color;
      }
    }
  }
}
</style>
