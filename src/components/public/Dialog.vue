<template>
  <!-- 弹窗 -->
  <el-dialog :title="title"
    :visible.sync="dialogFormVisible"
    :center="true"
    :show-close="false"
    :fullscreen="isFull"
    :custom-class="dclass"
    :append-to-body="isAppend"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="width"
    :top="top"
  >
    <div slot="title" class="dialog-title">
      {{title}}
      <i class="el-icon-close fr" @click="closeDialog"></i>
    </div>
    <slot name="dialog-main"></slot>
    <div slot="footer" class="groups-footer" v-if="isBtn">
      <el-button @click="closeDialog" round>取 消</el-button>
      <el-button type="primary" @click="save" round>{{saveTitle}}</el-button>
    </div>
  </el-dialog>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "Dialog"
})
export default class Dialog extends Vue {
  @Prop({ default: false }) dialogFormVisible!: boolean;
  @Prop({ default: "标题" }) title!: string;
  @Prop({ default: "保 存" }) saveTitle!: string;
  @Prop({ default: false }) isFull!: boolean;
  @Prop({ default: true }) isBtn!: boolean;
  @Prop({ default: "" }) dclass!: string;
  @Prop({ default: "" }) isAppend!: string;
  @Prop({ default: "" }) width!: string;
  @Prop({ default: "15vh" }) top!: string;

  private closeDialog() {
    this.$emit("close");
  }

  private save() {
    this.$emit("save");
  }
}
</script>
<style lang="less" scoped>
.groups-footer {
  margin-bottom: 15px;
}
.dialog-title {
  font-size: 18px;
  color: #333333;
}
</style>
