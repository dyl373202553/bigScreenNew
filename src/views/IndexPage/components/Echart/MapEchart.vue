<template>
  <div class="main-chart">
    <div ref="myChart" class="echart-main"  style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import china from "@/data/china.json";
import { getMapRegionData } from "@/api/IndexPage/echart"
import dayjs from "dayjs"

@Component({
  name: "MapEChart",
  components: {},
})
export default class MapEChart extends Vue {
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


    const points: any = []
    const coords: any = []
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    // const {code, data} = await getMapRegionData({createTime:[yesterday+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    const {code, data} = await getMapRegionData({createTime:["1970-01-01 00:00:00", "2970-12-30 23:59:59"]})
    if (code===0) {
      data.base.forEach((item: any) => {
        const obj = {
          value: [item.lng, item.lat],
          itemStyle: { color: "#FDFF2B" },
          name: item.name
        }
        points.push(obj)
      });
      data.line.forEach((item: any) => {
        const obj = {
          coords: [
            [item.sourceCountyLng, item.sourceCountyLat],
            [item.regionTargetLng, item.regionTargetLat],
          ],
          lineStyle: { color: "#FDFF2B" },
        }
        coords.push(obj)
      });
    }

  
    var geoJson = china;
    this.$echarts.registerMap("china", geoJson);

    // var points = [
    //   {
    //     value: [118.8062, 31.9208],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [123.1238, 42.1216],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [114.4995, 38.1006],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [117.4219, 39.4189],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [101.4038, 36.8207],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [103.9526, 30.7617],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [108.384366, 30.439702],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [119.4543, 25.9222],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    //   {
    //     value: [87.68, 43.77],
    //     itemStyle: { color: "#FDFF2B" },
    //   },
    // ];

    // 指定图表的配置项和数据
    // 折线图
    var option: any = {
      geo: {
        map: "china",
        zoom: 1.1,
        roam: false,
        itemStyle: {
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
          emphasis: { // 配地图hover颜色变化的
            areaColor: "#2785D0",
            borderWidth: 0,
            color: "#0097BC",
            label: {
              show: false,
            },
          },
        },
        regions: [ // 好像没用啊
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",
              borderColor: "red",
              // normal: {
              //   opacity: 0,
              //   label: {
              //     show: false,
              //     color: "#009cc9",
              //   },
              // },
            },
          }
        ],
      },
      series: [
        {
          type: "map",
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
            emphasis: { // 配地图hover颜色变化的
              areaColor: "#2785D0",
            },
          },
          zoom: 1.1,
          map: "china", //使用
        },
        { // 这里是打点
          type: "effectScatter",
          coordinateSystem: "geo", // 该系列使用的坐标系
          showEffectOn: "render", // 配置何时显示特效
          zlevel: 4,
          rippleEffect: { // 涟漪特效相关配置
            // // number: 3, //波纹数量
            // period: 15, // 动画的周期，秒速
            // scale: 2.5, // 动画中波纹的最大缩放比例
            // brushType: "stroke", // 波纹的绘制方式 stroke 、 fill
            number: 3, // 波纹的数量。
            period: 5, // 动画的周期，秒数。
            scale: 5, // 动画中波纹的最大缩放比例。
            brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
          },
          hoverAnimation: true,
          // label: { // 图形上的文本标签，可用于说明图形的一些数据
          //   normal: {
          //     formatter: "{b}",
          //     position: "right",
          //     offset: [15, 0],
          //     color: "#1DE9B6",
          //     show: true,
          //   },
          // },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right', //显示位置
          //     offset: [5, 0], //偏移设置
          //     formatter: function (params: { data: any }) {
          //       //圆环显示文字
          //       return params.data.name;
          //     },
          //     fontSize: 14,
          //     color: "#fff",
          //   },
          //   emphasis: {
          //     show: true,
          //   },
          // },
          emphasis: {
            disabled: false,
            label:  {
              position: 'right', //显示位置
              offset: [5, 0], //偏移设置
              show: true,
              fontSize: 14,
              color: "#fff",
              formatter: function (params: any) {
                return params.data.name;
              }
            }
          },
          symbolSize: 10,
          data: points,
        },
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 7, //箭头指向速度，值越小速度越快
            trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: "triangle", //箭头图标
            color: '#FFAD00', //箭头图标
            symbolSize: 7, //图标大小
          },
          lineStyle: {
            normal: {
              color: "#FDFF2B",
              width: 2, //线条宽度
              opacity: 0.1, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
          },
          data: coords,
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
