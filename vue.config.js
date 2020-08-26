const path = require('path')
const webpack = require('webpack')

const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  // 将本项目的style打包在一起
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
  themeVariables: ['@primary-color'],
  mainLessFile: '',
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  // customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  lintOnSave: false,
  devServer: {
    port: "4396",
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      "/api": {
        target: "http://localhost:4396",
        // bypass 拦截接口，且记录会在 network 中显示. 原生 mock 中是极好的。
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            // 后续这里可以多导出导入一些东西，更加灵活 全能
            const result = mock(req.method);
            // console.log("!!", result, mock)
            // 拿到结果后每次都清除掉缓存，以后后面修改内容，重发请求是不是走的缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  },
  configureWebpack: {
    // 忽略 moment 的语言包 如需引用  手动加载
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  css: {
    // 给 css 相关 loader 传递选项
    // https://cli.vuejs.org/zh/config/#css-loaderoptions
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
        },
        // https://github.com/ant-design/ant-motion/issues/44
        javascriptEnabled: true
      }
    }
  }
};
