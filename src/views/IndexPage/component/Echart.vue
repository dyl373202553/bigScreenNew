<template>
  <div>
    <div id="dmain" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { EChartsOption } from "echarts";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "Echart",
  components: {}
})
export default class Echart extends Vue {
  $echarts: any;
  @Prop({ default: "main" }) id!: string;
  private mounted() {
    setTimeout(() => {
      this.getChart();
    }, 20);
  }

  private getChart() {
    const chartDom = document.getElementById("dmain")!;
    var myChart = this.$echarts.init(chartDom);
    // 指定图表的配置项和数据
    // 柱状图
    // var option: EChartsOption = {
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //         type: 'shadow'
    //         }
    //     },
    //     color: ['#faab0c'],
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         top: '25',
    //         containLabel: true
    //     },
    //     xAxis: [
    //         {
    //         type: 'category',
    //         axisLine: {
    //             lineStyle: {
    //                 color: '#d9d9d9',
    //             }
    //         },
    //         axisLabel: {
    //             color: '#666',
    //         },
    //         data: ['正常打卡', '迟到', '早退', '未打卡'],
    //         axisTick: {
    //             alignWithLabel: true
    //         }
    //         }
    //     ],
    //     yAxis: [
    //         {
    //             type: 'value',
    //             splitLine: {
    //                 lineStyle: {
    //                     color: '#e8e8e8',
    //                     type: [4, 8],
    //                     dashOffset: 4
    //                 }
    //             }
    //         }
    //     ],
    //     series: [
    //         {
    //         type: 'bar',
    //         barWidth: '40',
    //         data: [
    //             {
    //                 value: 200,
    //                 itemStyle: {
    //                     color: '#93d431'
    //                 }
    //             },
    //             350,
    //             70,
    //             400]
    //         }
    //     ]
    // };

    // 饼图
    var option: EChartsOption = {
      tooltip: {
        trigger: "item"
      },
      color: ["#faab0c"],
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: [0, "75%"],
          center: ["50%", "50%"],
          data: [
            {
              value: 1048,
              name: "正常率",
              itemStyle: {
                color: "#93d431"
              }
            },
            { value: 735, name: "异常率" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.echart-main {
  width: 800px;
  height: 300px;
}
</style>
