import Vue from 'vue'
import './globalConfig.js'
import router from './router.js'
import app from './components/app.vue'
import store from './store.js'
import './mock/mock.js'

const vm = new Vue({
  el:'#app',
  router:router,
  store:store,
  render: c => c(app)//使用render渲染出来的组件 是 根组件 其他组件只能在app组件内部去渲染
})
