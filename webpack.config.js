const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//webpack配置文件
module.exports = {
  mode:'development',
  //定义入口 指定需要被webpack打包的文件
  entry:path.join(__dirname,'./src/main.js'),
  //定义出口 指定输出文件相关配置
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      //npm i style-loader css-loader -D 下载样式表加载器
      //下面是配置处理css文件的模块 注意use内从右向左执行
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      //下面是配置处理图片文件的模块'url-loader?limit=200000&name=[hash:8][name].[ext]'
      {test:/\.(jpg|png|gif|jpeg|bmp)$/,use:'url-loader'},
      //下面是配置处理字体文件的模块
      {test:/\.(otf|eot|svg|ttf|woff|woff2)$/,use:'url-loader'},
      //下面是配置处理es6语法的模块 注意一定要通过exclude 选项把node_modules目录排除掉
      //同时在项目根目录下新建一个.babelrc文件 注意此文件内不能有注释字符串,必须双引号
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      //下面解析vue组件文件的模块
      {test:/\.vue$/,use:'vue-loader'},
    ]
  },
  plugins:[
    //配置插件的节点
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    }),
    new VueLoaderPlugin()
  ]
}

//实时打包工具webpack-dev-server
//注意：webpack-dev-server本地安装时不能直接使用控制台执行，需要在package.json里面配置执行语句 如下：
// "scripts": {
//   "dev": "webpack-dev-server --open --port 3000 --host 127.0.0.1 --contentBase src --hot"
//   //open自动打开浏览器 端口设为3000 打开src路径 hot叫做热重载是局部更新并且改变样式时浏览器无刷新
// }
//配置好以后在控制台直接输入npm run dev就可以自动编译，并且运行了一个服务器
//注意：使用webpack-dev-server实时编译时 要修改html引用js的路径。引用根目录
