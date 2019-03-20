# Spring Boot + Vue 学习 02

参考 [Spring Boot+Vue从零开始搭建系统（二）：项目前端_Vuejs目录结构描述](https://segmentfault.com/a/1190000014200466)



大部分是照着博文抄的。



- vue-cli项目结构大纲

  ```
  |-- build                            // 项目构建(webpack)相关代码
  |   |-- build.js                     // 生产环境构建代码
  |   |-- check-version.js             // 检查node、npm等版本
  |   |-- dev-client.js                // 热重载相关
  |   |-- dev-server.js                // 构建本地服务器
  |   |-- utils.js                     // 构建工具相关
  |   |-- webpack.base.conf.js         // webpack基础配置
  |   |-- webpack.dev.conf.js          // webpack开发环境配置
  |   |-- webpack.prod.conf.js         // webpack生产环境配置
  |-- config                           // 项目开发环境配置
  |   |-- dev.env.js                   // 开发环境变量
  |   |-- index.js                     // 项目一些配置变量
  |   |-- prod.env.js                  // 生产环境变量
  |   |-- test.env.js                  // 测试环境变量
  |-- src                              // 源码目录
  |   |-- components                   // vue公共组件
  |   |-- store                        // vuex的状态管理
  |   |-- App.vue                      // 页面入口文件
  |   |-- main.js                      // 程序入口文件，加载各种公共组件
  |-- static                           // 静态文件，比如一些图片，json数据等
  |   |-- data                         // 群聊分析得到的数据用于数据可视化
  |-- .babelrc                         // ES6语法编译配置
  |-- .editorconfig                    // 定义代码格式
  |-- .gitignore                       // git上传需要忽略的文件格式
  |-- README.md                        // 项目说明
  |-- favicon.ico 
  |-- index.html                       // 入口页面
  |-- package.json                     // 项目基本信息
  ```

- vue-cli项目结构配置文件详细描述

  - package.json

    这里包含开发运行，项目打包，单元测试等命令，测试的东西先放一边，看dev和build命令。运行”npm run dev”的时候执行的是build/dev-server.js文件，运行”npm run build”的时候执行的是build/build.js文件，我们可以从这两个文件开始进行代码阅读分析。

    ```json
    "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
    },
    ```

  - build文件夹分析

    - build/build.js

      这里包含了：
      loading动画；
      删除目标文件夹；
      执行webpack构建；
      输出信息；
      webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响。

      ```
      'use strict'
      // 检查NodeJS和npm的版本。
      require('./check-versions')()
      
      process.env.NODE_ENV = 'production'
      
      // ora插件，实现node.js命令行环境的loading效果和显示各种状态的图标等。
      const ora = require('ora')
      const rm = require('rimraf')
      const path = require('path')
      // 用于在控制台输出带颜色字体的插件。
      const chalk = require('chalk')
      const webpack = require('webpack')
      const config = require('../config')
      const webpackConfig = require('./webpack.prod.conf')
      
      const spinner = ora('building for production...')
      spinner.start()
      
      // rimraf插件，每次启动编译或者打包之前，先把整个dist文件夹删除，然后再重新生成dist。
      rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
      if (err) throw err
      webpack(webpackConfig, (err, stats) => {
          spinner.stop()
          if (err) throw err
          process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
          }) + '\n\n')
      
          if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
          }
      
          console.log(chalk.cyan('  Build complete.\n'))
          console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
          ))
      })
      })
      ```

    - build/check-versions.js

      这里完成对node和npm的版本检测。

      ```
      'use strict'
      // 用于在控制台输出带颜色字体的插件。
      const chalk = require('chalk')
      // 语义化版本检查插件。
      const semver = require('semver')
      // 引入package.json。
      const packageConfig = require('../package.json')
      const shell = require('shelljs')
      // 开辟子进程执行指令cmd并返回结果。
      function exec (cmd) {
      return require('child_process').execSync(cmd).toString().trim()
      }
      // node和npm版本需求。
      const versionRequirements = [
      {
          name: 'node',
          currentVersion: semver.clean(process.version),
          versionRequirement: packageConfig.engines.node
      }
      ]
      
      if (shell.which('npm')) {
      versionRequirements.push({
          name: 'npm',
          currentVersion: exec('npm --version'),
          versionRequirement: packageConfig.engines.npm
      })
      }
      
      module.exports = function () {
      const warnings = []
      // 依次判断版本是否符合要求。
      for (let i = 0; i < versionRequirements.length; i++) {
          const mod = versionRequirements[i]
      
          if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
          warnings.push(mod.name + ': ' +
              chalk.red(mod.currentVersion) + ' should be ' +
              chalk.green(mod.versionRequirement)
          )
          }
      }
      // 如果有警告则将其输出到控制台。
      if (warnings.length) {
          console.log('')
          console.log(chalk.yellow('To use this template, you must update following to modules:'))
          console.log()
      
          for (let i = 0; i < warnings.length; i++) {
          const warning = warnings[i]
          console.log('  ' + warning)
          }
      
          console.log()
          process.exit(1)
      }
      }
      ```

    - build/utils.js

      这里提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。
      配置静态资源路径；
      生成cssLoaders用于加载.vue文件中的样式；
      生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件。

    - build/vue-loader.conf.js

      这里负责处理.vue文件中的样式，配置css加载器以及编译css之后自动添加前缀。

      ```
      'use strict'
      const utils = require('./utils')
      const config = require('../config')
      const isProduction = process.env.NODE_ENV === 'production'
      const sourceMapEnabled = isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap
      
      module.exports = {
      // css加载器。
      loaders: utils.cssLoaders({
          sourceMap: sourceMapEnabled,
          extract: isProduction
      }),
      cssSourceMap: sourceMapEnabled,
      cacheBusting: config.dev.cacheBusting,
      // 让vue-loader知道需要对video的src属性的内容转换为模块。
      transformToRequire: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
      }
      }
      
      ```

    - build/webpack.base.conf.js

      这里这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里先看webpack.base.conf.js。
      webpack.base.conf.js主要完成下面的操作：
      配置webpack编译入口；
      配置webpack输出路径和命名规则；
      配置模块resolve规则；
      配置不同类型模块的处理规则。

      ```
      'use strict'
      const path = require('path')
      const utils = require('./utils')
      const config = require('../config')
      const vueLoaderConfig = require('./vue-loader.conf')
      // 给出正确的绝对路径。
      function resolve (dir) {
      return path.join(__dirname, '..', dir)
      }
      
      const createLintingRule = () => ({
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
      }
      })
      
      module.exports = {
      context: path.resolve(__dirname, '../'),
      entry: {
          // 配置webpack编译入口。
          app: './src/main.js'
      },
      // 配置webpack输出路径和命名规则。
      output: {
          // webpack输出的目标文件夹路径（例如：/dist）
          path: config.build.assetsRoot,
          // webpack输出bundle文件命名格式。
          filename: '[name].js',
          // webpack编译输出的发布路径。
          publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
      },
      // 配置模块resolve的规则。
      resolve: {
          // 自动resolve的扩展名。
          extensions: ['.js', '.vue', '.json'],
          // 创建路径别名，有了别名之后引用模块更方便，例如：import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'。
          alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          }
      },
      // 配置不同类型模块的处理规则。
      module: {
          rules: [
          ...(config.dev.useEslint ? [createLintingRule()] : []),
          // 对所有.vue文件使用vue-loader
          {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: vueLoaderConfig
          },
          // 对src和test文件夹下的.js文件使用babel-loader。
          {
              test: /\.js$/,
              loader: 'babel-loader',
              include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
          },
          // 对图片资源文件使用url-loader，name指明了输出的命名规则。
          {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
              }
          },
          // 对媒体资源文件使用url-loader，name指明了输出的命名规则。
          {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
              limit: 10000,
              name: utils.assetsPath('media/[name].[hash:7].[ext]')
              }
          },
          // 对字体资源文件使用url-loader，name指明了输出的命名规则。
          {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
              }
          }
          ]
      },
      node: {
          // prevent webpack from injecting useless setImmediate polyfill because Vue
          // source contains it (although only uses it if it's native).
          setImmediate: false,
          // prevent webpack from injecting mocks to Node native modules
          // that does not make sense for the client
          dgram: 'empty',
          fs: 'empty',
          net: 'empty',
          tls: 'empty',
          child_process: 'empty'
      }
      }
      
      ```

    - build/webpack.dev.conf.js

      这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要完成下面操作：
      将webpack的热重载客户端代码添加到每个entry对应的应用；
      合并基础的webpack配置；
      配置样式文件的处理规则，styleLoaders；
      配置Source Maps；
      配置webpack插件。

      ```
      'use strict'
      const utils = require('./utils')
      const webpack = require('webpack')
      const config = require('../config')
      // 一个可以合并数组和对象的插件。
      const merge = require('webpack-merge')
      const path = require('path')
      const baseWebpackConfig = require('./webpack.base.conf')
      const CopyWebpackPlugin = require('copy-webpack-plugin')
      // 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件。
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      // 用于更友好地输出webpack的警告、错误等信息。
      const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
      const portfinder = require('portfinder')
      
      const HOST = process.env.HOST
      const PORT = process.env.PORT && Number(process.env.PORT)
      // 合并基础的webpack配置。
      const devWebpackConfig = merge(baseWebpackConfig, {
      module: {
          // 配置样式文件的处理规则，使用styleLoaders。
          rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
      },
      
      // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
      devtool: config.dev.devtool。
      
      devServer: {
          clientLogLevel: 'warning',
          historyApiFallback: {
          rewrites: [
              { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
          ],
          },
          hot: true,
          contentBase: false,
          compress: true,
          host: HOST || config.dev.host,
          // dev-server 监听的端口，默认为config.dev.port设置的端口，即8080。
          port: PORT || config.dev.port,
          // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false。
          open: config.dev.autoOpenBrowser,
          overlay: config.dev.errorOverlay
          ? { warnings: false, errors: true }
          : false,
          publicPath: config.dev.assetsPublicPath,
          // 定义 HTTP 代理表，代理到 API 服务器。
          proxy: config.dev.proxyTable,
          quiet: true, // necessary for FriendlyErrorsPlugin
          watchOptions: {
          poll: config.dev.poll,
          }
      },
      // 配置webpack插件。
      plugins: [
          new webpack.DefinePlugin({
          'process.env': require('../config/dev.env')
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
          // 页面中的报错不会阻塞，但是会在编译结束后报错。
          new webpack.NoEmitOnErrorsPlugin(),
          // https://github.com/ampedandwired/html-webpack-plugin
          new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
          }),
          // copy custom static assets
          new CopyWebpackPlugin([
          {
              from: path.resolve(__dirname, '../static'),
              to: config.dev.assetsSubDirectory,
              ignore: ['.*']
          }
          ])
      ]
      })
      
      module.exports = new Promise((resolve, reject) => {
      portfinder.basePort = process.env.PORT || config.dev.port
      portfinder.getPort((err, port) => {
          if (err) {
          reject(err)
          } else {
          process.env.PORT = port
          devWebpackConfig.devServer.port = port
      
          devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
              compilationSuccessInfo: {
              messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
              },
              onErrors: config.dev.notifyOnErrors
              ? utils.createNotifierCallback()
              : undefined
          }))
      
          resolve(devWebpackConfig)
          }
      })
      })
      
      ```

    - build/webpack.prod.conf.js

      这里是构建的时候用到的webpack配置来自webpack.prod.conf.js，该配置同样是在webpack.base.conf基础上的进一步完善。主要完成下面操作：
      合并基础的webpack配置；
      配置样式文件的处理规则，styleLoaders；
      配置webpack的输出；
      配置webpack插件；
      gzip模式下的webpack插件配置；
      webpack-bundle分析。

      ```
      'use strict'
      const path = require('path')
      const utils = require('./utils')
      const webpack = require('webpack')
      const config = require('../config')
      const merge = require('webpack-merge')
      const baseWebpackConfig = require('./webpack.base.conf')
      const CopyWebpackPlugin = require('copy-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      // 用于从webpack生成的bundle中提取文本到特定文件中的插件，可以抽取出css，js文件将其与webpack输出的bundle分离。
      const ExtractTextPlugin = require('extract-text-webpack-plugin')
      const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
      const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
      
      const env = require('../config/prod.env')
      // 合并基础的webpack配置。
      const webpackConfig = merge(baseWebpackConfig, {
      module: {
          rules: utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true,
          usePostCSS: true
          })
      },
      devtool: config.build.productionSourceMap ? config.build.devtool : false,
      // 配置webpack的输出。
      output: {
          // 编译输出目录。
          path: config.build.assetsRoot,
          // 编译输出文件名格式。
          filename: utils.assetsPath('js/[name].[chunkhash].js'),
          // 没有指定输出名的文件输出的文件名格式。
          chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      // 配置webpack插件。
      plugins: [
          // http://vuejs.github.io/vue-loader/en/workflow/production.html
          new webpack.DefinePlugin({
          'process.env': env
          }),
          // 丑化压缩代码
          new UglifyJsPlugin({
          uglifyOptions: {
              compress: {
              warnings: false
              }
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true
          }),
          // 抽离css文件。
          new ExtractTextPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css'),
          // Setting the following option to `false` will not extract CSS from codesplit chunks.
          // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
          // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
          // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
          allChunks: true,
          }),
          // Compress extracted CSS. We are using this plugin so that possible
          // duplicated CSS from different components can be deduped.
          new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap
              ? { safe: true, map: { inline: false } }
              : { safe: true }
          }),
          // generate dist index.html with correct asset hash for caching.
          // you can customize output by editing /index.html
          // see https://github.com/ampedandwired/html-webpack-plugin
          new HtmlWebpackPlugin({
          filename: config.build.index,
          template: 'index.html',
          inject: true,
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
          }),
          // keep module.id stable when vendor modules does not change
          new webpack.HashedModuleIdsPlugin(),
          // enable scope hoisting
          new webpack.optimize.ModuleConcatenationPlugin(),
          // split vendor js into its own file
          new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks (module) {
              // any required modules inside node_modules are extracted to vendor
              return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
              ) === 0
              )
          }
          }),
          // extract webpack runtime and module manifest to its own file in order to
          // prevent vendor hash from being updated whenever app bundle is updated
          new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          minChunks: Infinity
          }),
          // This instance extracts shared chunks from code splitted chunks and bundles them
          // in a separate chunk, similar to the vendor chunk
          // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
          new webpack.optimize.CommonsChunkPlugin({
          name: 'app',
          async: 'vendor-async',
          children: true,
          minChunks: 3
          }),
      
          // copy custom static assets
          new CopyWebpackPlugin([
          {
              from: path.resolve(__dirname, '../static'),
              to: config.build.assetsSubDirectory,
              ignore: ['.*']
          }
          ])
      ]
      })
      // gzip模式下需要引入compression插件进行压缩。
      if (config.build.productionGzip) {
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      
      webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
              '\\.(' +
              config.build.productionGzipExtensions.join('|') +
              ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
          })
      )
      }
      
      if (config.build.bundleAnalyzerReport) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }
      
      module.exports = webpackConfig
      
      ```

    - build/dev-server.js

      检查node和npm的版本、引入相关插件和配置
      webpack对源码进行编译打包并返回compiler对象
      创建express服务器
      配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
      挂载代理服务和中间件
      配置静态资源
      启动服务器监听特定端口（8080）
      自动打开浏览器并打开特定网址（localhost:8080）
      说明： express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。

    - build/dev-client.js

      dev-client.js里面主要写了浏览器端代码，用于实现webpack的热更新（实现浏览器端的EventSource，用于跟服务器双向通信webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信, 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新）。

    - 

  - config文件夹分析

    - config/dev.env.js设置了开发环境变量。

    - config/prod.env.js设置了生产环境变量。

    - config/index.js描述了开发和构建两种环境下的配置，前面的build文件夹下也有不少文件引用了index.js里面的配置。

      ```json
      var path = require(‘path‘)
      module.exports = {
        // 构建产品时使用的配置
        build: {
          // 环境变量
          env: require(‘./prod.env‘),
          // html入口文件
          index: path.resolve(__dirname, ‘../dist/index.html‘),
          // 产品文件的存放路径
          assetsRoot: path.resolve(__dirname, ‘../dist‘),
          // 二级目录，存放静态资源文件的目录，位于dist文件夹下
          assetsSubDirectory: ‘static‘,
          // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
          // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
          assetsPublicPath: ‘/‘,
          // 是否使用source-map
          productionSourceMap: true,
          // Gzip off by default as many popular static hosts such as
          // Surge or Netlify already gzip all static assets for you.
          // Before setting to `true`, make sure to:
          // npm install --save-dev compression-webpack-plugin
          // 是否开启gzip压缩
          productionGzip: false,
          // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
          productionGzipExtensions: [‘js‘, ‘css‘],
          // Run the build command with an extra argument to
          // View the bundle analyzer report after build finishes:
          // `npm run build --report`
          // Set to `true` or `false` to always turn it on or off
          // 是否展示webpack构建打包之后的分析报告
          bundleAnalyzerReport: process.env.npm_config_report
        },
        // 开发过程中使用的配置
        dev: {
          // 环境变量
          env: require(‘./dev.env‘),
          // dev-server监听的端口
          port: 8080,
          // 是否自动打开浏览器
          autoOpenBrowser: true,
          // 静态资源文件夹
          assetsSubDirectory: ‘static‘,
          // 发布路径
          assetsPublicPath: ‘/‘,
          // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
          // 例如将‘localhost:8080/api/xxx‘代理到‘www.example.com/api/xxx‘
          proxyTable: {},
          // CSS Sourcemaps off by default because relative paths are "buggy"
          // with this option, according to the CSS-Loader README
          // (https://github.com/webpack/css-loader#sourcemaps)
          // In our experience, they generally work as expected,
          // just be aware of this issue when enabling this option.
          // 是否开启 cssSourceMap
          cssSourceMap: false
        }
      }
      ```

    - 

- 命令行代码备忘

```bash
d:\rj\vue-workspace>npm install -g cnpm --registry=https://registry.npm.taobao.org
npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
C:\Users\28137\AppData\Roaming\npm\cnpm -> C:\Users\28137\AppData\Roaming\npm\node_modules\cnpm\bin\cnpm
+ cnpm@6.0.0
updated 1 package in 43.069s

d:\rj\vue-workspace>
d:\rj\vue-workspace>cnpm install -g vue-cli
Downloading vue-cli to C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli_tmp
Copying C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli_tmp\_vue-cli@2.9.6@vue-cli to C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli
Installing vue-cli's dependencies to C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli/node_modules
[1/20] commander@^2.9.0 installed at node_modules\_commander@2.19.0@commander
[2/20] multimatch@^2.1.0 installed at node_modules\_multimatch@2.1.0@multimatch
[3/20] minimatch@^3.0.0 installed at node_modules\_minimatch@3.0.4@minimatch
[4/20] ora@^1.3.0 installed at node_modules\_ora@1.4.0@ora
[5/20] rimraf@^2.5.0 existed at node_modules\_rimraf@2.6.3@rimraf
[6/20] chalk@^2.1.0 installed at node_modules\_chalk@2.4.1@chalk
[7/20] semver@^5.1.0 installed at node_modules\_semver@5.6.0@semver
[8/20] consolidate@^0.14.0 installed at node_modules\_consolidate@0.14.5@consolidate
[9/20] tildify@^1.2.0 installed at node_modules\_tildify@1.2.0@tildify
[10/20] user-home@^2.0.0 installed at node_modules\_user-home@2.0.0@user-home
[11/20] uid@0.0.2 installed at node_modules\_uid@0.0.2@uid
[12/20] coffee-script@1.12.7 existed at node_modules\_coffee-script@1.12.7@coffee-script
[13/20] read-metadata@^1.0.0 installed at node_modules\_read-metadata@1.0.0@read-metadata
[14/20] validate-npm-package-name@^3.0.0 installed at node_modules\_validate-npm-package-name@3.0.0@validate-npm-package-name
[15/20] metalsmith@^2.1.0 installed at node_modules\_metalsmith@2.3.0@metalsmith
[16/20] download-git-repo@^1.0.1 installed at node_modules\_download-git-repo@1.1.0@download-git-repo
[17/20] request@^2.67.0 installed at node_modules\_request@2.88.0@request
[18/20] handlebars@^4.0.5 installed at node_modules\_handlebars@4.0.12@handlebars
[19/20] async@^2.4.0 installed at node_modules\_async@2.6.1@async
[20/20] inquirer@^6.0.0 installed at node_modules\_inquirer@6.2.1@inquirer
deprecate metalsmith@2.3.0 › gray-matter@2.1.1 › coffee-script@^1.12.4 CoffeeScript on NPM has moved to "coffeescript" (no hyphen)
Recently updated (since 2018-12-29): 2 packages (detail see file C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli\node_modules\.recently_updates.txt)
  Today:
    → metalsmith@2.3.0 › gray-matter@2.1.1 › toml@^2.3.2(2.3.5) (07:20:45)
  2019-01-03
    → metalsmith@2.3.0 › rimraf@^2.2.8(2.6.3) (03:26:12)
All packages installed (238 packages installed from npm registry, used 16s(network 16s), speed 329.16kB/s, json 222(392.35kB), tarball 4.7MB)
[vue-cli@2.9.6] link C:\Users\28137\AppData\Roaming\npm\vue@ -> C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli\bin\vue
[vue-cli@2.9.6] link C:\Users\28137\AppData\Roaming\npm\vue-init@ -> C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli\bin\vue-init
[vue-cli@2.9.6] link C:\Users\28137\AppData\Roaming\npm\vue-list@ -> C:\Users\28137\AppData\Roaming\npm\node_modules\vue-cli\bin\vue-list

d:\rj\vue-workspace>mkdir javaaier-blog-vue

d:\rj\vue-workspace>cd javaaier-blog-vue

d:\rj\vue-workspace\javaaier-blog-vue>vue init webpack javaaier-blog-vue

? Project name javaaier-blog-vue
? Project description a blog FE by vue
? Author javaaier
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "javaaier-blog-vue".


# Installing project dependencies ...
# ========================

npm WARN deprecated browserslist@2.11.3: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.
npm WARN deprecated bfj-node4@5.3.1: Switch to the `bfj` package for fixes and new features!
npm WARN deprecated browserslist@1.7.7: Browserslist 2 could fail on reading Browserslist >3.0 config used in other tools.

> uglifyjs-webpack-plugin@0.4.6 postinstall d:\rj\vue-workspace\javaaier-blog-vue\javaaier-blog-vue\node_modules\webpack\node_modules\uglifyjs-webpack-plugin
> node lib/post_install.js

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 1130 packages from 650 contributors and audited 10654 packages in 89.663s
found 2 vulnerabilities (1 moderate, 1 high)
  run `npm audit fix` to fix them, or `npm audit` for details

# Project initialization finished!
# ========================

To get started:

  cd javaaier-blog-vue
  npm run dev

Documentation can be found at https://vuejs-templates.github.io/webpack



d:\rj\vue-workspace\javaaier-blog-vue>cd javaaier-blog-vue

d:\rj\vue-workspace\javaaier-blog-vue\javaaier-blog-vue>cnpm install
√ Installed 37 packages
√ Linked 0 latest versions
√ Run 0 scripts
√ All packages installed (used 50ms(network 39ms), speed 0B/s, json 0(0B), tarball 0B)

d:\rj\vue-workspace\javaaier-blog-vue\javaaier-blog-vue>npm run dev

> javaaier-blog-vue@1.0.0 dev d:\rj\vue-workspace\javaaier-blog-vue\javaaier-blog-vue
> webpack-dev-server --inline --progress --config build/webpack.dev.conf.js

 95% emitting

 DONE  Compiled successfully in 4190ms                                                                                                                                                  13:58:10

 I  Your application is running here: http://localhost:8080
```



























































































































