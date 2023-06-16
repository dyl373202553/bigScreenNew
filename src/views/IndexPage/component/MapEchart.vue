<template>
  <div class="dk-chart">
    <div ref="chart" class="chart"></div>
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
        var geoGpsMap = [120.267413, 32.041544];
        var geoCoordMap = {
          // 江苏: [118.8062, 31.9208],
          // 黑龙江: [127.9688, 45.368],
          // 内蒙古: [110.3467, 41.4899],
          '吉林': [125.8154, 44.2584],
          '北京': [116.4551, 40.2539],
          '辽宁': [123.1238, 42.1216],
          // 河北: [114.4995, 38.1006],
          '天津': [117.4219, 39.4189],
          // 山西: [112.3352, 37.9413],
          '陕西': [109.1162, 34.2004],
          // 甘肃: [103.5901, 36.3043],
          // 宁夏: [106.3586, 38.1775],
          // 青海: [101.4038, 36.8207],
          // 新疆: [87.9236, 43.5883],
          '四川': [103.9526, 30.7617],
          // 重庆: [108.384366, 30.439702],
          '山东': [117.1582, 36.8701],
          // 河南: [113.4668, 34.6234],
          // '安徽': [117.29, 32.0581],
          '湖北': [114.3896, 30.6628],
          '浙江': [119.5313, 29.8773],
          // 福建: [119.4543, 25.9222],
          // 江西: [116.0046, 28.6633],
          '湖南': [113.0823, 28.2568],
          // 贵州: [106.6992, 26.7682],
          // 云南: [102.9199, 25.4663],
          // 广东: [113.12244, 23.009505],
          // 广西: [108.479, 23.1152],
          // 海南: [110.3893, 19.8516],
          '上海': [121.4648, 31.2891],
          // 西藏: [91.141017, 29.668461],
          // 台湾: [121.509062, 25.044332]
        };
        var data = [{
          name: '江苏',
          value: 111
        },{
          name: '陕西',
          value: 1
        },{
          name: '四川',
          value: 1
        },{
          name: '天津',
          value: 1
        }, {
          name: '北京',
          value: 1
        }, {
          name: '辽宁',
          value: 1
        },{
          name: '吉林',
          value: 1
        },  {
          name: '山东',
          value: 1
        },  {
          name: '浙江',
          value: 1
        }, {
          name: '上海',
          value: 1
        }, {
          name: '湖北',
          value: 1
        }, {
          name: '湖南',
          value: 1
        }, {
          name: '天津',
          value: 1
        }];
        var mapData = [];
        for (var key in geoCoordMap) {
          if (name.includes(key)) {
            geoGpsMap = geoCoordMap[key];
          }
          const keys = key;
          const filters = data.filter(item => {
            return item.name.includes(keys);
          })[0];

          mapData.push({
            name: key,
            value: filters ? filters.value : 0
          });
        }
        mapData.sort((a, b) => {
          return a.value - b.value;
        });
        const colors = [ '#4a99de', '#003a8c'];



        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        var convertToLineData = function(data, gps) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem.name];
            var toCoord = gps; // gps：‘中心点’
            if (fromCoord && toCoord) {
              res.push({
                fromName: gps,
                toName: dataItem.name,
                coords: [
                  fromCoord,
                  toCoord
                ]
              });
            }
          }
          return res;
        };

        let option = {
          backgroundColor: '#01193f',
          color: ['#187fff'], //飞线的颜色
          series: [
            // 地图线的动画效果
            {
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 4,
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'circle', //箭头图标
                symbolSize: 5, //图标大小
              },
              lineStyle: {
                normal: {
                  width: 2,
                  opacity: 0.05, //尾迹线条透明度
                  curveness: 0.01 //尾迹线条曲直度
                }
              },
              tooltip: {
                show: false
              },
              data: convertToLineData(mapData, geoGpsMap)
            },
            // 地图点的动画效果
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              data: convertData(mapData).map(item => {
                return {
                  name: item.name,
                  value: item.value.splice(0, 2)
                };
              }),
              // showEffectOn: 'render',
              rippleEffect: {
                period: 6, //动画时间，值越小速度越快
                brushType: 'fill', //波纹绘制方式 stroke, fill
                scale: 4, //波纹圆环最大限制，值越大波纹越大
                color: '#eabe44'
              },
              // hoverAnimation: true,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                normal: {
                  show: true,
                  color: '#ffff00',
                  // shadowBlur: 20,
                  // shadowColor: '#333'
                }
              }
            },

            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "fill",
                    scale: 4,
                    color: '#ff0000'
                },
                label: {
                    normal: {
                        show: true,
                        position: "top",
                         // offset: [5, 0], //偏移设置
                        color: "#ff0000",
                        formatter: "昆山开发区",
                        textStyle: {
                            color: "#ffff00",
                            fontSize: this.nowSize(16)
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: "circle",
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        show: true,
                        color: "#ff0000"
                    }
                },
               data: [{
                   name: '昆山开发区',
                   value: [120.267413, 32.041544]
                 }],
            },

            // 地图？
            {
              type: 'map',
              mapType: 'china',
              top: '2%',
              // left: '30%',
              label: { // 地图上的文字
                normal: {
                  show: true,
                  textStyle: {
                    color: '#ffffff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#01193f',
                  borderColor: '#3382a8',
                  borderWidth: 1,
                  shadowColor: '#3382a8',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 0,
                },
                emphasis: { // 高亮时区域颜色
                 normal: {
                   areaColor: '#01193f',
                   textStyle: {
                     color: '#ffffff'
                   }
                 }

                }
              },
              data: data.map((item, index) => {

                // if(item.name==='江苏'){
                //   return {
                //     name: item.name,
                //     value: item.value[2],
                //     itemStyle: {
                //       areaColor:  colors[1]
                //     }
                //   };
                // }else{
                  return {
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                      areaColor: item.value >10 ?colors[1] : colors[0]
                    }
                  };
                // }

              })
              // geoIndex: 0,
              // zlevel: 1,
            }
          ],
          geo: {
            map: 'china',
            top: '2%',
            aspectScale: 0.75, // 长宽比
            // left: '30%',
            // zoom: 1.1,
            roam: false,
            itemStyle: {
              normal: {
                shadowColor: 'rgb(58,115,192)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            regions: [{
              name: '南海诸岛',
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }]
          },
          tooltip: {
            show: false,
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0)',
            padding: 0,
            formatter: function(params) {
              var name = params.name || params.seriesName;
              var value = params.data.value || 0;
              // 实际来源地**
              // 最终目的地规模**人
              var content = `<div class="info_box">
                    <div class="info_box_marker"></div>
                    <div class="info_box_box">
                      <span class="name">${name}</span>
                      <span class="value">${value}</span>
                      <span class="company">人</span>
                    </div>
                  </div>`;
              return content;
            }
          }
        };



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

