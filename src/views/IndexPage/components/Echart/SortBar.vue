<template>
  <div class="main-chart">
    <!-- 事件趋势图 -->
    <!-- 统计近7天，每天发生的高危、中危、低危、非攻击不同事件数量。 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getBananaData } from "@/api/IndexPage/echart";
import dayjs from "dayjs";
import * as echarts from "echarts";
@Component({
  name: "SortBar",
  components: {},
})
export default class SortBar extends Vue {
  $echarts: any;
  $day: any;

  private myChart: any = null;
  private timer: any = null

  private created() {
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

    // let xData = ["类别1", "类别2", "类别3", "类别4", "类别5"];
    // let yData = [4757, 3254, 2454, 2011, 1654, 1211, 1211, 254];
    let xData: any = [];
    let yData: any = [];
  
    let brr: any = [];
    const sevenDay = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const { code, data } = await getBananaData({
      createTime: [sevenDay + " " + "00:00:00", yesterday + " " + "23:59:59"],
    });

    if (code === 0) {
      data.forEach((item: any) => {
        xData.push(item.name)
        yData.push(item.value)
      })
    }
    

    const hexToRgba = (hex: any, opacity: any) => {
      let rgbaColor = "";
      let reg = /^#[\da-f]{6}$/i;
      if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
          "0x" + hex.slice(3, 5)
        )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
      }
      return rgbaColor;
    };

    // 数据整理
    let max = Math.max(...yData);
    let labelColor = ["#39FCFF", "#39FCFF", "#39FCFF"];
    let emptyData = yData.map((v: any, i: any) => {
      let color: any = i > 2 ? "#fff" : labelColor[i];
      let item: any = {
        value: max,
        label: {
          formatter: "{a|" + v + "}",
          position: "right",
          distance: 20,
          rich: {
            a: {
              color: color,
              borderColor: color,
              borderWidth: 1,
              borderType: "dashed",
              padding: [0, 0, 2, 0],
              width: 60,
              height: 18,
              align: "center",
              verticalAlign: "middle",
              backgroundColor: hexToRgba(color, 0.05),
            },
          },
        },
      };
      return item;
    });
    let xDataFormat = xData.map((v: any, i: any) => {
      let color: any = i > 2 ? "#fff" : labelColor[i];
      let item: any = {
        value: v,
        textStyle: {
          rich: {
            a: {
              color: color,
              width: 20,
              height: 20,
              align: "center",
              verticalAlign: "middle",
              backgroundColor: "rgb(41 103 121)",
              borderRadius: 10,
              borderColor: hexToRgba(color, 0.2),
              borderWidth: 1,
              shadowColor: hexToRgba(color, 0.1),
              shadowBlur: 5,
            },
            b: {
              padding: [0, 5],
            },
            value: {
              color: "#fff",
            },
          },
        },
      };
      return item;
    });
    xData.reverse();
    xDataFormat.reverse();
    yData.reverse();
    emptyData.reverse();

    const option = {
      backgroundColor: "transparent",
      grid: {
        top: "5%",
        left: "35%",
        right: "27%",
        bottom: "10%",
        // containLabel: true,
      },
      xAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
          max: function (value: any) {
            return value.max;
          },
          axisLine: {
            lineStyle: {
              color: "#D9D9D9",
            },
          },
          axisLabel: {
            color: "#39FCFF",
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          name: "",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#1d4f63",
            },
          },
          axisLabel: {
            formatter: function (value: any) {
              return (
                "{a|" +
                value.substr(value.length - 1) +
                "}{b|}{value|" +
                value +
                "}"
              );
            },
          },
          data: xDataFormat,
        },
        {
          type: "category",
          name: "",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: xData,
        },
      ],
      series: [
        {
          type: "bar",
          barWidth: 10,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 6, 6, 0],
              color: "rgba(225,225,225,0.4)",
            },
            emphasis: {
              barBorderRadius: [0, 6, 6, 0],
              color: "rgba(225,225,225,0.4)",
            },
          },
          label: {
            show: true,
            position: "right",
            formatter: function (a: any) {
              console.log(a);
            },
          },
          data: emptyData,
        },
        {
          type: "bar",
          barWidth: 10,
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 6, 6, 0],
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                1,
                [
                  {
                    offset: 0,
                    color: "#3D9FFF",
                  },
                  {
                    offset: 1,
                    color: "#41D7F3",
                  },
                ],
                false
              ),
            },
          },
          data: yData,
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
  width: 100%;
}
.echart-main {
  width: 100%;
  height: 100%;
}
</style>
