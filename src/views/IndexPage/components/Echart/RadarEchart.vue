<template>
  <div class="main-chart">
    <!-- 攻击类型分布 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAttackTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"
@Component({
  name: "RadarEchart",
  components: {},
})
export default class RadarEchart extends Vue {
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

    const arr: { name: any; max: string; }[] = []
    const brr: any = []
    const sevenDay = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const {code, data} = await getAttackTypeData({attackTime:[sevenDay+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    if (code===0) {
      data.forEach((item: any) => {
        const obj = {
          name: item.name,
          max: item.maxCount
        }
        arr.push(obj)
        brr.push(item.count)
      });
    }
    // 指定图表的配置项和数据
    // 雷达图
    var option: any = {
      tooltip: {},
      radar: {
        radius: "70%", //大小
        nameGap: 20, // 图中工艺等字距离图的距离
        center: ["50%", "50%"], // 图的位置
        name: {
          textStyle: {
            color: "rgba(101, 213, 255, 1)",
            fontSize: 12,
          },
          formatter: function (name: any) {
            return name;
          },
        },
        indicator: arr,
        axisLine: {
          lineStyle: {
            color: "rgba(153, 409, 246, 0.2)",
          },
          show: true,
          symbolSize: [8, 15],
          symbol: ["none", "arrow"],
          symbolOffset: [0, 15],
        },
        splitArea: {
          show: false,
          areaStyle: {
            color: "rgba(255,0,0,0)", // 图表背景的颜色
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "rgba(153, 209, 246, 0.2)", // 设置网格的颜色
          },
        },
      },

      series: [
        {
          name: "攻击类型分布",
          type: "radar",
          symbol: "angle",
          itemStyle: {
            normal: {
              areaStyle: { type: "default" },
            },
          },
          data: [
            {
              symbol: "circle",
              symbolSize: 5,
              value: brr,
              areaStyle: { color: "rgba(64, 205, 241, 0.2)" },
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  color: "RGBA(0, 34, 66, 1)",
                  borderColor: "rgba(146, 225, 255, 1)",
                },
              },
              lineStyle: {
                color: "rgba(146, 225, 255, 1)",
                width: 1,
              },
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
