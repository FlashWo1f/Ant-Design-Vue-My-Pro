<template>
  <div class="header">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Hover me
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item :key="1">
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item :key="2">
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item :key="3">
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    handleMenuClick(e) {
      console.log("menu click  ", e);
    }
  }
};
</script>

<style scoped lang="less">
.header {
  float: right;
  padding-right: 20px;
}
</style>
