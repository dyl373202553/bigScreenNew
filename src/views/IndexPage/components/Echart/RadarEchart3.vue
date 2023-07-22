<template>
  <div class="main-chart">
    <!-- 运行指数 -->
    <!-- 显示当天网络安全威胁指数，按照正常、危险、高危不同级别显示 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCherryData } from "@/api/IndexPage/echart";
import dayjs from "dayjs";
@Component({
  name: "MeterEchart",
  components: {},
})
export default class MeterEchart extends Vue {
  $echarts: any;
  $day: any;

  private myChart: any = null;
  private timer: any = null

  protected mounted() {
    // 新建一个promise对象
    let newPromise = new Promise((resolve: any) => {
      resolve();
    });
    //然后异步执行echarts的初始化函数
    newPromise.then(() => {
      //	此dom为echarts图标展示dom
      //让图表实现响应式布局
      this.getChart();
    });

    window.addEventListener("resize", () => {
      this.myChart.resize();
    });

    this.timer = setInterval(() => {
      setTimeout(this.getChart, 0)
    }, 1000*60)
  }

  private beforeDestroy(){
    clearInterval(this.timer);        
    this.timer = null;
  }

  private async getChart() {
    //初始化
    if (this.myChart == null) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
    }
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    let delay = 0;
    const { code, data } = await getCherryData({});
    if (code === 0) {
      if (data) {
        delay = data;
      }
    }

    // 指定图表的配置项和数据
    // 仪表盘
    var option: any = {
      series: [
        {
          type: "gauge",
          radius: "100%",
          center: ["50%", "60%"],
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.25, "rgb(122, 224, 228)"],
                [0.75, "rgb(76, 163, 220)"],
                [1, "rgb(244, 101, 107)"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#2EE5E3",
                },
                {
                  offset: 1,
                  color: "#385CF7",
                },
              ]),
            },
          },
          axisTick: {
            distance: -20,
            length: 7,
            lineStyle: {
              color: "transparent",
              width: 0,
            },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: {
              color: "#transparent",
              width: 0,
            },
          },
          axisLabel: {
            color: "auto",
            distance: 30,
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            fontSize: 16,
            formatter: function (value: number) {
              if (value <= 25) {
                return "低";
              } else if (25 < value && value <= 75) {
                return "中";
              } else if (value > 75) {
                return "高";
              }
              return "";
            },
            color: "auto",
          },
          data: [
            {
              value: delay,
              // name: "危险",
            },
          ],
        },
      ],
    };

    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.main-chart {
  height: 21vh;
}
.echart-main {
  width: 100%;
  height: 100%;
}
</style>
