<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="handleClickMenuItem(item)"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from '@/utils/auth'
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
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  mounted() {
    console.log("UUUUUUU", this.$route)
    // console.log("!@@@@", this.selectedKeys, this.openKeys)
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let v of routes) {
        if (v.meta && v.meta.authority && !check(v.meta.authority)) {
          // continue 跳出本次循环  不能用 break  会结束整个循环
          continue
        }
        if (v.name && !v.hideInMenu) {
          this.openKeysMap[v.path] = parentKeys;
          // console.log(
          //   "this.selectedKeysMap",
          //   this.selectedKeysMap,
          //   "openKeysMap",
          //   this.openKeysMap
          // );
          this.selectedKeysMap[v.path] = [v.path || selectedKey];
          const newItem = { ...v };
          // ? 为何删除 Children
          delete newItem.children;
          if (v.children && !v.hideChildrenInMenu) {
            newItem.children = this.getMenuData(v.children, [
              ...parentKeys,
              v.path
            ]);
          } else {
            // 主要给分页表单做处理的 去生成 openKeysMap
            this.getMenuData(
              v.children,
              selectedKey ? parentKeys : [...parentKeys, v.path],
              selectedKey || v.path
            );
          }
          menuData.push(newItem);
        } else if (!v.hideInMenu && !v.hideChildrenInMenu && v.children) {
          menuData.push(...this.getMenuData(v.children));
        }
      }
      
      return menuData;
    },
    handleClickMenuItem(item) {
      item.path !== this.$route.path && this.$router.push({ path: item.path, query: this.$route.query });
    }
  }
};
</script>
