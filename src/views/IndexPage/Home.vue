<template>
  <div class="dcontainer">
    <div class="dleft">
      <CardList :title="leftTitle[Number(type) - 1]">
        <ConnectionsEchart v-if="type === '1'" />
        <RadarEchart3 v-else-if="type === '2'" />
        <BarOneEchart v-else-if="type === '3'" />
      </CardList>
      <CardList :title="leftCenter[Number(type) - 1]">
        <LineEchart v-if="type === '1'" />
        <RadarEchart v-else-if="type === '2'" />
        <TableList
          v-else-if="type === '3'"
          :isNoTh="false"
          :listLabel="taskLabel"
          :dataList="taskList"
          :type="'1'"
        />
      </CardList>
      <CardList :title="'敌情'">
        <span slot="right" class="title-more" @click="goPage(`${urlDev}/portal/intelligence`)">更多...</span>
        <TableList
          :isNoTh="true"
          :listLabel="articleLabel"
          :dataList="articleList"
        />
      </CardList>
    </div>
    <div class="dcenter">
      <div class="dmain-top">
        <Tabs @getIndex="getIndex" />
        <MapEchart v-if="type === '1'" />
        <MapEchart2 v-else-if="type === '2'" />
        <MapEchart3 v-else-if="type === '3'" />
        <div class="dcenter-info">
          <ul class="dcenter-info-ul" v-if="type === '1'">
            <li><i class="mark mark-circle"></i>站点数量<b>{{baseCollectInfo.count}}</b>个</li>
            <li><i class="mark mark-circle"></i>上行速率<b>{{baseCollectInfo.upload}}</b>{{baseCollectInfo.uploadUnit}}</li>
            <li><i class="mark mark-circle"></i>下行速率<b>{{baseCollectInfo.download}}</b>{{baseCollectInfo.downloadUnit}}</li>
            <!-- <li><i class="mark mark-circle"></i>网络延时<b>{{baseCollectInfo.delay}}</b>{{baseCollectInfo.delayUnit}}</li> -->
          </ul>
          <!-- 攻击态势 -->
          <ul class="dcenter-info-ul" v-else-if="type === '2'">
            <li><i class="mark" style="background: #ee6666"></i>高危</li>
            <li><i class="mark" style="background: #ef9207"></i>中危</li>
            <li><i class="mark" style="background: #e7dd62"></i>低危</li>
            <li><i class="mark" style="background: #60e150"></i>非攻击</li>
          </ul>
        </div>
      </div>
      <CardList :title="'我情'">
        <span slot="right" class="title-more" @click="goPage(`${urlDev}/portal/dynamic`)">更多...</span>
        <TableList
          :isNoTh="true"
          :listLabel="articleLabel"
          :dataList="articleStateList"
          :dclass="'table-padding'"
          :time="'all'"
        />
      </CardList>
    </div>
    <div class="dright">
      <CardList :title="rightTitle[Number(type) - 1]">
        <!-- <div slot='right' v-if="Number(type)===1">dfdfd</div> -->
        <PieEchart1 v-if="type === '1'" />
        <!-- <BarEchart v-else-if="type === '2'" /> -->
        <SortBar v-else-if="type === '2'" />
        <LineEchart2 v-else-if="type === '3'" />
      </CardList>
      <CardList :title="'信息服务产品'">
        <ProjectInfo />
      </CardList>
      <CardList :title="'战场环境'">
        <span slot="right" class="title-more" @click="goPage(`${urlDev}/portal/environment`)">更多...</span>
        <TableList
          :isNoTh="true"
          :listLabel="articleLabel"
          :dataList="articleEnvironmentList"
          :time="'all'"
        />
      </CardList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { taskLabel, articleLabel } from "@/data/home/home";
