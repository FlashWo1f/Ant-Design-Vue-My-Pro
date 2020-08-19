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
