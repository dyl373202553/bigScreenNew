<template>
  <div class="dk-chart">
    <dv-border-box-1>
      <div ref="chart" class="chart"></div>
    </dv-border-box-1>
  </div>
</template>

<script>
  let nowClientWidth = document.documentElement.clientWidth;
  import china from "../../../data/china.json"
  export default {

    name: 'Test',
    data() {
      return {
        chart: null,
        config: {
          points: [
            {
              name: '郑州',
              coordinate: [0.48, 0.35]
            },
            {
              name: '新乡',
              coordinate: [0.52, 0.23]
            },
            {
              name: '焦作',
              coordinate: [0.43, 0.29]
            },
            {
              name: '开封',
              coordinate: [0.59, 0.35]
            },
            {
              name: '许昌',
              coordinate: [0.53, 0.47]
            },
            {
              name: '平顶山',
              coordinate: [0.45, 0.54]
            },
            {
              name: '洛阳',
              coordinate: [0.36, 0.38]
            },
            {
              name: '周口',
              coordinate: [0.62, 0.55]
            },
            {
              name: '漯河',
              coordinate: [0.56, 0.56]
            },
            {
              name: '南阳',
              coordinate: [0.37, 0.66]
            },
            {
              name: '信阳',
              coordinate: [0.55, 0.81]
            },
            {
              name: '驻马店',
              coordinate: [0.55, 0.67]
            },
            {
              name: '济源',
              coordinate: [0.37, 0.29]
            },
            {
              name: '三门峡',
              coordinate: [0.20, 0.36]
            },
            {
              name: '商丘',
              coordinate: [0.76, 0.41]
            },
            {
              name: '鹤壁',
              coordinate: [0.59, 0.18]
            },
            {
              name: '濮阳',
              coordinate: [0.68, 0.17]
            },
            {
              name: '安阳',
              coordinate: [0.59, 0.10]
            }
          ],
          lines: [
            {
              source: '新乡',
              target: '郑州'
            },
            {
              source: '焦作',
              target: '郑州'
            },
            {
              source: '开封',
              target: '郑州'
            },
            {
              source: '许昌',
              target: '郑州'
            },
            {
              source: '平顶山',
              target: '郑州'
            },
            {
              source: '洛阳',
              target: '郑州'
            },
            {
              source: '周口',
              target: '郑州'
            },
            {
              source: '漯河',
              target: '郑州'
            },
            {
              source: '南阳',
              target: '郑州'
            },
            {
              source: '信阳',
              target: '郑州'
            },
            {
              source: '驻马店',
              target: '郑州'
            },
            {
              source: '济源',
              target: '郑州'
            },
            {
              source: '三门峡',
              target: '郑州'
            },
            {
              source: '商丘',
              target: '郑州'
            },
            {
              source: '鹤壁',
              target: '郑州'
            },
            {
              source: '濮阳',
              target: '郑州'
            },
            {
              source: '安阳',
              target: '郑州'
            }
          ],
          bgImgSrc: './map.jpg'
        }
      }
    },
    created() {
      // 新建一个promise对象
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
        //让图表实现响应式布局
        this.initDk2()
      })


      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    },
    methods: {
      nowSize(val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      },


      initDk2() {
        //初始化
        if (this.chart == null) {
          this.chart = this.$echarts.init(this.$refs.chart);
        }

        var geoJson = china
        this.$echarts.registerMap('china', geoJson);
        let option = {
          backgroundColor: '#13297B',
          geo: {
            map: 'china',
            aspectScale: 0.75, // 长宽比
            zoom: 1.1,
            roam: false,
            regions: [{
              name: '南海诸岛',
              itemStyle: {
                areaColor: 'rgba(0, 10, 52, 1)',
                borderColor: 'rgba(0, 10, 52, 1)',
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                    color: '#009cc9',
                  },
                },
              },

            }],
          },
          series: [{
            type: 'map',
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                },
              },
              emphasis: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: '#0068FB',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: '#0C3994', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#0C3994', // 100% 处的颜色
                  }],
                  globalCoord: true, // 缺省为 false
                },
              },
              emphasis: {
                areaColor: '#0068FB',
                borderWidth: 0.1,
              },
            },
            zoom: 1.1,
            map: 'china', // 使用
          }
          ],
        }



        this.chart.setOption(option);








      },

    },
  }
</script>

<style>
  .chart {
    height: 600px;
    width: 800px;
  }
</style>

