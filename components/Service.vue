<template>
  <div class="section">
    <div class="item" v-for="(item,index) in list" :key="index">
      <el-image :src="item.service_img"></el-image>
      <div class="sub">{{item.service_name}}</div>
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
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-around;
  .item {
    // height: 260px;
    flex:1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    padding:40px 0;
    // border: 1px solid #5c6670;
    .el-image {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    .need {
      margin-top: 20px;
      color: #333;
      font-size: 22px;
    }
    .title {
      margin-top: 20px;
      color: #5c6670 !important;
      font-size: 30px;
    }
    .sub {
      margin-top: 20px;
      color: #a1a6ab !important;
      font-size: 14px;
    }
  }
}
</style>