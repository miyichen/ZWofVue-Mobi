<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="message">
      <div v-for="item in msgList" :key="item.tid" v-show="msgNum != 0" >
        <van-row>
          <van-col offset="6" span="12" class="msgtime">
            <van-tag size="medium" color="#CCC">{{item.time}}</van-tag>
          </van-col>
        </van-row>
        <van-panel :title="item.title" :desc="item.desc" :status="item.status">
          <div class="imgContent" v-if="item.img"><img :src="item.img"></div>
          <div slot="footer">
            <van-cell class="title-style" title="点击查看" is-link :to="'/task/taskinfo/'+item.tid" />
          </div>
        </van-panel>
      </div>
      <van-empty v-show="msgNum === 0" description="暂无消息" />
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Navbar from '../frame/navbar.vue'
export default {
  data(){
    return{
      msgList:[],
      msgNum:0
    }
  },
  methods:{
    ...mapMutations(['setNewmsg']),
    async getMsg(){
      const {data} = await this.$http.get('/api/msglist')
      if(data.status === 200){
        this.msgList.unshift(...data.msglist)
        this.msgNum = this.msgList.length
      }
    }
  },
  components:{
    Navbar:Navbar
  },
  created(){
    this.getMsg()
  }
}
</script>

<style lang="css" scoped>
.imgContent {
  padding: 20px;
}
.van-panel__footer {
  padding: 0;
}
.clearUnread{
  font-size: 0.8em;
}
.message{
  margin: 46px 0 60px 0;
  padding:0 20px;
}
.message .msgtime{
  text-align: center;
  padding:10px 0;
}
.title-style{
  color: #009cff
}
</style>
