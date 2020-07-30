import Vue from "vue";
import App from "./App.vue";
import { Button } from 'ant-design-vue'
import router from "./router";
import store from "./store";
// 引入less 不是css  =>  这样可以自定义主题  https://github.com/ant-design/ant-motion/issues/44
import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false;
Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
