import Mock,{Random} from 'mockjs'
Mock.setup({
  timeout: '200-600'
})
Random.extend({
  taskstate: function(data) {
    var type = ['1', '2', '3']
    return this.pick(type)
  },
  resstatus: function(data) {
    var type = [200, 500]
    return this.pick(type)
  }
})
Mock.mock('/api/login','post',function(option){
  console.log(option)
  return {
    status:200,
    message:"登录接口响应",
    uid:"u001"
  }
})
Mock.mock('/api/tasklist','get',{
  status:200,
  message:"获取任务列表成功!",
  'taskList|2-5':[
    {
      tid:"@increment()",
      type:"@taskstate",
      title:"@csentence(30)",
      describe:"@csentence(20)",
      to:"116.3246,39.966577",
      toName:"目的地",
      distance:"@float(0,20,0,2)",
      time:"@integer(0,6000000)",
      timeState:"@boolean()"
    }
  ]
})
Mock.mock(/\/api\/taskinfo/,'get',{
  status:200,
  message:"获取任务详情成功!",
  taskinfo:{
    tid:"@increment()",
    title:"@csentence(30)",
    type:"@taskstate",
    speciality:"未知",
    class:"日常维护",
    urgencyLv:"普通",
    finishTime:"2020/12/31",
    describe:"@csentence(20)",
    station:"@csentence(10)",
    sid:"s5781",
    sAddress:"@csentence(20)",
    inStation:"破门而入",
    propertyname:"赵二",
    propertytel:"13912345678",
    servers:[
      {name:"张三",tel:"13912345678"},
      {name:"李四",tel:"13912345678"}
    ],
    'photo|0-4':[
      "@dataImage()"
    ]
  }
})
Mock.mock('/api/taskreply','post',function(option){
  console.log(option)
  return Mock.mock({
    status:"@resstatus",
    message:"完成回复接口响应",
  })
})
Mock.mock('/api/taskback','post',function(option){
  console.log(option)
  return Mock.mock({
    status:"@resstatus",
    message:"任务转派接口响应",
  })
})
Mock.mock('/api/signin','post',function(option){
  console.log(option)
  return {
    status:200,
    message:"签到接口响应",
    onWork:'',
    offWork:''
  }
})
Mock.mock('/api/worktime','post',function(option){
  console.log(option)
  return {
    status:200,
    message:"签到时间接口响应",
  }
})
Mock.mock('/api/msglist','get',{
  status:200,
  message:"获取消息列表成功！",
  'msglist|1-5':[
    {
      time: '@datetime()',
      title: '收到新任务！',
      desc: '@csentence(15)',
      status: '',
      img: '',
      tid:"@increment()"
    },
  ]
})
Mock.mock('/api/usercenter','post',function(option){
  console.log(option)
  return Mock.mock({
    status:200,
    message:"用户中心接口响应！",
    name:"某某",
    group:"南开应急组",
    photo:"@dataImage()",
    newversion:"@boolean()"
  })
})
Mock.mock('/api/oldpassword','post',function(option){
  console.log(option)
  return Mock.mock({
    status:200,
    message:"验证密码接口响应",
    // res:"@boolean()"
    res:true
  })
})
Mock.mock('/api/newpassword','post',function(option){
  console.log(option)
  return {
    status:200,
    message:"修改密码接口响应"
  }
})
Mock.mock('/api/gettag','post',function(option){
  console.log(option)
  return Mock.mock({
    status:200,
    message:"技能证书接口响应",
    'taglist|2-3':[
      {
        name:"XX技能书",
        img:"@dataImage()",
      }
    ]
  })
})
