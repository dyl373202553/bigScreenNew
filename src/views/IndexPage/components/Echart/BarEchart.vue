<template>
  <div class="main-chart">
    <!-- 事件趋势图 -->
    <!-- 统计近7天，每天发生的高危、中危、低危、非攻击不同事件数量。 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLevelTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"
@Component({
  name: "BarEchart",
  components: {},
})
export default class BarEchart extends Vue {
  $echarts: any;
  $day: any;

  private myChart: any = null;

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
  }

  private async getChart() {
    //初始化
    if (this.myChart == null) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
    }
    
    let data = []
    let dateTime:any = []
    var array = [7, 6, 5, 4, 3, 2, 1]
    array.forEach((item: any) => {
      dateTime.push(dayjs().subtract(item, 'day').format('MM-DD'))
    })

    const sevenDay = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const res = await getLevelTypeData({attackTime:[sevenDay+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    if (res.code===0) {
      if (res.data) {
        const arr: any = []
        const brr: any = []
        // type  1:高危 2：中危险 3.低危 4.正常

        res.data.forEach((item: any) => {
          const crr: any[] = []
          item.list.forEach((list: any) => {
            crr.push(list.count)
          })

          const obj =    {
            name: item.name,
            type: 'bar',
            stack: 'total',
            // emphasis: emphasisStyle,
            data: crr,
            itemStyle: {
              color: "red"
            }
          }
          if (item.type==="1") {
            obj.itemStyle.color = "#ee6666"
          } else if (item.type==="2") {
            obj.itemStyle.color = "#ef9207"
          } else if (item.type==="3") {
            obj.itemStyle.color = "#e7dd62"
          } else if (item.type==="4") {
            obj.itemStyle.color = "#60e150"
          } 
          
          arr.push(obj)
        });
        data = arr
      }
    }

    
    // 指定图表的配置项和数据
    var option: any = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      legend: {
        icon: "circle",
        left: "right",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 12,
          padding: [3, 0, 0, 0],
          color: "#2BE9FF",
        },
        // data: ['bar', 'bar2', 'bar3', 'bar4'],
      },
      grid: {
        top: 20,
        left: "left",
        right: 10,
        bottom: 5,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: dateTime,
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
          textStyle: {
            color: "#2BE9FF",
            padding: 8,
            fontSize: 12,
          },
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
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
          show: false,
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            color: "#2BE9FF",
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: data,
    };
    // for (var i = 0; i < data.legend.length; i++) {
    //   option.series.push({
    //     name: data.legend[i],
    //     type: "bar",
    //     stack: "总量",
    //     barWidth: "45%",
    //     label: {
    //       show: false,
    //       position: "insideRight",
    //     },
    //     color: colors[i-1],
    //     data: data.data[i],
    //   });
    // }
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
