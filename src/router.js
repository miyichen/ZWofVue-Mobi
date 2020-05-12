import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'
import login from './components/pages/login.vue'
import home from './components/pages/home.vue'
import taskinfo from './components/pages/task/taskinfo.vue'
import taskreply from './components/pages/task/taskreply.vue'
import taskback from './components/pages/task/taskback.vue'
import signin from './components/pages/signin.vue'
import info from './components/pages/info.vue'
import my from './components/pages/my.vue'
import password from './components/pages/user/password.vue'
import tag from './components/pages/user/tag.vue'
import ranking from './components/pages/user/ranking.vue'
Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'},
    {path:'/login',name:'login',component:login,meta:{title:'登录',pagename:'登录',lefttext:'',isleftarrow:false}},
    {path:'/task',name:'task',component:home,meta:{title:'待办任务',pagename:'',lefttext:moment(new Date()).format('YYYY年MM月DD日'),isleftarrow:false}},
    {path:'/my/tag',name:'tag',component:tag,meta:{title:'技能证书',pagename:'技能证书',lefttext:'',isleftarrow:true}},
    {path:'/task/taskinfo/:id',props:true,name:'taskinfo',component:taskinfo,meta:{title:'任务详情',pagename:'任务详情',lefttext:'',isleftarrow:true}},
    {path:'/task/taskreply/:id',props:true,name:'taskreply',component:taskreply,meta:{title:'完成回复',pagename:'完成回复',lefttext:'',isleftarrow:true}},
    {path:'/task/taskback/:id',props:true,name:'taskback',component:taskback,meta:{title:'转派',pagename:'转派',lefttext:'',isleftarrow:true}},
    {path:'/signin',name:'signin',component:signin,meta:{title:'签到',pagename:'签到',lefttext:'',isleftarrow:false}},
    {path:'/msg',name:'msg',component:info,meta:{title:'消息',pagename:'消息',lefttext:'',isleftarrow:false}},
    {path:'/my',name:'my',component:my,meta:{title:'我的',pagename:'我的',lefttext:'',isleftarrow:false}},
    {path:'/my/password',name:'password',component:password,meta:{title:'修改密码',pagename:'修改密码',lefttext:'',isleftarrow:true}},
    {path:'/my/tag',name:'tag',component:tag,meta:{title:'技能证书',pagename:'技能证书',lefttext:'',isleftarrow:true}},
    {path:'/task/ranking',name:'ranking',component:ranking,meta:{title:'排行榜',pagename:'排行榜',lefttext:'',isleftarrow:true}},
  ]
})

export default router
