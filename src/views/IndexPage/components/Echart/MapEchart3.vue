<template>
  <div>
    <div class="main-chart">
      <div ref="myChart" class="echart-main" style="height: 100%; width: 100%;"></div>
      <div class="dpopover" v-if="show" :style="{top:positionTop, left: positionRight}">
        <i class="el-icon-close" @click="show=false"></i>
        <div class="title">{{alertData.name}}</div>
        <ul class="dpopover-ul">
          <li>
            <div class="dth">开始时间：</div>
            <div class="dtd">{{$day(alertData.beginTime, "YYYY年MM月DD日")}}</div>
          </li>
          <li>
            <div class="dth">执行单位：</div>
            <div class="dtd">{{alertData.companyName}}</div>
          </li>
          <li>
            <div class="dth">保障地点：</div>
            <div class="dtd">{{alertData.province}}{{alertData.city}}{{alertData.county}}</div>
          </li>
          <li>
            <div class="dth">通信手段：</div>
            <div class="dtd">{{alertData.connectType}}</div>
          </li>
          <li>
            <div class="dth">通信设备：</div>
            <div class="dtd">
              <span v-for="item in alertData.detailList" :key="item.id" class="device-span">{{item.deviceTypeName}}</span>
            </div>
          </li>
        </ul>
        <div class="dpopover-bottom" @click="dialogShow=true">详情>></div>
      </div>
    </div>
    <div class="dcenter-info">
      <!-- 3.任务保障态势 -->
      <ul class="dcenter-info-ul">
        <li>总任务<b>{{dataInfo.total}}</b>项</li>
        <li>进行中<b>{{dataInfo.run}}</b>项</li>
        <li>未开始<b>{{dataInfo.wait}}</b>项</li>
      </ul>
    </div>

    <Dialog :dialogFormVisible="dialogShow" :title="dialogTitle" :isBtn="false" @close="dialogClose" @save="dialogClose" class="alert-dialog">
      <div slot="dialog-main">
        <TaskDetail :dataInfo="alertData" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import china from "@/data/china.json";
import { getCollectCountyStatusData, getNetTaskDetail } from "@/api/IndexPage/echart"
import Dialog from "@/components/public/Dialog.vue"
import TaskDetail from "../TaskDetail.vue"
import dayjs from "dayjs"

