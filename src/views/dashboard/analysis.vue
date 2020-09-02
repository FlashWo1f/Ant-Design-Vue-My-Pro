<template>
  <div class="analysis">
    <!-- 用 $t -->
    {{$t('message')['app.dashboard.analysis.timeLabel']}}
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px" />
    <pre v-highlightjs='ChartCode'><code class="html"></code></pre>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import ChartCode from '!!raw-loader!../../components/Chart';
import request from '@/utils/request'
// import axios from "axios";
export default {
  data() {
    this.ChartCode = ChartCode
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    getChartData() {
      request({
        url: '/api/dashboard/chart',
        method: 'get',
        params: { ID: 12345 }
      }).then(res => {
          this.chartOption = {
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: res.data,
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(220, 220, 220, 0.8)"
                }
              }
            ]
          };
        });
    }
  },
  components: {
    Chart
  }
};
</script>

<style></style>
