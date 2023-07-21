<template>
  <div class="main-chart">
    <!-- 病毒防护事件 -->
    <div ref="myChart" class="echart-main"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getVirusProtectionData } from "@/api/IndexPage/echart";
import * as echarts from "echarts";
import dayjs from "dayjs";
@Component({
  name: "RadarEchart",
  components: {},
})
export default class RadarEchart extends Vue {
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

    const arr: { name: any; max: string }[] = [];
    let brr: any = [];
    const sevenDay = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const { code, data } = await getVirusProtectionData({
      createTime: [sevenDay + " " + "00:00:00", yesterday + " " + "23:59:59"],
    });
    if (code === 0) {
      // data.forEach((item: any) => {
      //   const obj = {
      //     name: item.name,
      //     max: item.maxCount,
      //   };
      //   arr.push(obj);
      //   brr.push(item.count);
      // });
      brr = data
    }
    // 指定图表的配置项和数据
    // 饼图
    const colorList = [
      {
        c1: "#c5223b",
        c2: "#fa768a",
      },
      {
        c1: " #de7110",
        c2: "#fecd70",
      },
      {
        c1: "#d09f08",
        c2: "#FFD145",
      },
      {
        c1: "#238483",
        c2: "#55C27C",
      },
      {
        c1: " #45EAFF",
        c2: "#40ADAC",
      },
      {
        c1: "#12B3F8",
        c2: "#7DE8FF",
      },
      {
        c1: " #0176D3",
        c2: "#13B7FF",
      },
    ];
    var option: any = {
      backgroundColor: "transparent",
      color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
      series: [
        {
          stack: "a",
          type: "pie",
          center: ['50%', '50%'],
          radius: ["20%", "80%"],
          roseType: "area",
          zlevel: 10,
          label: {
            normal: {
              show: true,
              formatter: function (param: any) {
                console.log(param);
                let style = "";
                switch (param.name) {
                }
                return (
                  "{a|" +
                  param.name +
                  "}\n\n" +
                  "{" +
                  style +
                  param.value +
                  "件" +
                  "}"
                );
              },
              textStyle: {
                fontSize: 14,
                color: "#fff",
              },
              rich: {
                a: {
                  color: "#fff",
                  fontSize: "16",
                },
                s1: {
                  color: "#F25646",
                  fontSize: "16",
                },
                s2: {
                  color: "#FA971E",
                  fontSize: "16",
                },
                s3: {
                  color: "#EDC644",
                  fontSize: "16",
                },
                s4: {
                  color: "#47B17D",
                  fontSize: "16",
                },
                s5: {
                  color: "#43C9D2",
                  fontSize: "16",
                },
                s6: {
                  color: "#4BCFFC",
                  fontSize: "16",
                },
                s7: {
                  color: "#0892E5",
                  fontSize: "16",
                },
                s8: {
                  color: "#0464DB",
                  fontSize: "16",
                },
              },
              position: "outside",
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: function (params: any) {
                const colorList = [
                  {
                    c1: "#c5223b",
                    c2: "#fa768a",
                  },
                  {
                    c1: " #de7110",
                    c2: "#fecd70",
                  },
                  {
                    c1: "#d09f08",
                    c2: "#FFD145",
                  },
                  {
                    c1: "#238483",
                    c2: "#55C27C",
                  },
                  {
                    c1: " #45EAFF",
                    c2: "#40ADAC",
                  },
                  {
                    c1: "#12B3F8",
                    c2: "#7DE8FF",
                  },
                  {
                    c1: " #0176D3",
                    c2: "#13B7FF",
                  },
                ];
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex].c1,
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex].c2,
                  },
                ]);
              },
            },
          },
          labelLine: {
            normal: {
              show: true,
              length: 10,
              length2: 30,
              color: "#4BCFFC",
            },
            emphasis: {
              show: true,
            },
          },
          data: brr,
        },
      ],
    };
    // [
    //   {
    //     value: 1313,
    //     name: "Inject.bcbj",
    //   },
    //   {
    //     value: 1750,
    //     name: "Androm.bdwp",
    //   },
    //   {
    //     value: 1750,
    //     name: "僵尸网络",
    //   },
    //   {
    //     value: 1969,
    //     name: "蠕虫病毒",
    //   },
    //   {
    //     value: 2188,
    //     name: "木马程序",
    //   },
    //   {
    //     value: 2626,
    //     name: "异常报文",
    //   },
    //   {
    //     value: 3063,
    //     name: "后门攻击",
    //   },
    // ]
    option && this.myChart.setOption(option);
  }
}
</script>

<style lang="less" scoped>
.main-chart {
  height: 21vh;
}
.echart-main {
  width: 100%;
  height: 100%;
}
</style>
