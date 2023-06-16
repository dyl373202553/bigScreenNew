<template>
  <div class="dechart">
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { EChartsOption } from "echarts";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "LineEchart",
  components: {}
})
export default class LineEchart extends Vue {
  $echarts: any;

  private myChart: any = null

  private created() {
    // 新建一个promise对象
    let newPromise = new Promise((resolve: any) => {
      resolve()
    })
    //然后异步执行echarts的初始化函数
    newPromise.then(() => {
      //	此dom为echarts图标展示dom
      //让图表实现响应式布局
      this.getChart()
    })

    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  }

  private getChart() {
    //初始化
    if (this.myChart == null) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
    }

    // 指定图表的配置项和数据
    // 折线图
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
    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.dechart {
  width: 300px;
  height: 300px;
  display: inline-block
}
.echart-main {
  width: 100%;
  height: 300px;
}
</style>
