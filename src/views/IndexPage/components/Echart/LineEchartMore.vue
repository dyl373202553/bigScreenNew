<template>
  <div class="main-chart">
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getReportDeviceTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"

@Component({
  name: "LineEchartMore",
  components: {},
})
export default class LineEchartMore extends Vue {
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

    let dateTime:any = []
    var array = [6, 5, 4, 3, 2, 1]
    array.forEach((item: any) => {
      dateTime.push(dayjs().subtract(item, 'month').format('MM月'))
    })

    const prevMonth = dayjs().subtract(6, 'month').format('YYYY-MM-DD')
    const today = this.$day(new Date(), "YYYY-MM-DD")
    const {code, data} = await getReportDeviceTypeData({beginTime: [prevMonth+" "+"00:00:00", today+" "+"00:00:00"]})
    const arr: any = []
    if (code===0) {
      data.forEach((item: any) => {
        const crr: any[] = []
        item.data.forEach((list: any) => {
          crr.push(list.sum)
        })

        const obj = {
          name: data.deviceName,
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: "#0092f6",
              lineStyle: {
                color: "#0092f6",
                width: 1,
              },
              areaStyle: {
                //color: '#94C9EC'
                color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(7,44,90,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,146,246,0.9)",
                  },
                ]),
              },
            },
          },
          data: crr
        }
        arr.push(obj)
      })
      
    }
  
    // 指定图表的配置项和数据
    // 折线图
    var fontColor = "#30eee9";
    var option: any = {
      grid: {
        top: 20,
        left: "left",
        right: 10,
        bottom: 0,
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: "item",
      },
      legend: {
        show: true,
        x: "right",
        icon: "stack",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#1bb4f6",
          fontSize: 10
        },
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: fontColor,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#397cbc",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#195384",
            },
          },
          data: dateTime,
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          max: 1000,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#2ad1d2",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#27b4c2",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#11366e",
            },
          },
        }
      ],
      series: [
        {
          name: "卫星电话",
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: "#0092f6",
              lineStyle: {
                color: "#0092f6",
                width: 1,
              },
              areaStyle: {
                //color: '#94C9EC'
                color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(7,44,90,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,146,246,0.9)",
                  },
                ]),
              },
            },
          },
          data: [120, 132, 101, 134, 90, 230],
        },
        {
          name: "无线电台",
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 8,

          itemStyle: {
            normal: {
              color: "#00d4c7",
              lineStyle: {
                color: "#00d4c7",
                width: 1,
              },
              areaStyle: {
                //color: '#94C9EC'
                color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(7,44,90,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,212,199,0.9)",
                  },
                ]),
              },
            },
          },
          data: [220, 182, 191, 210, 230, 270],
        },
        {
          name: "手持终端",
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: "#aecb56",
              lineStyle: {
                color: "#aecb56",
                width: 1,
              },
              areaStyle: {
                //color: '#94C9EC'
                color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(7,44,90,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(114,144,89,0.9)",
                  },
                ]),
              },
            },
          },
          data: [150, 232, 201, 154, 190, 180],
        },
        {
          name: "移动电话",
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: "#aecb56",
              lineStyle: {
                color: "#3A44FB",
                width: 1,
              },
              areaStyle: {
                //color: '#94C9EC'
                color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(7,46,101,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,166,246,0.9)",
                  },
                ]),
              },
            },
          },
          data: [150, 232, 201, 154, 190, 180],
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
