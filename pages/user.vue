<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-menu
      @select="handlerSelect"
        :default-active="index"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item v-for="(item,index) in list" :key="index" :index="index" :route="item.route">
          <i class="el-icon-setting"></i>
          <span slot="title" >{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <nuxt-child />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      index:1,
      list:[
        {
          key:'order',
          name:'订单',
          route:'/user/orderlist'
        },
        {
          key:'help',
          name:'帮助',
          route:'/user/help'
        },
        {
          key:'about',
          name:'关于我们',
          route:'/user/aboutus'
        },
      ]
    }
  },
   created(){
     this.index = this.list.findIndex(item=>this.$route.path.includes(item.key))
   },
   methods:{
     handlerSelect(e){
       this.$router.push(this.list[e].route)
     }
   }
}
</script>
<style scoped lang="less"></style>
