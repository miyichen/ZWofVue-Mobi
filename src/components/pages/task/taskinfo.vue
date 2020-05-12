<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="task-info">
      <van-cell-group title="基础信息">
        <van-cell title="编号" :value="taskData.tid" />
        <van-cell title="主题" :value="taskData.title" />
        <van-cell title="类型" :value="taskState" />
        <van-cell title="专业" :value="taskData.speciality" />
        <van-cell title="类别" :value="taskData.class" />
        <van-cell title="紧急程度" :value="taskData.urgencyLv" />
        <van-cell title="完成时限" :value="taskData.finishTime" />
        <van-cell title="描述" :value="taskData.describe" />
        <van-cell title="照片" :value="photoNum" @click="imgPreview" is-link />
      </van-cell-group>
      <van-cell-group title="故障点信息">
        <van-cell title="站址名称" :value="taskData.station" />
        <van-cell title="站址编码" :value="taskData.sid" />
        <van-cell title="地址" :value="taskData.sAddress" />
        <van-cell title="进站方式" :value="taskData.inStation" />
        <van-cell title="物业" value-class="tel" :value="taskData.propertyname" @click="tel(taskData.propertytel)">
          <template #right-icon>
            <van-icon name="phone" color="#1989fa" size="1.3em" style="line-height: inherit;"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="其他指派人">
        <van-cell v-for="(item,i) in taskData.servers" title="指派人" value-class="tel" :value="item.name" @click="tel(item.tel)" :key="i">
          <template #right-icon>
            <van-icon name="phone" color="#1989fa" size="1.3em" style="line-height: inherit;"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-row class='paddingBox' gutter="10">
        <van-col span="20"><van-button color="#1d2088" icon="certificate" size="large" :disabled="btnState" block :to="'/task/taskreply/'+taskData.tid">完成回复</van-button></van-col>
        <van-col span="4"><van-button color="#1d2088" size="large" :disabled="btnState" block plain :to="'/task/taskback/'+taskData.tid">转派</van-button></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import Navbar from '../../frame/navbar.vue'
export default {
  data:()=>{
    return {
      imgNum:'',
      taskData:''
    }
  },
  created(){
    this.getTaskinfo()
  },
  methods:{
    async getTaskinfo(){
      const {data} = await this.$http.get(`/api/taskinfo/${this.id}`)
      if(data.status === 200){
        this.taskData = data.taskinfo
        this.imgNum = data.taskinfo.photo.length
      }
    },
    imgPreview(){
      if(this.imgNum != 0){
        ImagePreview({
          images: this.taskData.photo,
          startPosition:0,
          closeable:true
        })
      }else{
        return
      }
    },
    tel(tel){
      window.location.href = 'tel:'+tel
    }
  },
  computed:{
    photoNum:function(){
      var v
      if(this.imgNum != 0){
        v = this.imgNum
      }else{
        v = "无"
      }
      return v
    },
    taskState(){
      var v
      switch(this.taskData.type){
        case '1':
        v='进行中';
        break;
        case '2':
        v='待审核';
        break;
        case '3':
        v='驳回';
        break;
      }
      return v
    },
    btnState(){
      var v
      if(this.taskData.type != 2){
        v=false
      }else{
        v=true
      }
      return v
    }
  },
  props:['id'],
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.task-info{
  margin: 46px 0 60px 0;
  padding:0;
}
.tel{
  color:#1989fa
}
</style>
