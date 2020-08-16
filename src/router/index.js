import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import Home from "../views/Home.vue";
import NotFound from "../views/404.vue";
import BasicLayout from "../layouts/BasicLayout";

Vue.use(VueRouter);

// 约定带 name 的组件渲染到 Menu 中

const routes = [
  {
    path: "/",
    // name: "Home",
    component: BasicLayout,
    redirect: "/dashboard",
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
      }
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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
