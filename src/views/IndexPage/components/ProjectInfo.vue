<template>
  <div class="dmain-content">
    <img :src="dataInfo.coverUrl" @click="goPage"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getProjectList } from "@/api/IndexPage/home"

@Component({
  name: "ProjectInfo",
  components: {}
})
export default class ProjectInfo extends Vue {
  private dataInfo = {}
  protected async mounted() {
    const { code, data}  = await getProjectList({})
    if (code === 0) {
      this.dataInfo = data.list[0]
    }
  }

  private goPage() {
    window.open("http://43.140.252.68:8000/portal/infoProduct", "_blank");
  }
}
</script>

<style lang="less" scoped>
</style>
