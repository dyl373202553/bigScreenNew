<template>
  <div>
    <div :class="dclass">
      <el-table :data="dataList" class="dtable-brief" :class="{'isNo-th': isNoTh}" @row-click="rowClick">
        <template v-for="item in listLabel">
          <el-table-column
            v-if="['articleName', 'taskName', 'name'].indexOf(item.titleId)!==-1"
            :prop="item.titleId"
            :label="item.label"
            :key="item.titleId"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div class="dtable-name">{{scope.row[item.titleId]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="['beginTime', 'createTime', 'recordTime'].indexOf(item.titleId)!==-1"
            :prop="item.titleId"
            :label="item.label"
            :key="item.titleId"
            :width="item.width"
            header-align="left"
            align="right"
          >
            <template slot-scope="scope">
              <!-- <template v-if="time==='all'">{{$day(new Date(scope.row[item.titleId]), "YYYY-MM-DD HH:mm")}}</template> -->
              <template>{{$day(new Date(scope.row[item.titleId]), "YYYY-MM-DD")}}</template>
            </template>
          </el-table-column>
          <!-- 1：未开始，2：进行中，3：已完成 -->
          <el-table-column
            v-else-if="item.titleId==='status'"
            :prop="item.titleId"
            :label="item.label"
            :key="item.titleId"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span :style="{'color':statusColor[scope.row.status - 1]}">{{statuaList[scope.row.status - 1]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item.titleId"
            :label="item.label"
            :key="item.titleId"
            :width="item.width"
          />
        </template>
      </el-table>
    </div>
    <Dialog :dialogFormVisible="dialogShow" :title="dialogTitle" :isBtn="false" @close="dialogClose" @save="dialogClose" class="alert-dialog">
      <div slot="dialog-main">
        <TaskDetail :dataInfo="dataInfo" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getNetTaskDetail } from "@/api/IndexPage/echart"
import Dialog from "@/components/public/Dialog.vue"
import TaskDetail from "./TaskDetail.vue"
import { ConfigModule } from "@/store/module/config"
const { urlDev } = ConfigModule
@Component({
  name: "TableList",
  components: { Dialog, TaskDetail }
})
export default class TableList extends Vue {
  $day: any;
  @Prop({ default: true }) isNoTh!: boolean;
  @Prop({ default: () => ([]) }) listLabel!: any;
  @Prop({ default: () => ([]) }) dataList!: any;
  @Prop({ default: "" }) dclass!: string;
  @Prop({ default: "" }) time!: string;
  @Prop({ default: "" }) type!: string; // 1:保障任务列表

  private statuaList = ["未开始", "进行中", "已完成"]
  private statusColor = ["#ed5151", "#f5a440", "#63df26"]
  private dataInfo = {}
  private dialogShow = false
  private dialogTitle = "保障任务详情"

  private async rowClick(row: any) {
    if (this.type === "1") {
      const { code, data } = await getNetTaskDetail(row.id)
      if (code === 0) {
        this.dataInfo = data
        this.dialogShow = true
      }
    } else {
      let articleTitle: any = ""
      if (row.articleType === 1) {
        articleTitle = encodeURIComponent("我方动态")
      } else if (row.articleType === 2) {
        articleTitle = encodeURIComponent("敌方情报")
      } else {
        articleTitle = encodeURIComponent("战场环境")
      }
      const url = urlDev + "/portal/detail?id=" + row.id + "&type=4" + "&title=" + articleTitle
      window.open(url, "_blank");
    }
  }

  private dialogClose() {
    this.dialogShow = false
  }
}
</script>

<style lang="less" scoped>
.table-padding {
  padding-right: 20px;
  padding-left: 25px;
}
.dtable-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
