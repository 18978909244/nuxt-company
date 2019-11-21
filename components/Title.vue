<template>
  <div class="title-line" :style="line?'':'background-image:none'">
    {{title}}
    <em class="c_titleblue">{{sub}}</em>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    line:{
      type:Boolean,
      default:true
    },
    sub:String,
    default:"副标题"
  },
};
</script>

<style lang="less" scoped>
.title-line {
  background: url("https://www.313.com/asset/dest/img/title_line.png") center
    center no-repeat;
  font-size: 26px;
  color: #3e464c;
  // position: relative;
  text-align:center;
  .c_titleblue {
    color: #4271f0 !important;
    font-style: normal;
    
  }
}
</style>
