<template>
  <div id="app">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container>
        <!-- :style="{ height: this.clientHeight }" -->
        <el-main class="dmain">
          <section class="app-main">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/layout/Navbar.vue";
@Component({
  name: "App",
  components: { Navbar }
})
export default class App extends Vue {
  private clientHeight: any = (document.documentElement.clientHeight - 64).toString() + "px"

  protected mounted() {
    window.onresize = () => {
      return (() => {
        this.clientHeight = (document.documentElement.clientHeight - 64).toString() + "px"
      })();
    };
    // this.clientHeight = (document.documentElement.clientHeight - 69).toString() + "px"
  }

  private created() {
    // UserModule.initialize({
    //   userName: "63B942AD2FA57C1A",
    //   passWord: "6F705F52B1AC9A185456B896C789444F"
    // });
  }
}
</script>
<style lang="less" scoped>
#app {
  @{deep} .el-header {
    box-sizing: content-box;
    width: 100%;
    text-align: center;
    line-height: 64px;
    height: 64px !important;
    padding: 0;
  }

  .dmain {
    background: #01061f;
    padding: 0;
  }
}
</style>
