<template>
  <div class="analysis">
    <Chart :option='chartOption' style='height: 400px' />
  </div>
</template>

<script>
import Chart from "@/components/Chart";
const option = {
  xAxis: {
    type: "category",
    boundaryGap: false
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "30%"]
  },
  visualMap: {
    type: "piecewise",
    show: false,
    dimension: 0,
    seriesIndex: 0,
    pieces: [
      {
        gt: 1,
        lt: 3,
        color: "rgba(0, 180, 0, 0.5)"
      },
      {
        gt: 5,
        lt: 7,
        color: "rgba(0, 180, 0, 0.5)"
      }
    ]
  },
  series: [
    {
      type: "line",
      smooth: 0.6,
      symbol: "none",
      lineStyle: {
        color: "green",
        width: 5
      },
      markLine: {
        symbol: ["none", "none"],
        label: { show: false },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
      },
      areaStyle: {},
      data: [
        ["2019-10-10", 200],
        ["2019-10-11", 400],
        ["2019-10-12", 650],
        ["2019-10-13", 500],
        ["2019-10-14", 250],
        ["2019-10-15", 300],
        ["2019-10-16", 450],
        ["2019-10-17", 300],
        ["2019-10-18", 100]
      ]
    }
  ]
};
export default {
  data() {
    return {
      chartOption: option
    }
  },
  components: {
    Chart
  }
};
</script>

<style></style>
