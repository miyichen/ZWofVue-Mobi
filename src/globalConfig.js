import Vue from 'vue'
//Vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
//eCharts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//Axios
import Axios from 'Axios'
Vue.prototype.$http = Axios.create({
  //baseURL:'http://127.0.0.1:3000/'
})
//Font-Awesome
import 'font-awesome/css/font-awesome.css'
//自定义样式
import './css/global.css'
