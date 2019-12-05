<template>
  <div class="section">
    <div class="item" v-for="(item,index) in list" :key="index">
      <el-image :src="item.product_img"></el-image>
      <div class="title">{{index+1}}</div>
      <div class="need">{{item.detail}}</div>
      <div class="sub">{{item.sub}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.section {
  padding-top: 40px;
  display: flex;
  display: flex;
  justify-content: space-between;
  .item {
    height: 260px;
    display: flex;
    background: #f5f9fd;
    flex: 1;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    .el-image {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      margin-top: 40px;
    }
    .need {
      margin-top: 20px;
      font-size: 16px;
    }
    .title {
      font-size: 16px;
      color: #fff;
      background: #0071e3;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      justify-content: center;
      display: flex;
      align-items: center;
      margin: 0 auto;
      margin-top: 20px;
    }
    .sub {
      margin-top: 20px;
      font-size: 14px;
    }
  }
}
</style>