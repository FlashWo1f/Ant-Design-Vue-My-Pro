import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Dropdown,
  Form,
  Input,
  LocaleProvider,
  DatePicker,
} from "ant-design-vue";
import router from "./router";
import store from "./store";
import VueI18n from 'vue-i18n'
import enUS from '@/locale/enUS'
import zhCN from '@/locale/zhCN'
// 第三方包解析 query
import queryString from 'querystring'
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
Vue.use(Form);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(LocaleProvider);
Vue.component("Authorized", Authorized);
Vue.use(Auth);
Vue.use(VueI18n)

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
