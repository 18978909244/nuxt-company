<template>
  <div class="header">
    <div class="container">
      <div class="left">
          <el-image :src="getName('site_logo')" @click="$router.push('/')"></el-image>
          <div class="link">产品与服务</div>
          <div class="link">帮助</div>
      </div>
      <div class="right" v-if="is_login">
        你好, {{user_info.member_name || user_info.member_account}}
      </div>
      <div class="right" v-else>
        <el-button type="primary" @click="$router.push('/login')">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(['user_info']),
    ...mapGetters(["getName",'is_login'])
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 120px;
  background-color: #1a2c4c;
  color: #fff;
  position: relative;
  z-index: 1000;
  box-sizing: content-box;
  box-shadow: 0 6px 12px 0 rgba(61, 79, 127, 0.1);
  .container {
    width: 1080px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    .left {
      width:400px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
    }
    .right {
      width: 400px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
