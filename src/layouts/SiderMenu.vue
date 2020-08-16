<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };

// import { Menu } from 'ant-design-vue';
import SubMenu from "./SubMenu";
export default {
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(v => {
        if (v.name && !v.hideInMenu) {
          const newItem = { ...v };
          // ? 为何删除 Children
          delete newItem.children;
          if (v.children && !v.hideChildrenInMenu) {
            newItem.children = this.getMenuData(v.children);
          }
          menuData.push(newItem);
        } else if (!v.hideInMenu && !v.hideChildrenInMenu && v.children) {
          menuData.push(...this.getMenuData(v.children));
        }
      });
      return menuData;
    }
  }
};
</script>
