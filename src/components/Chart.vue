<template>
<!--  style="height: 400px" 组件挂载的 style 会自动挂载到组件的根节点上 -->
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 按需加载
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
export default {
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // 深度监听这么大的数据很耗性能，还是直接监听，只是在父组件中需要 this.option = {...this.option} 改变其内存地址
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val)
    //   },
    //   deep: true
    // }
    option(val) {
      this.chart.setOption(val)
    }
  },
  created() {
    this.resize = debounce(this.resize, 200)
  },
  mounted() {
    this.renderChart()
    addListener(this.$refs.chartDom, this.resize)
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize)
    // 销毁，置空， 防止内存泄漏
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize() {
      console.log('resoze')
      this.chart.resize()
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style lang="less">
</style>