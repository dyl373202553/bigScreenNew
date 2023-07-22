<template>
  <div class="dmain-center">
    <div class="dtitle">
      <span>{{title}}</span>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "CardList",
  components: {}
})
export default class CardList extends Vue {
  @Prop({ default: "" }) title!: string;
}
</script>

<style lang="less" scoped>
.dmain-center {
  overflow: hidden;
  height: 28vh;
  background: rgba(4, 45, 66, 0.7);
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 6px solid transparent;
  border-right: none;
  border-left: none;
  border-image-source: url("../../../assets/images/border_bj.png");
  border-image-width: 6px;
  border-image-slice: 5;
  border-image-repeat: stretch;
  padding: 11px 17px;

  .dtitle {
    width: 100%;
    height: 34px;
    background: url("../../../assets/images/title_bj.png") no-repeat;
    background-position: left center;
    font-size: 16px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #4DF7FC;
    line-height: 34px;
    padding-left: 43px;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .title-more {
      font-size: 13px;
      cursor: pointer;
    }
  }
}

</style>
