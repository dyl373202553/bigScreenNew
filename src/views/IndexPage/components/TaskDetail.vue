<template>
  <div class="dtable-info">
    <table>
      <tr>
        <th>任务状态</th>
        <td :style="{'color':statusColor[dataInfo.status-1]}">{{statusList[dataInfo.status-1]}}</td>
        <th>任务名称</th>
        <td>{{dataInfo.name}}</td>
      </tr>
      <tr>
        <th>开始时间</th>
        <td>{{$day(dataInfo.beginTime, "YYYY年MM月DD日")}}</td>
        <th>执行单位</th>
        <td>{{dataInfo.companyName}}</td>
      </tr>
      <tr>
        <th>负责人</th>
        <td>{{dataInfo.adminUserName}}</td>
        <th>保障地点</th>
        <td>{{dataInfo.province}}{{dataInfo.city}}{{dataInfo.county}}</td>
      </tr>
      <tr>
        <th>通信手段</th>
        <td>{{dataInfo.connectType}}</td>
        <th>参与人数</th>
        <td>{{dataInfo.personSum}}</td>
      </tr>
      <tr>
        <th>任务内容</th>
        <td colspan="3">{{dataInfo.content}}</td>
      </tr>
      <tr>
        <th>通讯设备</th>
        <td colspan="3">
          <span v-for="item in dataInfo.detailList" :key="item.id" class="device-span">{{item.deviceTypeName}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "TaskDetail",
  components: {},
})
export default class TaskDetail extends Vue {
  @Prop({ default: {} }) dataInfo!: any;

  private statusList = ["未开始", "进行中", "已完成"]
  private statusColor = ["#ed5151", "#f5a440", "#63df26"]
}
</script>

<style lang="less" scoped>
</style>
