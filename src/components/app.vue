<template lang="html">
  <div>
    <div class="middle-Containter">
      <!-- <transition> -->
        <router-view></router-view>
      <!-- </transition> -->
    </div>
    <van-tabbar v-if="sUserId != ''" route>
      <van-tabbar-item to="/task" icon="todo-list-o" :badge="sTaskNum">任务</van-tabbar-item>
      <van-tabbar-item to="/signin" icon="sign">签到</van-tabbar-item>
      <van-tabbar-item to="/msg" icon="comment-o">消息</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  watch: {
    $route(to,from){
      document.title=`众维-${to.meta.title}`
      if(this.sUserId===''){
        this.$router.push('login')
      }
    }
  },
  methods:{
    getRouter(){
      document.title=`众维-${this.$route.meta.title}`
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
  created(){
    this.getRouter()
  }
}
</script>

<style lang="css" scoped>
.middle-Containter{
  /*padding:38px 0 47px;*/
  width:100%;
  overflow:hidden;
}
.v-enter {
  opacity: 0;
  transform:translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform:translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  /* transition: opacity .3s ease; */
  transition: all 0.4s ease;
}
</style>
