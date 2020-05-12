<template lang="html">
<div ref="chart" class="chart"></div>
</template>

<script>
export default {
  props:['chartData'],
  mounted(){
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      const option = this.chartData
      const myChart = this.$echarts.init(chart)
      myChart.setOption(option)
      window.addEventListener("resize", function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="css" scoped>
.chart{
  width:100%;
  min-height:580px;
  padding:0 0 0 15px
}
</style>
