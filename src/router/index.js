import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import { notification } from 'ant-design-vue'
import "nprogress/nprogress.css";
import findLast from 'lodash/findLast';
import { check, isLogin } from '../utils/auth'
// import Home from "../views/Home.vue";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import BasicLayout from "../layouts/BasicLayout";

Vue.use(VueRouter);

// 约定带 name 的组件渲染到 Menu 中

const routes = [
  {
    path: "/",
    // name: "Home",
    component: BasicLayout,
    redirect: "/dashboard",
    meta: { authority: ['user', 'admin'] },
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        meta: { icon: "dashboard", title: "仪表盘" },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import("../views/dashboard/analysis")
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        component: { render: h => h("router-view") },
        meta: { icon: 'form', title: '表单', authority: ['admin'] },
        redirect: '/form/step',
        children: [
          {
            path: '/form/step',
            name: 'step-form',
            meta: { title: '分布表单' },
            component: () => import('../views/form/stepForm.vue'),
            // children: [
            //   {
            //     path: '/form/step/info',
            //     name: 'step-1',
            //     hideInMenu: true,
            //     component: () => import('../views/form/StepForm/Step1.vue')
            //   }
            // ]
          },
          {
            path: '/form/basic-form',
            name: 'basic-form',
            meta: { title: '基础表单' },
            component: () => import('../views/form/BasicForm.vue')
          },
        ]
      },
    ]
  },
  
  {
    path: "/user",
    component: () => import("../layouts/UserLayout.vue"),
    hideInMenu: true,
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import("../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import("../views/User/Register.vue")
      }
    ]
  },
  // {
  //   path: "form/step-form"
  // },
  {
    path: "/about",
    name: "About",
    hideInMenu: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/403",
    name: '403',
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority)
  // console.log("???@@@", record, to.matched)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login',
        name: 'login'
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '您没有权限访问，请联系管理员。'
      })
      next({
        path: '/403'
      })
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
