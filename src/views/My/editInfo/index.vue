<template>
  <div class="editInfo">
    <NavBar
      class="NavBar"
      @onClickLeft="back"
      @onClickRight="saveEdit"
      :title="title"
      right_text="保存"
    ></NavBar>
    <div class="main_box">
      <van-field
        v-if="$route.query.prop !== 'avatar'"
        class="field"
        v-model="inputValue"
      />
      <van-uploader class="upload" v-else :after-read="afterRead" />
    </div>
  </div>
</template>
<script>
import { uploadFiles } from '@/api/profile.js'
export default {
  name: 'editInfo',
  data () {
    return {
      text: '',
      inputValue: '',
      avatarId: '',
      title: '',
      file: ''
    }
  },
  created () {
    // 获取url中的prop值
    const prop = this.$route.query.prop
    const obj = {
      avatar: '头像',
      nickname: '昵称',
      position: '职称',
      intro: '个人简介'
    }
    this.title = `修改${obj[prop]}`
  },
  methods: {
    // to do something after uploading
    afterRead (fileInfo) {
      window.console.log('fileInfo', fileInfo)
      const data = new FormData()
      data.append('files', fileInfo.file)
      uploadFiles(data).then(res => {
        window.console.log('res', res)
        this.avatarId = res.data[0].id
      })
    },
    // 左返回键
    back () {},
    // 右保存键
    saveEdit () {}
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
