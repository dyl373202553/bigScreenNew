<template>
  <el-card class="box-card" :class="dclass" :body-style="bodyStyle">
    <div slot="header" class="box-header" v-if="isHeader">
      <slot name="header-left">
        <div class="box-header-title">{{ title }}</div>
      </slot>
      <slot name="header-right"></slot>
    </div>
    <slot name="card-main"></slot>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({
  name: "Card"
})
export default class Card extends Vue {
  @Prop({ default: "快速操作" }) title!: string;
  @Prop({ default: "" }) dclass!: string;
  @Prop({ default: () => ({}) }) bodyStyle!: any;
  @Prop({ default: true }) isHeader!: boolean;
}
</script>
<style lang="less" scoped>
</style>
