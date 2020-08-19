<template>
  <div class="analysis">
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import axios from "axios";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    getChartData() {
      axios
        .get("/api/dashboard/chart", {
          params: { ID: 12345 }
        })
        .then(res => {
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
