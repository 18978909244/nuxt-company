<template>
  <div class="header">
    <div class="container">
      <div class="left">
        <el-image
          :src="getName('site_logo')"
          @click="$router.push('/')"
        ></el-image>
        <el-tooltip
          class="item"
          effect="light"
          content="Bottom Right 提示文字"
          placement="bottom-start"
        >
          <div class="link">产品与服务</div>
          <div slot="content" class="category">
            <el-row
              type="flex"
              align="middle"
              :gutter="20"
              v-for="(item, index) in categoryList"
              :key="index"
              class="row"
            >
              <el-col :span="8">
                <el-row type="flex" align="middle" justify="start">
                  <el-col :span="8">
                    <el-image
                      :src="item.service_img"
                      style="width:30px;height:30px"
                    ></el-image>
                  </el-col>
                  <el-col
                    :span="16"
                    style="border-right:2px solid #1a2c4c;padding-left:10px;color:#222"
                  >
                    {{ item.service_name }}
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="16" >
                <el-row type="flex" justify="start">
                  <el-col
                    v-for="(product, idx) in item.product_list"
                    :key="idx"
                  >
                    <span @click="$router.push(`/good?id=${product.product_id}`)" 
                    style="font-weight:bold;cursor:pointer">{{ product.name }}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-tooltip>
        <div class="link" @click="$router.push('/help')">帮助</div>
      </div>
      <div class="right" v-if="is_login" @click="$router.push('/user/orderList')">
        你好, {{ user_info.member_name || user_info.member_account }} 
        <span @click="handleLogout" style="margin-left:20px">退出</span>
      </div>
      <div class="right" v-else>
        <el-button type="primary" @click="$router.push('/login')"
          >登录</el-button
        >
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user_info", "categoryList"]),
    ...mapGetters(["getName", "is_login"])
  },
  methods:{
    ...mapMutations(['logout']),
    handleLogout(){
      this.logout()
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 80px;
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
      width: 400px;
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

.category {
  width: 500px;
  padding: 0px 40px;
  .row {
    border-bottom: 1px dashed #eee;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
