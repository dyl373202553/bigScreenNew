<template>
  <div class="dmain-content">
    <img :src="dataInfo.coverUrl" @click="goPage"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getProjectList } from "@/api/IndexPage/home"
import { ConfigModule } from "@/store/module/config"
const { urlDev } = ConfigModule

@Component({
  name: "ProjectInfo",
  components: {}
})
export default class ProjectInfo extends Vue {
  private dataInfo = {}
  protected async mounted() {
    const { code, data}  = await getProjectList({})
    if (code === 0) {
      this.dataInfo = data[0]
    }
  }

  private goPage() {
    window.open(`${urlDev}/portal/infoProduct`, "_blank");
  }
}
</script>

<style lang="less" scoped>
</style>
