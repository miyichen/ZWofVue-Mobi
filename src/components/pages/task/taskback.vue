<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="task-back">
      <van-form show-error show-error-message @submit="onSubmit">
        <van-field
          readonly
          clickable
          name="reason"
          :value="reason"
          label="原因"
          placeholder="点击选择"
          @click="reasonPicker = true"
          :rules="[{ required:true, message: '本项必填' }]"
        />
        <van-popup v-model="reasonPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="reasonOption"
            @confirm="onReason"
            @cancel="reasonPicker = false"
          />
        </van-popup>
        <van-field
          name="describe"
          v-model="describe"
          rows="2"
          autosize
          label="说明"
          type="textarea"
          maxlength="200"
          placeholder="请输入"
          show-word-limit
          :rules="[{ required:true, message: '本项必填' }]"
        />
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
      reason: '',
      reasonPicker: false,
      reasonOption: ['无技能证', '无故障', '无配件'],
    };
  },
  props:['id'],
  methods:{
    onReason(value) {
      this.reason = value;
      this.reasonPicker = false;
    },
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
        this.reason= ''
        Toast.success('提交成功')
        this.$router.go(-1)
      }else{
        Toast.clear
        Toast.fail('提交失败，请稍后重试！')
      }
    },
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.task-back{
  margin: 46px 0 60px 0;
  padding:0;
}
</style>
