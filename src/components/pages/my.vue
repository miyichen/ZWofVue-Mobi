<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="my">
      <van-cell-group>
        <van-cell>
          <div slot="icon" class="lefticon">
            <van-image round fit="cover" width="3.2em" height="3.2em" :src="userinfo.photo" />
          </div>
          <div slot="title">{{userinfo.name}}</div>
          <div slot="label">{{userinfo.group}}</div>
          <div slot="right-icon"></div>
        </van-cell>
        <van-cell title="技能证书" is-link to="/my/tag" />
        <van-cell title="修改密码" is-link to="/my/password" />
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell value="当前版本：0.1.0beta" is-link @click="upData">
          <div slot="title">
            <span class="custom-title">版本更新</span>
            <van-tag type="danger" v-if="userinfo.newversion">有新版本</van-tag>
          </div>
        </van-cell>
      </van-cell-group>
      <van-row class='paddingBox' gutter="10">
        <van-col span="24">
          <van-button color="#1d2088" icon="" size="large" block type="info" native-type="button" @click="signOut">
            退出登录
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import { Toast } from 'vant'
import Navbar from '../frame/navbar.vue'
export default {
  data(){
    return {
      userinfo:''
    }
  },
  computed:{
    ...mapState([
      'sUserId',
      'sUserName',
      'sUserGroup',
      'sTaskNum',
      'sNewMsg'
    ])
  },
  methods:{
    ...mapMutations(['setUid']),
    async getUserinfo(){
      const {data} = await this.$http.post('/api/usercenter',{'uid':this.sUserId})
      if(data.status === 200){
        this.userinfo = data
      }
    },
    upData(){
      if(!this.userinfo.newversion){
        Toast('已经是最新版本了')
      }
    },
    signOut(){
      this.setUid('')
      this.$router.push('login')
    }
  },
  created(){
    this.getUserinfo()
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.my{
  margin: 46px 0 60px 0;
  padding:10px 0 0 0;
}
.lefticon{
  margin: 0 10px 0 0;
}
</style>
