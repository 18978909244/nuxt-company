<template>
  <section class="body-container middle-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-menu
          @select="handlerSelect"
          :default-active="index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, index) in list"
            :key="index"
            :index="index+''"
            :route="item.route"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <nuxt-child />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["helpList"])
  },
  data() {
    return {
      index: '0',
      list: [
        {
          key: "order",
          name: "订单",
          route: "/user/orderList"
        },
        // {
        //   key:'help',
        //   name:'帮助',
        //   route:'/user/help'
        // },
        {
          key: "about",
          name: "关于我们",
          route: "/user/aboutus"
        }
      ]
    };
  },
  created() {
    this.index = this.list.findIndex(item =>
      this.$route.path.includes(item.key)
    )+''
  },
  watch:{
    $route:function(to, from){
      console.log(to.path)
      this.index = this.list.findIndex(item=>item.route===to.path)+''
    }
  },
  methods: {
    handlerSelect(e) {
      this.$router.push(this.list[e].route);
    }
  }
};
</script>
<style scoped lang="less"></style>
