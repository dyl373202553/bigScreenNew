<template>
  <div class="main-chart">
    <!-- 保障任务情况 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getMonthTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"
@Component({
  name: "BarOneEchart",
  components: {},
})
export default class BarOneEchart extends Vue {
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

    let date: any[] = []
    let arr: any[] = []
    const prevMonth = dayjs().subtract(5, 'month').format('YYYY-MM')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const {code, data} = await getMonthTypeData({beginTime: [prevMonth +"-01"+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    if (code===0) {
      data.forEach((item: any) => {
        date.push(this.$day(item.month, "M月"))
        arr.push(item.count)
      });
    }

    // 指定图表的配置项和数据
    var option: any = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 20,
        left: "left",
        right: 10,
        bottom: 5,
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: date,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#156476",
            },
          },
          axisLabel: {
            margin: 10,
            color: "#2BE9FF",
            textStyle: {
              fontSize: 12,
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: "{value}",
            color: "#2BE9FF",
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.12)",
            },
          },
        },
      ],
      series: [
        {
          type: "bar",
          data: arr,
          barWidth: "25",
          itemStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,244,255,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,77,167,1)", // 100% 处的颜色
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,160,221,1)",
              shadowBlur: 4,
            },
          },
        },
      ],
    };
    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.main-chart {
  height: calc(28vh - 34px - 22px);
}
.echart-main {
  width: 100%;
  height: 100%;
}
</style>
