<template>
  <div class="main-chart">
    <!-- 运行指数 -->
    <!-- 显示当天网络安全威胁指数，按照正常、危险、高危不同级别显示 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDelayData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"
@Component({
  name: "MeterEchart",
  components: {},
})
export default class MeterEchart extends Vue {
  $echarts: any;
  $day: any;

  private myChart: any = null;

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
  }

  private async getChart() {
    //初始化
    if (this.myChart == null) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
    }
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    let delay = 0
    const {code, data} = await getDelayData({connectTime:[yesterday+" "+"00:00:00", yesterday+" "+"23:59:59"]})
     if (code===0) {
      if (data) {
        delay = data.delay
      }
     }
  
    // 指定图表的配置项和数据
    // 仪表盘
    var option: any = {
      series: [
        {
          type: "gauge",
          radius: "120",
          center: ["50%", "60%"],
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.4, "#67e0e3"],
                [0.8, "#37a2da"],
                [1, "#fd666d"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -20,
            length: 10,
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          axisLabel: {
            color: "auto",
            distance: 30,
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            formatter: function (value: number) {
              if (value <= 40) {
                return "正常";
              } else if ( 40 < value && value <= 70) {
                return "危险";
              } else if (value >= 80) {
                return "高危";
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
