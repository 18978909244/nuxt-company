<template>
  <div class="section">
    <div class="item" v-for="(item,index) in list" :key="index">
        <el-image :src="item.good_img"></el-image>
        <div>{{item.good_name}}</div>
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
    height: 260px;
    margin:0 10px;
  }
}
</style>
