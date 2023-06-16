<template>
  <div class="navbar">
    <el-row>
      <el-col :span="8">
        <div class="time">
          <span class="time-span">{{dateTime}}</span>
          <span class="time-span">星期{{weeksDay}}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title-center">信息通信保障态势</div>
      </el-col>
      <el-col :span="8">
        <div class="user-info">
          <!-- <div class="user-info-div">
            <img src="@/assets/images/user.svg" class="user-avatar" />
            <span>张三</span>
          </div> -->
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Navbar"
})
export default class Navbar extends Vue {
  $day: any;

  private dateTime = ""
  private weeksDay = ""
  private created() {
    this.dateTime = this.$day(new Date(), "YYYY/MM/DD")
    const wk = new Date().getDay()
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];
    this.weeksDay = weeks[wk]
  }
}
</script>

<style lang="less" scoped>
.navbar {
  font-size: 18px;
  padding: 0 47px;
  color: #38D0FB;
  background: #01061f url("../../assets/images/top_bj.png") no-repeat;
  background-position: center top;
  background-size: 100%;
  .time {
    text-align: left;
    width: 100%;
    height: 64px;
    .time-span {
      margin-top: 20px;
      font-family: "PingFang SC";
      display: inline-block;
      margin-right: 15px;
    }
  }
  .title-center {
    color: #39FCFF;
    font-size: 32px;
    font-family: "SourceHanSansCN-Regular";
    letter-spacing: 7px;
    // text-shadow: 2px 2px 2px #001167;
    text-shadow: 1px 1px 1px #001167;
  }
  .user-info {
    text-align: right;
    width: 100%;
    height: 64px;
    .user-info-div {
      margin-top: 20px;
      display: inline-block;
      .user-avatar {
        width: 24px;
        height: 24px;
        margin-right: 5px;
        vertical-align: sub;
      }
    }
  }
}
</style>
