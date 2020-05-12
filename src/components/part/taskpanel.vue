<template lang="html">
  <van-cell class="task-wapper" :to="'/task/taskinfo/'+childata.tid">
    <div slot="title" class="task-title">
      <van-tag :type="taskState.color">{{taskState.type}}</van-tag>
      <span class="title">{{childata.title}}</span>
      <div class="describe">{{childata.describe}}</div>
    </div>
    <div slot="label" class="task-time">
      <van-count-down :time="time" @finish="timeOver">
        <template v-slot="timeData">
          <span class="item">
            需在
            {{ timeData.hours }}天
            {{ timeData.hours }}小时
            {{ timeData.minutes }}分
            {{ timeData.seconds }}秒
            内完成
          </span>
        </template>
      </van-count-down>
    </div>
    <div slot="right-icon" @click.stop="gaode">
      <div class="task-icon"><van-icon class="fa fa-paper-plane-o" size="2em" /></div>
      <div class="task-nav">导航</div>
      <div class="task-distance">{{childata.distance}}Km</div>
      <div class="task-isovertime">{{timeState}}</div>
    </div>
  </van-cell>
</template>

<script>
export default {
  props:['childata'],
  data:()=>{
    return {
      time: 0,
      timeState: '',
    }
  },
  methods:{
    gaode(){
      location.href="//uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1"
    },
    timeOver(){
      this.timeState = '超时'
    }
  },
  watch:{
    childata: {
      handler(newdata) {
       this.time = newdata.time
      },
      // 代表在wacth里声明了childata这个方法之后先去执行handler方法
      immediate: true
    }
  },
  computed:{
    taskState(){
      var v={type:'',color:''}
      switch(this.childata.type){
        case '1':
        v.type='进行中';
        v.color='primary';
        break;
        case '2':
        v.type='待审核';
        v.color='warning';
        break;
        case '3':
        v.type='驳回';
        v.color='danger';
        break;
      }
      return v
    }
    // timeState(){
    //   var v
    //   switch(this.childata.timeState){
    //     case true:
    //     v='';
    //     break;
    //     case false:
    //     v='超时';
    //     break;
    //   }
    //   return v
    // }
  }
}
</script>

<style lang="css" scoped>
.van-panel__content{
  padding: 20px;
}
.task-panel .task-wapper{
  margin:0 0 10px 0;
}
.task-panel .task-icon{
  height:31px;
  color:#009cff;
  text-align: center;
}
.task-panel .task-nav{
  height:24px;
  color:#009cff;
  font-size:1.1em;
  text-align: center;
}
.task-panel .task-distance{
  height:24px;
  color:#545454;
  font-size:0.8em;
  text-align: center;
}
.task-panel .task-isovertime{
  margin:3px 0 0 0;
  color:#F00;
  font-size:1em;
  text-align: center;
  height:30px;
  line-height:30px;
  border-top: #eee 1px solid
}
.task-panel .task-title{
  height:79px;
  overflow:hidden;
}
.task-panel .task-title .title{
  font-size:1.1em;
  padding:0 10px 0 0;
}
.task-panel .task-title .describe{
  color:#CCC;
  font-size:1em;
  padding:0 10px 0 0;
}
.task-panel .task-time{
  height:30px;
  line-height: 30px;
  border-top: #eee 1px solid
}
.task-panel .task-time span{
  line-height: 30px;
}
</style>
