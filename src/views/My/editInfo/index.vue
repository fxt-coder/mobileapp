<template>
  <div class="editInfo">
    <NavBar
      class="NavBar"
      @onClickLeft="back"
      @onClickRight="saveEdit"
      :title="title"
      :right_text="isEdit ? '保存' : ''"
    ></NavBar>
    <div class="main_box">
      <!-- 文本修改 -->
      <van-field
        v-if="$route.query.prop !== 'avatar'"
        class="field"
        type="text"
        v-model="inputValue"
      />
      <!-- 头像上传 -->
      <van-uploader
        v-else
        v-model="fileList"
        :max-count="1"
        :after-read="afterRead"
      />
    </div>
  </div>
</template>
<script>
import { uploadFiles, editUserInfo } from '@/api/profile.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'editInfo',
  data () {
    return {
      inputValue: '',
      title: '',
      avatar: '',
      fileList: [{ url: '' }]
    }
  },
  computed: {
    // 计算属性  仓库数据实时更新
    ...mapState(['userInfo']),
    // true修改了  false没有修改
    isEdit () {
      return this.inputValue !== this.userInfo[this.$route.query.prop]
    }
  },
  created () {
    // 获取url中的prop值
    // const prop = this.$route.query.prop
    const obj = {
      avatar: '头像',
      nickname: '昵称',
      position: '职称',
      intro: '个人简介'
    }
    this.title = `修改${obj[this.$route.query.prop]}`
    this.inputValue = this.userInfo[this.$route.query.prop]
    if (this.$route.query.prop === 'avatar') {
      this.fileList[0].url = this.userInfo[this.$route.query.prop]
    }
    // this.title = `修改${obj[prop]}`
    // const propValue = this.userInfo[prop]
    // // window.console.log('propValue', propValue)
    // if (prop !== 'avatar') {
    //   this.inputValue = propValue
    // } else {
    //   this.fileList[0].url = propValue
    // }
  },
  methods: {
    ...mapMutations(['SETPROPVALUE']),
    // to do something after uploading
    afterRead (fileInfo) {
      // window.console.log('fileInfo', fileInfo)
      const data = new FormData()
      data.append('files', fileInfo.file)
      uploadFiles(data).then(res => {
        // window.console.log('res', res)
        this.avatar = res.data[0].id
      })
    },
    // 左返回键
    back () {
      // 返回逻辑
      this.$router.go(-1)
    },
    // 右保存键
    saveEdit () {
      if (this.isEdit === false) return
      const propValue = this.inputValue
      const prop = this.$route.query.prop
      if (prop === 'avatar' && this.avatar === '') {
        this.$toast.fail('请选择头像')
        return
      }
      const data = {}
      if (prop !== 'avatar') {
        data[prop] = propValue
      } else {
        data[prop] = this.avatar
      }
      // window.console.log('保存')
      this.$toast.loading({ duration: 0 })
      editUserInfo(data).then(res => {
        this.$toast.success('修改成功')
        if (prop !== 'avatar') {
          this.SETPROPVALUE({ propName: prop, propValue })
        } else {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          this.SETPROPVALUE({ propName: prop, propValue: res.data.avatar })
        }
        this.$router.go(-1)
      })
    }
  }
}
</script>
<style lang="less">
.editInfo {
  height: 100vh;
  // margin: 15px;
  background-color: @white-color;
  .main_box {
    text-align: center;
    .upload {
      text-align: center;
    }
    .field {
      // width: 100%;
      width: 345px;
      margin: 15px;
      background-color: @minor-font-color;
      align-items: center;
    }
  }
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
