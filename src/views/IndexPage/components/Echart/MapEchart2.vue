<template>
  <div class="main-chart">
    <div ref="myChart" class="echart-main" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import china from "@/data/china.json";
import { getCollectLevelTypeData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"
@Component({
  name: "MapEChart2",
  components: {},
})
export default class MapEChart2 extends Vue {
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

    let points: any = []
    let coords: any = []
    const sevenDay = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    // const {code, data} = await getCollectLevelTypeData({attackTime: [sevenDay+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    const {code, data} = await getCollectLevelTypeData({attackTime: ["1970-01-01 00:00:00", "2970-12-30 23:59:59"]})
    if (code===0) {
      // data.point.forEach((item: any) => {
      //   const obj: any = {
      //     name: item.levelTypeName,
      //     coord: [item.targetLng, item.targetLat],
      //     itemStyle: {}
      //   }
      //   if (item.levelType===1) {
      //     obj.itemStyle.color = "#df1111"
      //   } else if (item.levelType===2) {
      //     obj.itemStyle.color = "#ef9207"
      //   } else if (item.levelType===3) {
      //     obj.itemStyle.color = "#e7dd62"
      //   } else if (item.levelType===4) {
      //     obj.itemStyle.color = "#60e150"
      //   } 
      //   points.push(obj)
      // });
      data.line.forEach((item: any) => {
        const obj: any = {
          name: item.levelTypeName,
          coord: [item.targetLng, item.targetLat],
          symbolSize: 20,
          symbol: "image://" + require(`@/assets/images/none_circle.svg`)
        }
        if (item.levelType===1) {
          obj.symbol = "image://" + require(`@/assets/images/high_circle.svg`)
        } else if (item.levelType===2) {
          obj.symbol = "image://" + require(`@/assets/images/middle_circle.svg`)
        } else if (item.levelType===3) {
          obj.symbol = "image://" + require(`@/assets/images/low_circle.svg`)
        } else if (item.levelType===4) {
          obj.symbol = "image://" + require(`@/assets/images/none_circle.svg`)
        } 
        points.push(obj)

        const abj: any = {
          coords: [[item.sourceLng, item.sourceLat], [item.targetLng, item.targetLat]],
          lineStyle: {}
        }
        if (item.levelType===1) {
          abj.lineStyle.color = "#df1111"
        } else if (item.levelType===2) {
          abj.lineStyle.color = "#ef9207"
        } else if (item.levelType===3) {
          abj.lineStyle.color = "#e7dd62"
        } else if (item.levelType===4) {
          abj.lineStyle.color = "#60e150"
        } 
        coords.push(abj)
      });
    }
    var geoJson = china;
    this.$echarts.registerMap("china", geoJson);

    // [118.8062, 31.9208]
    // [123.1238, 42.1216]
    // [114.4995, 38.1006]
    // [117.4219, 39.4189]
    // [101.4038, 36.8207]
    // [103.9526, 30.7617]
    // [108.384366, 30.439702]
    // [119.4543, 25.9222]
    // [87.68, 43.77]

    // 指定图表的配置项和数据
    var option: any = {
      geo: {
        map: "china",
        zoom: 1.1,
        roam: false,
        itemStyle: {
          normal: {
            areaColor: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#09132c", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#274d68", // 100% 处的颜色
                },
              ],
              globalCoord: true, // 缺省为 false
            },
          },
          emphasis: {
            // 配地图hover颜色变化的
            areaColor: "#2785D0",
            borderWidth: 0,
            color: "#0097BC",
            label: {
              show: false,
            },
          },
        },
        regions: [
          // 好像没用啊
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",
              borderColor: "#df1111",
              // normal: {
              //   opacity: 0,
              //   label: {
              //     show: false,
              //     color: "#009cc9",
              //   },
              // },
            },
          },
        ],
      },
      series: [
        {
          type: "map",
          zoom: 1.1,
          map: "china", //使用
          roam: false,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#0097BC",
              },
            },
            emphasis: {
              textStyle: {
                color: "#38D0FB",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#38D0FB",
              borderWidth: 1,
              areaColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(37, 139, 185, 0.6)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(37, 139, 185, 0.4)", // 100% 处的颜色
                  },
                ],
                globalCoord: true, // 缺省为 false
              },
            },
            emphasis: {
              // 配地图hover颜色变化的
              areaColor: "#2785D0",
            },
          },
        },
        {
          // 这里是打点
          type: "effectScatter",
          coordinateSystem: "geo", // 该系列使用的坐标系
          showEffectOn: "render", // 配置何时显示特效
          zlevel: 1,
          markPoint: {
            // itemStyle: {
            //   opacity: .8
            // },
            data: points
          },
          // symbolSize: 10,
          // data: points,
        },
        {
          type: "lines",
          zlevel: 2,
          lineStyle: {
            normal: {
              color: "#FDFF2B",
              width: 2, //线条宽度
              opacity: .7, //尾迹线条透明度
              cap: "round",
            },
          },
          symbol: ['none', 'circle'],
          symbolSize: [3, 3],
          data: coords,
          // data: [
          //   {
          //     coords: [
                
          //       [119.4543, 25.9222],
          //        [118.8062, 31.9208],
          //     ],
          //     lineStyle: { color: "pink" },
          //   },
          //   {
          //     coords: [
          //       [117.4219, 39.4189],
          //       [123.1238, 42.1216],
          //     ],
          //     lineStyle: { color: "#ef9207" },
          //   },
          //   {
          //     coords: [
          //       [103.9526, 30.7617],
          //       [101.4038, 36.8207],
          //     ],
          //     lineStyle: { color: "#e7dd62" },
          //   },
          //   {
          //     coords: [
          //       [108.384366, 30.439702],
          //       [114.4995, 38.1006],
          //     ],
          //     lineStyle: { color: "#60e150" },
          //   },
          //   {
          //     coords: [
          //       [87.68, 43.77],
          //       [108.384366, 30.439702],
          //     ],
          //     lineStyle: { color: "#FDFF2B" },
          //   },
          // ],
        },
      ],
    };
    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.main-chart {
  height: calc(56vh + 20px - 45px - 22px);
}
.echart-main {
  width: 83%;
  height: 100%;
  // height: 600px; 
  float: right;
}
</style>
