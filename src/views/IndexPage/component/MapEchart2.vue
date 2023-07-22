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
        let points = [
          { value: [87.628579, 43.793301], itemStyle: { color: 'red' } },
          { value: [104.076452, 30.651696], itemStyle: { color: '#00EEFF' } },
          { value: [103.826777, 36.060634], itemStyle: { color: '#00EEFF' } },
          { value: [102.709372, 25.046432], itemStyle: { color: '#00EEFF' } },
          { value: [108.327537, 22.816659], itemStyle: { color: '#00EEFF' } },
          { value: [112.982951, 28.116007], itemStyle: { color: '#00EEFF' } },
          { value: [117.020725, 36.670201], itemStyle: { color: '#00EEFF' } },
          { value: [113.753094, 34.767052], itemStyle: { color: '#00EEFF' } },
          { value: [112.578781, 37.813948], itemStyle: { color: '#00EEFF' } },
          { value: [119.296194, 26.101082], itemStyle: { color: '#00EEFF' } },
          { value: [120.152575, 30.266619], itemStyle: { color: '#00EEFF' } },
          { value: [118.763563, 32.061377], itemStyle: { color: '#00EEFF' } },
          { value: [116.407387, 39.904179], itemStyle: { color: '#00EEFF' } },
          { value: [108.953939, 34.266611], itemStyle: { color: '#00EEFF' } },
          { value: [113.266887, 23.133306], itemStyle: { color: '#FFFA00' } },
        ]
        let option = {
          geo: {
            map: 'china',
            aspectScale: 0.75, // 长宽比
            zoom: 1.1,
            roam: false,
            // regions: [{
            //   name: '南海诸岛',
            //   itemStyle: {
            //     areaColor: 'rgba(0, 10, 52, 1)',
            //     borderColor: 'rgba(0, 10, 52, 1)',
            //     normal: {
            //       opacity: 0,
            //       label: {
            //         show: false,
            //         color: '#009cc9',
            //       },
            //     },
            //   },

            // }],
          },
          series: [{
            type: 'map',
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: 'pink',
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
                borderColor: "#38D0FB",
                borderWidth: 2,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: "#2785D0", // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: "#2785D0", // 100% 处的颜色
                  }],
                  globalCoord: true, // 缺省为 false
                },
              },
              emphasis: {
                areaColor: '#2785D0',
                borderWidth: 0.1,
              },
            },
            zoom: 1.1,
            map: 'china', // 使用
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              number: 3, // 波纹的数量。
              period: 5, // 动画的周期，秒数。
              scale: 17, // 动画中波纹的最大缩放比例。
              brushType: 'fill', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            symbolSize: 2,
            data: points,
          }, // 地图线的动画效果
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              number: 4,
              period: 5,
              scale: 21,
              brushType: 'stroke',
            },
            symbolSize: 3,
            data: [{ value: [113.266887, 23.133306], itemStyle: { color: 'pink' } }],
          },
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 9, // 箭头指向速度，值越小速度越快
              trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'pine', // 箭头图标
              roundTrip: true,
              symbolSize: 4 // 图标大小
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                width: 1, // 线条宽度
                opacity: 0.1, // 尾迹线条透明度
                curveness: 0.3, // 尾迹线条曲直度
              },
            },
            data: [
              { coords: [[113.266887, 23.133306], [87.628579, 43.793301]], lineStyle: { color: '#FFF96B' } },
              { coords: [[87.628579, 43.793301], [104.076452, 30.651696]], lineStyle: { color: 'red' } },
              { coords: [[113.266887, 23.133306], [103.826777, 36.060634]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [102.709372, 25.046432]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [108.327537, 22.816659]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [112.982951, 28.116007]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [117.020725, 36.670201]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [113.753094, 34.767052]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [112.578781, 37.813948]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [119.296194, 26.101082]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [120.152575, 30.266619]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [118.763563, 32.061377]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [116.407387, 39.904179]], lineStyle: { color: '#FFF96B' } },
              { coords: [[113.266887, 23.133306], [108.953939, 34.266611]], lineStyle: { color: '#FFF96B' } },
            ],
          },
          ],
        }



        this.chart.setOption(option);








      },

    },
  }
</script>

<style>
  .chart {
    /* height: 50vh; */
    height: calc(56vh + 20px - 45px - 22px);
    width: 800px;
  }
</style>

