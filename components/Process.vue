<template>
  <div>
    <section style="display:block;padding:20px 100px;display:flex;justify-content:space-around" v-if="list.length>1">
      <el-tag :type="processIndex===idx?'primary':'info'" v-for="(item,idx) in list" :key="idx" @click="processIndex=idx">{{item.type_name}}</el-tag>
    </section>
    <div class="section">
      <div class="item" v-for="(item,index) in processList" :key="index">
        <el-image :src="item.problem_img"></el-image>
        <div class="title">{{item.good_name}}</div>
        <div class="need">[ {{item.product_name}} ]</div>
        <div class="sub">{{item.detail}}</div>
      </div>
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
  },
  data() {
    return {
      processIndex: 0
    };
  },
  computed: {
    processList: function() {
      return (
        this.list[this.processIndex] && this.list[this.processIndex].processses
      );
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
    height: 260px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .el-image {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    .need {
      margin-top: 20px;
      color: #ff6700 !important;
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