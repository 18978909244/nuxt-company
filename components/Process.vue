<template>
  <div class="section">
    <div class="item" v-for="(item,index) in list" :key="index">
        <el-image :src="item.problem_img"></el-image>
        <div class="title">{{item.good_name}}</div>
        <div class="need">[ {{item.product_name}} ]</div>
        <div class="sub">{{item.detail}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.section{
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  .item{
    height: 260px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .el-image{
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    .need{
      margin-top: 20px;
      color: #ff6700!important;
      font-size:22px;
    }
    .title{
      margin-top: 20px;
      color: #5c6670!important;
      font-size:30px;
    }
    .sub{
      margin-top: 20px;
      color: #a1a6ab!important;
      font-size: 14px;
    }
  }
}
</style>