@Component({
  name: "MapEchart3",
  components: { Dialog, TaskDetail },
})
export default class MapEchart3 extends Vue {
  $echarts: any;
  $day: any;
  private myChart: any = null;
  private show = false
  private positionTop = "154px"
  private positionRight = "438px"
  private dataInfo = {}
  private alertData = {}
  private dialogShow = false
  private dialogTitle = "保障任务详情"

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
    const _this = this;
    //初始化
    if (this.myChart == null) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
    }

    const prevMonth = dayjs().subtract(5, 'month').format('YYYY-MM')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    // const {code, data} = await getCollectCountyStatusData({beginTime:[prevMonth +"-01"+" "+"00:00:00", yesterday+" "+"23:59:59"]})
    const {code, data} = await getCollectCountyStatusData({beginTime:["1970-01-01 00:00:00", "2970-12-30 23:59:59"]})

    let points: any = []
    if (code === 0) {
      this.dataInfo = data
      data.data.forEach((item: any) => {
        const obj = {
          id: item.id,
          value: [item.lng, item.lat],
          itemStyle: { color: "#ef9207" },
        }
        points.push(obj)
      });
    }

    var geoJson = china;
    this.$echarts.registerMap("china", geoJson);

    // 测试数据
    // points = [
    //   {
    //     value: [118.8062, 31.9208],
    //     itemStyle: { color: "#df1111" },
    //   },
    //   {
    //     value: [123.1238, 42.1216],
    //     itemStyle: { color: "#ef9207" },
    //   },
    //   {
    //     value: [114.4995, 38.1006],
    //     itemStyle: { color: "#60e150" },
    //   },
    //   // {
    //   //   value: [117.4219, 39.4189],
    //   //   itemStyle: { color: "gold" },
    //   // },
    //   {
    //     value: [101.4038, 36.8207],
    //     itemStyle: { color: "#e7dd62" },
    //   },
    //   // {
    //   //   value: [103.9526, 30.7617],
    //   //   itemStyle: { color: "#FDFF2B" },
    //   // },
    //   // {
    //   //   value: [108.384366, 30.439702],
    //   //   itemStyle: { color: "#FDFF2B" },
    //   // },
    //   // {
    //   //   value: [119.4543, 25.9222],
    //   //   itemStyle: { color: "#FDFF2B" },
    //   // },
    //   // {
    //   //   value: [87.68, 43.77],
    //   //   itemStyle: { color: "#FDFF2B" },
    //   // },
    // ];

    // 指定图表的配置项和数据
    // 折线图
    var option: any = {
      // tooltip: {
      //   // trigger: 'item'
      //   // 鼠标移到图里面的浮动提示框
      //   // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
      //   formatter(
      //     params: {
      //       data: {
      //         value: any;
      //         perf: any;
      //         downloadSpeep: any;
      //         usability: any;
      //         point: any;
      //       };
      //       name: any;
      //     },
      //     ticket: any,
      //     callback: any
      //   ) {
      //     // params.data 就是series配置项中的data数据遍历
      //     let localValue, perf, downloadSpeep, usability, point;
      //     if (params.data) {
      //       localValue = params.data.value;
      //       perf = params.data.perf;
      //       downloadSpeep = params.data.downloadSpeep;
      //       usability = params.data.usability;
      //       point = params.data.point;
      //     } else {
      //       // 为了防止没有定义数据的时候报错写的
      //       localValue = 0;
      //       perf = 0;
      //     }
      //     let htmlStr = `
      //     <div style='font-size:18px;'> ${params.name}</div>
      //     <p style='text-align:left;margin-top:-4px;'>
      //         项目数量：${localValue[2]}<br/>
      //     </p>
      //   `;
      //     return htmlStr;
      //   },
      // },
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
            disabled: true,
            areaColor: "pink",
            borderWidth: 0,
            color: "pink",
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
              areaColor: "transparent",
            },
          },
          zoom: 1.1,
          map: "china", //使用
        },
        {
          // 这里是打点
          type: "effectScatter",
          coordinateSystem: "geo", // 该系列使用的坐标系
          showEffectOn: "render", // 配置何时显示特效
          zlevel: 4,
          symbolSize: 15,
          rippleEffect: {
            // 涟漪特效相关配置
            number: 3, // 波纹的数量。
            period: 5, // 动画的周期，秒数。
            scale: 5, // 动画中波纹的最大缩放比例。
            brushType: "fill", // 波纹的绘制方式，可选 'stroke' 和 'fill'。
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
          // markPoint: {
          //   symbol: "triangle",
          //   symbolSize: 20,
          //   data: [
          //       {
          //           name: '某个坐标',
          //           coord: [114.4995, 38.1006]
          //       }
          //   ]
          // },
          data: points,
          // label: {
          //   show: true,
          //   padding: [10, 20],
          //   color: '#fff',
          //   backgroundColor: "#1a3961",
          //   borderColor: '#aee9fb',
          //   borderWidth: 1,
          //   borderRadius: 6,
          //   formatter(params: { name: any; value: string[]; }) {
          //       let arr = [params.name, "上行：" + params.value[1] + "G/s", "下行：" + params.value[0] + "G/s"];
          //       return arr.join("\n")
          //   },
          //   textStyle: {
          //       align: 'left',
          //       lineHeight: 20,
          //   }
          // },
        }
      ],
    };
    option && this.myChart.setOption(option);

    this.myChart.on('click', function(params: any) {
      if (params.componentType === 'series') {
        if (params.seriesType === 'effectScatter') {
          _this.getPositon(params)
        }
      }
    });
  }

  private async getPositon(item: any) {
    this.positionRight = item.event.offsetX + "px"
    this.positionTop = item.event.offsetY + "px"
    const {code, data} = await getNetTaskDetail(item.data.id)
    if (code === 0) {
      this.alertData = data
      this.show = true
    }
  }

  private dialogClose() {
    this.dialogShow = false
  }

}
</script>

<style lang="less" scoped>
.main-chart {
  position: relative;
}
.main-chart {
  height: calc(56vh + 20px - 45px - 22px);
}
.echart-main {
  width: 83%;
  height: 100%;
  // height: 600px; 
  float: right;
}
.dpopover {
  width: 220px;
  position: absolute;
  // left: 438px;
  // top: 154px;
  // background: #1a3961;
  // border: 1px solid #aee9fb;
  // border-radius: 3px;
  // padding: 15px 15px 10px;
  // color: #fff;
  background: rgba(2, 64, 82, 0.7);
  border-radius: 3px;
  padding: 15px 15px 10px;
  border: 1px solid #aee9fb;
  color: #fff;
  .el-icon-close {
    color: #fff;
    opacity: .7;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .el-icon-close:hover {
    opacity: .5;
  }
  .title {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #65fdff;
  }
  .dpopover-ul {
    li {
      font-size: 12px;
      line-height: 30px;
      color: #e4e4e4;
      display: flex;
      .dth {
        width: 60px;
      }
      .dtd {
        flex: 1;
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;
      }
    }
  }
  .dpopover-bottom {
    font-size: 12px;
    margin-top: 10px;
    text-align: right;
    color: #65fdff;
    cursor: pointer;
  }
}
.device-span {
  margin-right: 10px;
}

</style>
