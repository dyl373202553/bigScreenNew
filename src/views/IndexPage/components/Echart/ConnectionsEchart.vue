<template>
  <div class="main-chart">
    <!-- 流量趋势图 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getConnectionsData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"

@Component({
  name: "ConnectionsEchart",
  components: {},
})
export default class ConnectionsEchart extends Vue {
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
    let time: any[] = []
    let download: any = []
    let upload = []
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    // const {code, data} = await getConnectionsData({createTime: ['2023-06-20 17:00:00','2023-06-20 18:59:59']})
    // const {code, data} = await getConnectionsData({createTime: [dayjs().subtract(1,'hours').format("YYYY-MM-DD HH:mm:ss"),dayjs().format("YYYY-MM-DD HH:mm:ss")]})
    const {code, data} = await getConnectionsData({createTime: [dayjs().format("YYYY-MM-DD")+' '+(dayjs().hour()-1)+':'+dayjs().format("mm:ss"),dayjs().format("YYYY-MM-DD HH:mm:ss")]})
    
    if (code===0) {
      data.forEach((item: any) => {
        time.push(this.$day(item.name, "HH:mm"))
        download.push(item.value)
      })
      // download = data.download
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
          let colors = ["rgb(245, 164, 64)"];
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
        data: time,
      },
      yAxis: {
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
      series: [
        {
          name: "连接数",
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 0,
          lineStyle: {
            color: "rgb(245, 164, 64)",
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: "transparent",
            borderColor: "#F7D663",
            borderWidth: 2,
          },
          areaStyle: {
            color: this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(7,44,90,0.3)",
              },
              {
                offset: 1,
                color: "rgba(114,144,89,0.9)",
              },],
              false
            ),
            shadowColor: "rgba(114,144,89, 0.8)",
            shadowBlur: 20,
          },
          data: download,
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
