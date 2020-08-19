module.exports = {
  lintOnSave: false,
  devServer: {
    port: "4396",
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4396',
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy')
            return '/index.html'
          } else {
            const name = req.path.split('/api/')[1].split('/').join('_')
            const mock = require(`./mock/${name}`)
            // 后续这里可以多导出导入一些东西，更加灵活 全能
            const result = mock(req.method)
            // console.log("!!", result, mock)
            // 拿到结果后每次都清除掉缓存，以后后面修改内容，重发请求是不是走的缓存
            delete require.cache[require.resolve(`./mock/${name}`)]
            return res.send(result)
          }
        }
      }
    }
  },
  css: {
    // 给 css 相关 loader 传递选项
    // https://cli.vuejs.org/zh/config/#css-loaderoptions
    loaderOptions: {
      less: {
        // https://github.com/ant-design/ant-motion/issues/44
        javascriptEnabled: true
      }
    }
  }
};
