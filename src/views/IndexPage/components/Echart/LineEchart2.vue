<template>
  <div class="main-chart">
    <!-- 通信设备使用情况 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getReportDeviceTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"

@Component({
  name: "LineEchart2",
  components: {},
})
export default class LineEchart2 extends Vue {
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
    var array = [5, 4, 3, 2, 1, 0]
    array.forEach((item: any) => {
      dateTime.push(dayjs().subtract(item, 'month').format('M月'))
    })
    const prevMonth = dayjs().subtract(5, 'month').format('YYYY-MM')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const {code, data} = await getReportDeviceTypeData({pageNo:1, pageSize:10, applyTime: [prevMonth +"-01"+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    const arr: any = []
    let colors: string[] = [];
    if (code===0) {
      data.forEach((item: any) => {
        const crr: any[] = []
        item.data.forEach((list: any) => {
          crr.push(list.sum)
        })
        const obj:any = {
          name: item.deviceName,
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 6,
          label: {
            show: false,
          },
          itemStyle: {
            color: "transparent",
            borderColor: "#0092f6",
            borderWidth: 2,
          },
          data: crr
        }

        if (item.deviceType===1) {
          colors.push("#0092f6")
          obj.lineStyle =  {
            color: "#0092f6",
          }
          obj.areaStyle = {
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
          }
        } else if (item.deviceType===2) {
          colors.push("#00d4c7")
          obj.lineStyle =  {
            color: "#00d4c7",
          }
          obj.areaStyle = {
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
          }
        } else if (item.deviceType===3) {
          colors.push("#aecb56")
          obj.lineStyle =  {
            color: "#aecb56",
          }
          obj.areaStyle = {
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
          }
        } else if (item.deviceType===4) {
          colors.push("#3A44FB")
          obj.lineStyle =  {
            color: "#3A44FB",
          }
          obj.areaStyle = {
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
          }
        } 

        arr.push(obj)
      })
    }

    // 指定图表的配置项和数据
    // 折线图
    var option: any = {
      grid: {
        top: 20,
        left: "left",
        right: 10,
        bottom: 20,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "rgba(113, 113, 113, 1)",
          },
        },
        backgroundColor: "rgba(42, 51, 74, 1)",
        borderColor: "transparent",
        formatter: function (params: any) {
          let returnData = '<div style="padding: 5px 10px;">';
          returnData +=
            '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: rgba(210, 221, 249, 1);">' +
            params[0].axisValue +
            "</span><br/>";
          for (let i = 0; i < params.length; i++) {
            returnData +=
              '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' +
              colors[i] +
              '"></span>';
            returnData +=
              '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' +
              colors[i] +
              '">' +
              params[i].seriesName +
              '：</span><span style="font-family: Verdana; font-size: 14px; color: ' +
              colors[i] +
              '">' +
              params[i].value +
              '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' +
              colors[i] +
              '"></span><br/>';
          }
          returnData += "</div>";
          return returnData;
        },
      },
      xAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#156476",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          fontFamily: "SourceHanSansCN-Regular",
          fontSize: 12,
          interval: "auto",
          color: "#2BE9FF",
          padding: 8,
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        boundaryGap: false,
        data: dateTime,
      },
      yAxis: {
        type: "value",
        min: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#156476",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#4F6473",
          },
        },
        axisLabel: {
          show: true,
          margin: 20,
          fontFamily: "MicrosoftYaHei",
          fontSize: 12,
          color: "#2BE9FF",
        },
        axisTick: {
          show: false,
        },
      },
      series: arr,
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
