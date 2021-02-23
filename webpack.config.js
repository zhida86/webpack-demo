const path = require('path');

module.exports = {
  // entry: './src/index.js',
  entry: {
    main: './src/index.js'
  }, // 与上等同， 上面的是简写
  module: {
    rules: [{
      test: /\.(png|jpg|gif )$/,
      use: {
        // loader: 'file-loader',
        loader: 'url-loader', // 多了一个 limit 的配置项，可以将图片打包成base64字符串，放在js文件相应位置，常用于小图片的打包
        /*
        url-loader works like file-loader, 
        but can return a DataURL if the file is smaller than a byte limit. 
         */
        options: {
          name: '[name].[ext]',
          outputPath: './images', // 打包后图片存放位置
          limit: 2048 // 大于此值，生成单独图片文件，否则生成base64于js文件内
        }
      }
    },{
      test: /\.(svg|ttf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader'
      }
    },{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2 // 保证样式文件中import引入的样式文件经过前面2个loader的处理
          }
        },
        'sass-loader',
        'postcss-loader'
      ] // 执行顺序，由下往上，由右到左
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // __dirname 指 webpack.config.js 配置文件所在的当前目录的路径
  },
  mode: 'development', // 没设置时，默认是 production， 设置成 development 时，打包文件没有被压缩
}
// webpack.config.js 是默认的配置文件，
// npx webpack index.js 打包指定文件 index.js
// 运行 npx webpack, 会去找默认配置文件，找不到则报错
// 运行 npx webpack --config webpackconfig.js  以指定的配置文件来打包
// webpack-cli 让我们可以在命令行里使用 webpack 这个命令 
// webpack-cli， the tool used to run webpack on the command line

// The "source" code is the code that we'll write and edit. 
// The "distribution" code is the minimized and optimized output of our build process that will eventually be loaded in the browser.