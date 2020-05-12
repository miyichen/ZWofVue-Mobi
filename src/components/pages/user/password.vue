<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="password">
      <van-form show-error show-error-message @submit="onSubmit">
        <van-cell-group title="原密码">
          <van-field
          name="oldPassword"
          v-model="oldPassword"
          type="password"
          label=""
          placeholder="请输入原密码"
          :rules="[
            { required:true, message: '请输入原密码' },
            { validator:valiOP, trigger:'onBlur' ,message: '原密码不正确' }
          ]"
          />
        </van-cell-group>
        <van-cell-group title="新密码">
          <van-field
          name="newPassword1"
          v-model="newPassword1"
          type="password"
          label=""
          placeholder="请输入新密码"
          :rules="[
            { required:true, message: '请输入新密码' },
            { validator:valiNP, trigger:'onChange' ,message: '两次输入的新密码不一致' },
            { validator:valiNP2, trigger:'onChange' ,message: '新密码不能和旧密码相同' }
          ]"
          />
          <van-field
          name="newPassword2"
          v-model="newPassword2"
          type="password"
          label=""
          placeholder="请再次输入新密码"
          :rules="[
            { required:true, message: '请再次输入新密码' },
            { validator:valiNP, trigger:'onChange' ,message: '两次输入的新密码不一致' },
            { validator:valiNP2, trigger:'onChange' ,message: '新密码不能和旧密码相同' }
          ]"
          />
        </van-cell-group>
        <van-row class='paddingBox' gutter="10">
          <van-col span="24">
            <van-button color="#1d2088" size="large" block type="info" native-type="submit">
              提交
            </van-button>
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import Navbar from '../../frame/navbar.vue'
export default {
  data(){
    return {
      oldPassword:'',
      newPassword1:'',
      newPassword2:''
    }
  },
  methods:{
    valiOP(val) {
      var datas = {'user':'abc','password':val}
      return new Promise(async(resolve) => {
        const {data} = await this.$http.post('/api/oldpassword',datas)
        if(data.status === 200 && data.res === true){
          resolve(true)
        }else if(data.status === 200 && data.res === false){
          resolve(false)
        }
      })
    },
    valiNP(val){
      if(this.newPassword1 != '' && this.newPassword2 != ''){
        if(this.newPassword1 === this.newPassword2){
          return true
        }
        else{
          return false
        }
      }
    },
    valiNP2(val){
      if(this.newPassword1 === this.oldPassword){
        return false
      }
      else{
        return true
      }
    },
    async onSubmit(value) {
      console.log(value)
      const {data} = await this.$http.post('/api/newpassword',value)
      if(data.status === 200){
        Dialog.alert({
          message: '修改密码成功，请重新登录！',
        }).then(() => {
          console.log("退回到登录界面并清空localstorage，目前还没做")
        });
      }
    },
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.password{
  margin: 46px 0 60px 0;
}
</style>
