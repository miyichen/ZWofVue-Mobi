<template lang="html">
  <div>
    <Navbar></Navbar>
    <van-tabs v-model="active" class="ranking">
      <van-tab title="周排名" name="a">
        <EChart :chart-data="chartOption1"></EChart>
      </van-tab>
      <van-tab title="月排名" name="b">
        <EChart :chart-data="chartOption2"></EChart>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import Navbar from '../../frame/navbar.vue'
import EChart from '../../part/echart.vue'
export default {
  data() {
    return {
      active: 'a',
      chartOption1: '',
      chartOption2: ''
    }
  },
  created(){
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const option1 = {
        yAxis: {
          type: 'category',
          data: ['赵','钱','孙','李','周','吴','郑','王']
        },
        xAxis: {
          type: 'value'
        },
        series: [{
          data: [62,80,83,84,88,91,93,98],
          type: 'bar'
        }]
      }
      const option2 = {
        yAxis: {
          type: 'category',
          data: ['赵','钱','孙','李','周','吴','郑','王']
        },
        xAxis: {
          type: 'value'
        },
        series: [{
          data: [62,80,83,84,88,91,93,98],
          type: 'bar'
        }]
      };
      this.chartOption1 = option1
      this.chartOption2 = option2
    }
  },
  components:{
    Navbar:Navbar,
    EChart:EChart
  }
}
</script>

<style lang="css" scoped>
.ranking{
  margin: 46px 0 0 0;
}
</style>
