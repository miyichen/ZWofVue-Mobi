<template lang="html">
  <div>
    <Navbar>
      <van-icon slot="right" class="fa fa-bar-chart" size="18" @click="clickRanking" />
    </Navbar>
    <van-row class="task-total">
      <van-col span="10" class="task-today">
        <div class="task-today-title font13em">今日任务</div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="taskFilter" :options="taskFilterOption" @change="filterTask" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="14" class="task-count">
        <span class="font4em">{{taskCount}}</span><span class="font13em">件</span>
      </van-col>
    </van-row>
    <van-row v-show="taskCount != 0" class="task-panel">
      <Taskpanel v-for="item in filterTask()" :childata="item" :key="item.tid"></Taskpanel>
    </van-row>
    <van-empty v-show="taskCount === 0" description="暂无任务" />
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Navbar from '../frame/navbar.vue'
import Taskpanel from '../part/taskpanel.vue'
export default {
  data:()=>{
    return {
      taskFilter: 0,
      taskFilterOption: [
        { text: '全部任务', value: 0 },
        { text: '进行中', value: 1 },
        { text: '待审核', value: 2 },
        { text: '驳回', value: 3 },
      ],
      taskCount:0,
      taskData:[]
    }
  },
  created(){
    this.getTask()
  },
  methods:{
    ...mapMutations(['setTaskNum']),
    clickRanking(){
      this.$router.push({ path:'/task/ranking'})
    },
    async getTask(){
      const {data} = await this.$http.get('/api/tasklist')
      if(data.status === 200){
        this.taskData = data.taskList
        this.setTaskNum(data.taskList.length)
      }
    },
    filterTask(){
      var arr=[]
      if(this.taskFilter != "0"){
        this.taskData.forEach((e)=>{
          if(e.type == this.taskFilter){
            arr.push(e)
          }
        })
      }else{
        arr = this.taskData
      }
      this.taskCount = arr.length
      return arr
    }
  },
  components:{
    Navbar:Navbar,
    Taskpanel:Taskpanel
  }
}
</script>

<style lang="css" scoped>
.van-dropdown-menu{
  height:20px;
}
.van-nav-bar__left, .van-nav-bar__right {
    font-size: 17px;
    font-weight: bold;
}
.task-total{
  margin: 46px 0 0 0;
  padding:0 20px;
  background-color: #1d2088;
}
.task-total .task-today .task-today-title{
  color:#FFF;
  line-height: 100%;
  margin:0 0 15px 0;
}
.task-total .task-count{
  text-align: right;
  color:#FFF;
}
.task-total .task-count span{
  line-height: 100%;
}
.task-panel{
  margin: 10px 0 50px;
  padding:0 10px;
}
.font4em{
  font-size: 4em;
}
.font13em{
  font-size: 1.3em;
}
.font14em{
  font-size: 1.4em;
}
</style>