import TableList from "./components/TableList.vue";
import Tabs from "./components/Tabs.vue";
import ConnectionsEchart from "./components/Echart/ConnectionsEchart.vue";
import RadarEchart from "./components/Echart/RadarEchart.vue";
import BarEchart from "./components/Echart/BarEchart.vue";
import MeterEchart from "./components/Echart/MeterEchart.vue";
import MapEchart from "./components/Echart/MapEchart.vue";
import MapEchart2 from "./components/Echart/MapEchart2.vue";
import SortBar from "./components/Echart/SortBar.vue";
import MapEchart3 from "./components/Echart/MapEchart3.vue";
import BarOneEchart from "./components/Echart/BarOneEchart.vue";
import LineEchart from "./components/Echart/LineEchart.vue";
import LineEchart2 from "./components/Echart/LineEchart2.vue";
import PieEchart1 from "./components/Echart/PieEchart1.vue";
import RadarEchart3 from "./components/Echart/RadarEchart3.vue";
import ProjectInfo from "./components/ProjectInfo.vue";
import CardList from "./components/CardList.vue";
import { getArticleList, getTaskList, getArticleStateList, getArticleEnvironmentList, getBaseCollectInfo } from "@/api/IndexPage/home";
import dayjs from "dayjs"
import { ConfigModule } from "@/store/module/config"
const { urlDev } = ConfigModule

@Component({
  name: "Home",
  components: {
    TableList,
    Tabs,
    SortBar,
    ConnectionsEchart,
    RadarEchart,
    BarEchart,
    MeterEchart,
    MapEchart,
    MapEchart2,
    MapEchart3,
    BarOneEchart,
    LineEchart,
    LineEchart2,
    CardList,
    ProjectInfo,
    PieEchart1,
    RadarEchart3
  }
})
export default class Home extends Vue {
  $day: any;
  private taskLabel: any = []; // 保障任务
  private articleLabel: any = []; // 政务活动
  private type: any = "1";

  private leftTitle = ["连接数", "风险等级", "保障任务情况"];
  private leftCenter = ["接口流量(1小时,"+dayjs().format('YYYY/MM/DD')+")", "病毒防护事件统计", "大项保障任务"]
  private rightTitle = ["流量占比(24小时)", "安全事件统计", "通信设备使用情况"];

  private async created() {
    this.taskLabel = taskLabel;
    this.articleLabel = articleLabel;
  }

  private getIndex(type: string) {
    this.type = type;
  }

  private articleList= [] // 政务活动
  private taskList = [] // 保障任务
  private articleStateList = [] // 我方动态
  private articleEnvironmentList = [] // 社会环境
  private baseCollectInfo: any = {}

  protected mounted() {
    this.load();
  }

  private async load() {
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")
    const articleList = await getArticleList({ pageNo: 1, pageSize: 6 }); // 敌方情报
    const taskList = await getTaskList({ pageNo: 1, pageSize: 5 }); // 保障任务
    const articleStateList = await getArticleStateList({ pageNo: 1, pageSize: 6 }); // 我方动态
    const articleEnvironmentList = await getArticleEnvironmentList({ pageNo: 1, pageSize: 6 }); // 社会环境
    const baseCollectInfo = await getBaseCollectInfo({ connectTime: [yesterday + " " + "00:00:00", yesterday + " " + "23:59:59"] }) // 网络运行态势

    if (articleList.code === 0) {
      this.articleList = articleList.data.list
    }
    if (taskList.code === 0) {
      this.taskList = taskList.data.list
    }
    if (articleStateList.code === 0) {
      this.articleStateList = articleStateList.data.list
    }
    if (articleEnvironmentList.code === 0) {
      this.articleEnvironmentList = articleEnvironmentList.data.list
    }

    if (baseCollectInfo.code === 0) {
      this.baseCollectInfo = baseCollectInfo.data
      // this.baseCollectInfo.delay = baseCollectInfo.data.delay.toFixed(2)
    }
  }

  private goPage(url: string) {
    window.open(url, "_blank");
  }
}
</script>

<style lang="less" scoped>
</style>
