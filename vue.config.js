module.exports = {
  lintOnSave: false,
  devServer: {
    port: "4396",
    overlay: {
      warnings: false,
      errors: false
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
