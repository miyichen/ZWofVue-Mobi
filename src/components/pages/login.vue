<template lang="html">
  <div class="login">
    <h2>登录</h2>
    <van-form @submit="onSubmit">
      <van-field
        class="loginbg"
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        class="loginbg"
        v-model="password"
        :type="pwtype"
        name="密码"
        label="密码"
        placeholder="密码"
        :right-icon="pwicon"
        @click-right-icon="showPassword"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" color="#1d2088" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
      pwtype:'password',
      pwicon:'eye-o'
    };
  },
  methods: {
    ...mapMutations(['setUid']),
    async onSubmit(values) {
      const {data} = await this.$http.post('/api/login',values)
      if(data.status === 200){
        this.setUid(data.uid)
        this.$router.push('task')
      }
    },
    clearUid(){
      this.setUid('')
    },
    showPassword(){
      if(this.pwtype === 'password'){
        this.pwtype = 'text'
        this.pwicon = 'eye'
      }else{
        this.pwtype = 'password'
        this.pwicon = 'eye-o'
      }
    }
  },
  created(){
    this.clearUid()
  }
}
</script>

<style lang="css" scoped>
.login{
  margin: 46px 0 60px 0;
  padding:10px 10px 0 10px;
}
.login h2{
  margin: 0 0 20px 10px;
}
.loginbg{
  background-color: rgba(255, 255, 255, 0);
}
</style>
