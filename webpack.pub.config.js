const path = require('path')
//生成html页面
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清空导入文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//css抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//发布后自动打开浏览器展示文件之间的依赖关系 【非必装！！！】
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

//webpack配置文件
module.exports = {
  mode:'development',
  //定义入口 指定需要被webpack打包的文件
  entry:path.join(__dirname,'./src/main.js'),
  //定义出口 指定输出文件相关配置
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'index.js'
  },
  module:{
    //这里用于配置所有第三方模块加载器 处理非js文件
    rules:[
      //npm i style-loader css-loader -D 下载样式表加载器
      //下面是配置处理css文件的模块 注意use内从右向左执行
      {test:/\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          'css-loader',
        ]
      },
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      //下面是配置处理图片文件的模块'url-loader?limit=200000&name=[hash:8][name].[ext]'
      {test:/\.(jpg|png|gif|jpeg|bmp)$/,use:'url-loader?limit=200000&name=images/img[hash:8].[ext]'},
      //下面是配置处理字体文件的模块
      {test:/\.(otf|eot|svg|ttf|woff|woff2)/,use:'url-loader'},
      //下面是配置处理es6语法的模块 注意一定要通过exclude 选项把node_modules目录排除掉
      //同时在项目根目录下新建一个.babelrc文件 注意此文件内不能有注释字符串必须双引号
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
    ]
  },
  plugins:[
    //指定每次发布时需要清空的目录
    new CleanWebpackPlugin(),
    //配置插件的节点
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new UglifyJsPlugin(),
    new OptimizeCssAssetsPlugin()
    //new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `manifest.${entrypoint.name}`
    }
  }
}
