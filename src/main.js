import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Dropdown
} from "ant-design-vue";
import router from "./router";
import store from "./store";
// 引入less 不是css  =>  这样可以自定义主题  https://github.com/ant-design/ant-motion/issues/44
import "ant-design-vue/dist/antd.less";
import Authorized from "@/components/Authorized";
import Auth from "@/directives/auth";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.component("Authorized", Authorized);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
