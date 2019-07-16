const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_SOURCE_SRC,

  productionSourceMap: !IS_PROD,

  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@components', resolve('src/components'))
      .set('@plugins', resolve('src/plugins'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))

    config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
  },
  lintOnSave: false,

  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/variables.scss";`
      }
    }
  }
}
