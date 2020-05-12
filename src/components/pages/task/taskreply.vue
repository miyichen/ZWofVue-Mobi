<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="task-reply">
      <van-form show-error show-error-message @submit="onSubmit">
        <van-field
          name="describe"
          v-model="describe"
          rows="2"
          autosize
          label="处理结果"
          type="textarea"
          maxlength="200"
          placeholder="请输入"
          show-word-limit
          :rules="[{ required:true, message: '本项必填' }]"
        />
        <van-field
          name="uploader"
          label="图片上传"
          :rules="[{ required:true, message: '至少上传1张图片' }]"
        >
          <template #input>
            <van-uploader v-model="uploader" :before-read="valiImg"/>
          </template>
        </van-field>
        <van-row class='paddingBox' gutter="10">
          <van-col span="24">
            <van-button color="#1d2088" icon="certificate" size="large" block type="info" native-type="submit">
              提交
            </van-button>
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import Navbar from '../../frame/navbar.vue'
export default {
  data() {
    return {
      describe: '',
      uploader: [],
    };
  },
  props:['id'],
  methods: {
    async onSubmit(value) {
      var idObj = {'tid':this.id}
      var formData = Object.assign(idObj,value)
      Toast.loading({
        message: '提交中...请稍后！',
        forbidClick: true,
        duration: 0
      });
      const { data } = await this.$http.post('/api/taskback',formData)
      if(data.status === 200){
        Toast.clear
        this.describe = ''
        this.uploader = []
        Toast.success('提交成功')
        this.$router.go(-1)
      }else{
        Toast.clear
        Toast.fail('提交失败，请稍后重试！')
      }
    },
    valiImg(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.task-reply{
  margin: 46px 0 60px 0;
  padding:0;
}
</style>
