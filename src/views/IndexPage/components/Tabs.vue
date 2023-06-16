<template>
  <div class="dtab">
    <ul class="dtab-ul">
      <li :class="{'active': indexActive===index}" v-for="(item, index) in list" :key="item.id" @click="getIndex(item, index)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Tabs",
  components: {}
})
export default class Tabs extends Vue {
  private list = [
    {
      id: "01",
      title: "网络运行态势",
      type: "1"
    },
    {
      id: "02",
      title: "安全防护态势",
      type: "2"
    },
    {
      id: "03",
      title: "任务保障态势",
      type: "3"
    }
  ]

  private indexActive = 0

  private getIndex(item: any, index: number) {
    this.indexActive = index
    this.$emit("getIndex", item.type)
  }
}
</script>

<style lang="less" scoped>
</style>
