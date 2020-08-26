<template>
  <div class="header">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Hover me
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" @click="handleMenuClick" :selectedKeys="[$route.query.locale || 'zhCN']">
        <a-menu-item key="zhCN">
          <a href="javascript:;">中文</a>
        </a-menu-item>
        <a-menu-item key="enUS">
          <a href="javascript:;">English</a>
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
    handleMenuClick({ key }) {
      // console.log("menu click  ", e);
      this.$router.push({query: {...this.$router.query, locale: key}})
      this.$i18n.locale = key
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
