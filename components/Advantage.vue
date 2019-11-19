<template>
  <div class="section">
    <div class="item" v-for="(item,index) in list" :key="index">
        <el-image :src="item.good_img"></el-image>
        <div class="title">{{item.good_name}}</div>
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
  display: flex;
  justify-content: space-between;
  .item{
    width:220px;
    height: 260px;
    margin:0 10px;
    border: 1px solid #d7e1ec;
    background-color: #f5f9fd;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .el-image{
      width: 60px;
      height: 60px;
      margin: 0 auto;
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