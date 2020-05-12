<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="tag">
      <van-cell-group title="拥有的技能证书">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(item,i) in tagList" :title="item.name" :name="i" :key="i">
            <van-image width="100%" height="100" fit="cover" :src="item.img" />
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Navbar from '../../frame/navbar.vue'
export default {
  data(){
    return {
      activeName:0,
      tagList:[]
    }
  },
  methods:{
    async getTag(){
      const {data} = await this.$http.post('/api/gettag',{'uid':'123'})
      if(data.status === 200){
        this.tagList.push(...data.taglist)
      }
    }
  },
  created(){
    this.getTag()
  },
  components:{
    Navbar:Navbar
  }
}
</script>

<style lang="css" scoped>
.tag{
  margin: 46px 0 60px 0;
}
</style>
