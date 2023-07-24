<template>
  <div class="main-chart">
    <!-- 流量趋势图 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getConnectionsRateData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"

@Component({
  name: "PieEchart1",
  components: {},
})
export default class PieEchart1 extends Vue {
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
    const {code, data} = await getConnectionsRateData({})
    if (code===0) {
    }

    // 指定图表的配置项和数据
    // 折线图
    var option: any = {
      backgroundColor: 'rgba(4, 45, 66, 0.7)',
      color: ['#59A2FE', '#FFB717', '#FC8F6B', '#70E07B', '#FBDA3D', '#11E5F1', '#E3A0FF', '#8294FC', '#6AD6FE'],
      tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
      },
      legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemHeight: 6,
          right: '0',
          align: 'left',
          top: 'top',
          textStyle: {
              fontSize: 12,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 17,
          },
      },
      series: [
          {
              type: 'pie',
              radius: [0, "65%"],
              center: ["50%", "50%"],
              labelLine: {
                  normal: {
                      length: 10,
                      length2: 10,
                  },
              },

              label: {
                  normal: {
                      formatter: '{a|{b}}\n{per|{d}%}',
                      color: '#fff',
                      rich: {
                          a: {
                              fontSize: 12,
                              lineHeight: 16,
                              align: 'center',
                              color: '#fff',
                          },
                          per: {
                              color: '#fff',
                              align: 'center',
                              fontSize: 12,
                              lineHeight: 16,
                          },
                      },
                  },
              },
              data: [
                  { value: data.up, name: '上行流量' },
                  { value: data.down, name: '下行流量' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                }
              }
          },
      ],
  };
    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.main-chart {
  height: calc(28vh - 34px - 22px);;
}
.echart-main {
  width: 100%;
  height: 100%;
}
</style>
