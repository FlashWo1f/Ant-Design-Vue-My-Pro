## 自定义  webpack   Babel

## 8/17 添加路由权限

bug: 
1. 点击menu item 会报错 不能重复push 相同的path (已解决)
2. openKey 的问题 (已解决)

feat: 

Authority 的两种实现方式
组件式 弊端 不够简洁

指令式  弊端 不够灵活

## mock 

- 在根路径下创建一个 mock 文件夹。将项目内的请求代理到 该目录下

## cross-env 

在 package.json 中 新增一条命令

  "serve:no-mock": "MOCK=none vue-cli-service serve",

## jsx
https://github.com/vuejs/jsx
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

{
  "presets": ["@vue/babel-preset-jsx"]
}

## i18n 国际化


```js
import VueI18n from 'vue-i18n'
import enUS from '@/locale/enUS'
import zhCN from '@/locale/zhCN'
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || 'zhCN',
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

使用的时候用 this.$t 函数

## 打包 高效构建打包发布

主要通过webpack进行优化

生成打包报告
npm run build -- --report

https://github.com/vueComponent/ant-design-vue/issues/325

发现 ant-design-vue/icon 包很大 可以按需加载
发现 moment 包很大 可以按需加载
发现 echart 也可以按需加载

一顿操作后 2.24MB => 1.05MB


## 如何构建可交互的组件文档

类似 Antd Antd-vue 一样

### 方案1

比较笨。写两份代码。一个用来展现交互 一个用来展示纯代码

### 方案2

利用Webpack一份代码加载两次。 第一次用 Vue-loader 加载 第二次用普通文本加载

https://github.com/webpack-contrib/raw-loader

用该方法显示字符串代码

再利用highlight高亮代码
yarn add vue-highlightjs

### 方案3

自己写一个loader  成本高
Antd-Vue 就是使用 vue-antd-md-loader