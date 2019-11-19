<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">订单详情</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <div class="gd_form" v-if="item">
        <div class="gd_tit"><span class="icon_tit"></span>服务工单</div>
        <div>
          <div class="item">
            <span class="text">订单号</span>
            <span class="c_6">{{
              item.order_no
            }}</span>
          </div>
          <div class="item">
            <span class="text">产品名称</span>
            <span class="c_6">{{
              item.product &&
                item.product.product_and_service &&
                item.product.product_and_service.service_name
            }}</span>
          </div>
          <div class="item">
            <span class="text">服务名称</span>
            <span class="c_6">{{item.product && item.product.name
            }}</span>
          </div>
          <div v-for="(input, key) in input_message" :key="key">
            <div v-if="input.value" class="item">
              <span class="text">{{ input.key }} </span>
              <span class="c_6" v-if="input.type!=='file'">
                {{input.value}}
              </span>
              <span class="c_6" v-else>
                <el-link type="primary" :href="input.value"  target="_blank">附件</el-link>
              </span>
            </div>
          </div>

          <div class="item" v-if="[3,4,5].includes(item.order_status)">
            <span class="text">服务金额</span>
            <span class="c_6">{{item.order_price }} 元</span>
          </div>
          <div class="operate">
            <el-button type="success">{{order_status_text}}</el-button>
            <el-button @click="pay(item)" v-if="item.order_status===3">支付</el-button>
            <el-button @click="cancelOrder(item)" v-if="item.order_status<3">取消</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import { Message } from "element-ui";
export default {
  data() {
    return {
      item: null,
      input_message: []
    };
  },
  computed: {
    ...mapState(["user_info","orderTypes"]),
    ...mapGetters(["is_login", "orderDetailById"]),
    order_status_text:function(){
        return this.orderTypes.find(item=>item.id===this.item.order_status).name
    }
  },
  created() {
    console.log(Number(this.$route.query.order_id));
    this.item = this.orderDetailById(Number(this.$route.query.order_id));
    console.log(this.item);
    if (this.item) {
      this.initData({
        product_id: this.item.product_id,
        kind_id: this.item.kind_id,
        second_id: this.item.second_id
      });
    }
  },
  methods: {
    ...mapActions([
      "asyncGetOrderInput",
      "asyncFetchGood",
      "asyncAddOrder",
      "asyncCancelOrder"
    ]),
    async initData(option) {
      const { order_input } = await this.asyncGetOrderInput(option);
      this.input_message = order_input.map(input => {
        return {
          key: input.input_name,
          value: this.item[input.value_field],
          type: input.control.control_code
        };
      });
    },
    deleteOrder(item) {
      this.asyncDeleteOrder(item);
    },
    async cancelOrder(item) {
      await this.asyncCancelOrder({
        order_no: item.order_no,
        order_status: 9
      });
      this.$router.push('/orderList')
    }
  }
};
</script>

<style lang="less" scoped>
.gd_form {
  padding: 10px 30px;
  background-color: #fff;
  box-shadow: 0 2px 1px 2px #eaebf1;
  .gd_tit {
    font-size: 22px;
    color: #666;
    line-height: 60px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ececec;
  }
  .item {
    background-color: #f7f9fe;
    font-size: 16px;
    color: #444;
    min-height: 48px;
    word-break: break-all;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    line-height: 48px;
    &:nth-child(2n){
      background-color: #fff;
    }
    .text {
      text-align: right;
      flex:1;
    }
    .c_6 {
      padding-left: 10px;
      flex:2;
      text-align:left;
      vertical-align: middle;
      word-wrap: break-word;
    }
  }
}
.operate{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
