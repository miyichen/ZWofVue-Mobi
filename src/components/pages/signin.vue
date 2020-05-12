<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="signin">
      <van-steps direction="vertical" :active="signActive">
        <van-step class="abc">
          <h3>上班打卡</h3>
          <div class="signtime">{{onWork}}</div>
        </van-step>
        <van-step v-show="signActive != '0'">
          <h3>下班打卡</h3>
          <div class="signtime">{{offWork}}</div>
        </van-step>
      </van-steps>
      <van-col class="btnBox" offset="6" span="12">
        <van-button class="signinBtn" type="primary" round @click="clickBtnTime">
          <div class="signintext">{{signStateName}}</div>
          <div class="signintime">{{signStateTime}}</div>
        </van-button>
      </van-col>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'vant'
import Navbar from '../frame/navbar.vue'
export default {
  data:()=>{
    return {
      signActive:'',
      signStateName:'',
      signStateTime:'',
      onWork:'',
      offWork:''
    }
  },
  methods:{
    nowTimes(){
      this.setSignTime()
      setInterval(this.nowTimes,1000);
      this.clearTimes()
    },
    clearTimes(){
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    setSignTime(){
      this.signStateTime = moment(new Date()).format('HH:mm:ss')
    },
    setSignState(){
      if(this.onWork === '' && this.offWork === ''){
        this.signActive = 0
        this.signStateName = '上班打卡'
      }else if(this.onWork != '' && this.offWork === ''){
        this.signActive = 1
        this.signStateName = '下班打卡'
      }else if(this.onWork != '' && this.offWork != ''){
        this.signActive = 1
        this.signStateName = '更新打卡'
      }
    },
    async clickBtnTime(){
      var workdata = {
        'user':'某某',
        'userid':'9821',
        'workstate':this.signActive,
        'time':this.signStateTime
      }
      const { data } = await this.$http.post('/api/worktime',workdata)
      if(data.status === 200){
        if(this.signActive === 0){
          this.onWork = this.signStateTime
          this.signActive = 1
          this.signStateName = '下班打卡'
        }else{
          this.offWork = this.signStateTime
          this.signStateName = '更新打卡'
        }
        Toast.success('打卡成功')
      }
    },
    async getTime(){
      var workdata = {
        'user':'某某',
        'userid':'9821'
      }
      const { data } = await this.$http.post('/api/signin',workdata)
      if(data.status === 200){
        this.onWork = data.onWork
        this.offWork = data.offWork
      }
    }
  },
  created(){
    this.getTime()
  },
  mounted() {
    this.setSignState()
    this.nowTimes()
  },
  beforeDestroy() {
    this.clearTimes()
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.signin{
  margin: 46px 0 0 0;
  padding:0 20px;
}
.signtime{
  height:24px;
}
.btnBox{
  text-align:center;
  padding:40px 0 0 0;
}
.signinBtn{
  width:140px;
  height: 140px;
  margin:auto 0;
}
.signintext{
  font-size: 19px;
  height:30px;
}
.signintime{
  font-size: 15px
}
.van-steps {
  overflow: hidden;
  background-color: #f6f7f9;
}
.van-step--vertical {
  display: block;
  float: none;
  padding: 0;
  line-height: 18px;
}
</style>
